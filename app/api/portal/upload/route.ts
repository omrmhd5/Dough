import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { guard, json } from "@/lib/portal/auth";
import { MAX_FILE_BYTES, parseUploadPath, PortalError } from "@/lib/portal/pages";

export const runtime = "nodejs";

/**
 * Hands the signed-in browser a short-lived token to upload one file straight
 * to storage, so large exports are not limited by the server's request size.
 * New versions are written under a fresh path and can never overwrite another.
 */
export async function POST(request: Request) {
  const blocked = guard(request);
  if (blocked) return blocked;
  try {
    const body = (await request.json()) as HandleUploadBody;
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        parseUploadPath(pathname);
        return {
          maximumSizeInBytes: MAX_FILE_BYTES,
          addRandomSuffix: false,
          allowOverwrite: false,
          cacheControlMaxAge: 60 * 60 * 24 * 365,
        };
      },
    });
    return json(result, 200);
  } catch (error) {
    if (error instanceof PortalError) return json({ error: error.message }, error.status);
    return json({ error: error instanceof Error ? error.message : "Upload failed." }, 400);
  }
}
