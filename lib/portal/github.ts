/** Minimal GitHub REST client: everything the portal does is one commit on the main branch. */

const API = "https://api.github.com";

export const repo = () => process.env.GITHUB_REPO || "omrmhd5/Dough";
export const branch = () => process.env.GITHUB_BRANCH || "main";

export class GitHubError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function gh<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new GitHubError(
      "The portal is not connected to GitHub yet (GITHUB_TOKEN is missing).",
      500,
    );
  }
  const response = await fetch(`${API}/repos/${repo()}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  if (!response.ok) {
    let detail = "";
    try {
      detail = ((await response.json()) as { message?: string }).message ?? "";
    } catch {}
    throw new GitHubError(
      `GitHub said: ${detail || response.statusText}`,
      response.status,
    );
  }
  return (await response.json()) as T;
}

type Head = { commit: string; tree: string };
export type TreeEntry = { path: string; mode: string; type: string; sha: string };
export type Change = { path: string; sha: string | null };

export async function getHead(): Promise<Head> {
  const ref = await gh<{ object: { sha: string } }>(
    `/git/ref/heads/${branch()}`,
  );
  const commit = await gh<{ tree: { sha: string } }>(
    `/git/commits/${ref.object.sha}`,
  );
  return { commit: ref.object.sha, tree: commit.tree.sha };
}

export async function recursiveTree(treeSha: string): Promise<TreeEntry[]> {
  const result = await gh<{ tree: TreeEntry[]; truncated: boolean }>(
    `/git/trees/${treeSha}?recursive=1`,
  );
  return result.tree;
}

export async function treeAtCommit(commitSha: string): Promise<TreeEntry[]> {
  const commit = await gh<{ tree: { sha: string } }>(
    `/git/commits/${commitSha}`,
  );
  return recursiveTree(commit.tree.sha);
}

export async function createBlob(base64: string): Promise<string> {
  const blob = await gh<{ sha: string }>("/git/blobs", {
    method: "POST",
    body: JSON.stringify({ content: base64, encoding: "base64" }),
  });
  return blob.sha;
}

export async function readBlob(sha: string): Promise<Buffer> {
  const blob = await gh<{ content: string }>(`/git/blobs/${sha}`);
  return Buffer.from(blob.content, "base64");
}

export async function listCommits(path: string) {
  const list = await gh<
    {
      sha: string;
      html_url: string;
      commit: { message: string; author: { date: string } };
    }[]
  >(
    `/commits?sha=${branch()}&path=${encodeURIComponent(path)}&per_page=30`,
  );
  return list.map((c) => ({
    sha: c.sha,
    url: c.html_url,
    message: c.commit.message.split("\n")[0],
    date: c.commit.author.date,
  }));
}

/**
 * Builds a commit on top of the latest main. `build` runs against the current
 * head (so two people publishing at once do not overwrite each other); if main
 * moves while committing, it runs again on the new head.
 */
export async function commitOnHead(
  build: (head: Head) => Promise<{ message: string; changes: Change[] }>,
): Promise<{ commit: string }> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 4; attempt++) {
    const head = await getHead();
    const { message, changes } = await build(head);
    if (!changes.length) return { commit: head.commit };

    const tree = await gh<{ sha: string }>("/git/trees", {
      method: "POST",
      body: JSON.stringify({
        base_tree: head.tree,
        tree: changes.map((c) => ({
          path: c.path,
          mode: "100644",
          type: "blob",
          sha: c.sha,
        })),
      }),
    });
    const commit = await gh<{ sha: string }>("/git/commits", {
      method: "POST",
      body: JSON.stringify({ message, tree: tree.sha, parents: [head.commit] }),
    });
    try {
      await gh(`/git/refs/heads/${branch()}`, {
        method: "PATCH",
        body: JSON.stringify({ sha: commit.sha, force: false }),
      });
      return { commit: commit.sha };
    } catch (error) {
      lastError = error;
      if (error instanceof GitHubError && error.status === 422) continue;
      throw error;
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("Someone else published at the same moment. Try again.");
}
