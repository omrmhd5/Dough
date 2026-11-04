import { guard, json } from "@/lib/portal/auth";
import {
  deletePage,
  editPage,
  PortalError,
  publishPage,
  restorePage,
  type Publish,
} from "@/lib/portal/pages";

export const runtime = "nodejs";
export const maxDuration = 60;

type Body =
  | ({ action: "publish" } & Publish)
  | { action: "edit"; slug: string; newSlug?: string; title?: string }
  | { action: "delete"; slug: string }
  | { action: "restore"; slug: string; version: string };

export async function POST(request: Request) {
  const blocked = guard(request);
  if (blocked) return blocked;
  try {
    const body = (await request.json()) as Body;
    switch (body.action) {
      case "publish":
        return json({ page: await publishPage(body) }, 200);
      case "edit":
        return json({ page: await editPage(body) }, 200);
      case "delete":
        await deletePage(body.slug);
        return json({ ok: true }, 200);
      case "restore":
        return json({ page: await restorePage(body) }, 200);
      default:
        return json({ error: "Unknown action." }, 400);
    }
  } catch (error) {
    if (error instanceof PortalError) return json({ error: error.message }, error.status);
    return json({ error: error instanceof Error ? error.message : "Something went wrong." }, 500);
  }
}
