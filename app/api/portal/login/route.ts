import { checkPassword, json, makeSessionToken, sessionCookie } from "@/lib/portal/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host || new URL(origin).host !== host) {
    return json({ error: "Request not allowed." }, 403);
  }
  let password = "";
  try {
    password = String(((await request.json()) as { password?: string }).password ?? "");
  } catch {}
  if (!process.env.PORTAL_PASSWORD) {
    return json({ error: "The portal password is not set up on the server yet." }, 500);
  }
  if (!checkPassword(password)) {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return json({ error: "Wrong password." }, 401);
  }
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "set-cookie": sessionCookie(makeSessionToken()),
    },
  });
}
