import { guard, json } from "@/lib/portal/auth";
import { listPages, PortalError } from "@/lib/portal/pages";
import { GitHubError } from "@/lib/portal/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const blocked = guard(request);
  if (blocked) return blocked;
  try {
    return json({ pages: await listPages() }, 200);
  } catch (error) {
    if (error instanceof PortalError || error instanceof GitHubError) {
      return json({ error: error.message }, error.status >= 400 ? error.status : 500);
    }
    return json({ error: "Could not load the pages." }, 500);
  }
}
