import { guard, json } from "@/lib/portal/auth";
import { createBlob, GitHubError } from "@/lib/portal/github";

export const runtime = "nodejs";

/** One uploaded file becomes one git blob; the page is assembled later by /manage. */
const MAX_BYTES = 4_000_000;

export async function POST(request: Request) {
  const blocked = guard(request);
  if (blocked) return blocked;
  try {
    const bytes = Buffer.from(await request.arrayBuffer());
    if (!bytes.length) return json({ error: "Empty file." }, 400);
    if (bytes.length > MAX_BYTES) {
      return json(
        { error: "A single file is over 4 MB. Compress it and try again." },
        413,
      );
    }
    return json({ sha: await createBlob(bytes.toString("base64")) }, 200);
  } catch (error) {
    if (error instanceof GitHubError) {
      return json({ error: error.message }, error.status >= 400 ? error.status : 500);
    }
    return json({ error: "Upload failed." }, 500);
  }
}
