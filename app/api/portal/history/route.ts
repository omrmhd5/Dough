import { guard, json } from "@/lib/portal/auth";
import { GitHubError, listCommits } from "@/lib/portal/github";
import { FILES_ROOT, validateSlug, PortalError } from "@/lib/portal/pages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const blocked = guard(request);
  if (blocked) return blocked;
  try {
    const slug = validateSlug(new URL(request.url).searchParams.get("slug"));
    return json({ versions: await listCommits(`${FILES_ROOT}/${slug}`) }, 200);
  } catch (error) {
    if (error instanceof PortalError || error instanceof GitHubError) {
      return json({ error: error.message }, error.status >= 400 ? error.status : 500);
    }
    return json({ error: "Could not load the history." }, 500);
  }
}
