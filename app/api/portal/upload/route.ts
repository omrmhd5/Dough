import { guard, json } from "@/lib/portal/auth";
import { MAX_FILE_BYTES, parseUploadPath, PortalError } from "@/lib/portal/pages";
import { signedUploadUrl } from "@/lib/portal/store";

export const runtime = "nodejs";

/**
 * Hands the signed-in browser a short-lived link to upload one file straight
 * to storage, so large exports are not limited by the server's request size.
 * New versions are written under a fresh path and never overwrite another one.
 */
export async function POST(request: Request) {
  const blocked = guard(request);
  if (blocked) return blocked;
  try {
    const { pathname, contentType, size } = (await request.json()) as {
      pathname?: string;
      contentType?: string;
      size?: number;
    };
    parseUploadPath(String(pathname));
    if (!Number.isInteger(size) || (size as number) < 0 || (size as number) > MAX_FILE_BYTES) {
      throw new PortalError("A single file can be up to 100 MB.", 413);
    }
    const type = /^[a-z]+\/[a-z0-9.+\-]+$/i.test(String(contentType))
      ? String(contentType)
      : "application/octet-stream";
    return json({ url: await signedUploadUrl(String(pathname), type, size as number), contentType: type }, 200);
  } catch (error) {
    if (error instanceof PortalError) return json({ error: error.message }, error.status);
    return json({ error: error instanceof Error ? error.message : "Upload failed." }, 400);
  }
}
