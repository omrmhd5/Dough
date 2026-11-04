import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/** One shared password for the whole team. Set PORTAL_PASSWORD in the environment. */
export const COOKIE_NAME = "dough_portal";
const SESSION_DAYS = 7;

function secret() {
  return (
    process.env.PORTAL_SECRET ||
    `${process.env.PORTAL_PASSWORD ?? ""}|${process.env.GITHUB_TOKEN ?? ""}|portal`
  );
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function checkPassword(input: string) {
  const expected = process.env.PORTAL_PASSWORD;
  if (!expected) return false;
  return safeEqual(input, expected);
}

export function makeSessionToken() {
  const expires = String(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  return `${expires}.${sign(expires)}`;
}

function verifySessionToken(token: string | undefined) {
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  if (!safeEqual(signature, sign(expires))) return false;
  return Number(expires) > Date.now();
}

export const sessionCookie = (token: string, maxAgeSeconds?: number) =>
  [
    `${COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    process.env.NODE_ENV === "production" ? "Secure" : "",
    `Max-Age=${maxAgeSeconds ?? SESSION_DAYS * 24 * 60 * 60}`,
  ]
    .filter(Boolean)
    .join("; ");

function cookieFrom(request: Request) {
  const header = request.headers.get("cookie") ?? "";
  for (const part of header.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === COOKIE_NAME) return rest.join("=");
  }
  return undefined;
}

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

/**
 * Returns a Response to send back when the request is not allowed, or null.
 * Writes must also come from this site (Origin check), on top of the
 * SameSite=Strict cookie.
 */
export function guard(request: Request): Response | null {
  if (!verifySessionToken(cookieFrom(request))) {
    return json({ error: "Please sign in." }, 401);
  }
  if (request.method !== "GET") {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (!origin || !host || new URL(origin).host !== host) {
      return json({ error: "Request not allowed." }, 403);
    }
  }
  return null;
}

export { json };
