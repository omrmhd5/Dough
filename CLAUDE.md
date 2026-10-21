# Dough website

Next.js site (App Router, Tailwind v4, next-intl EN/AR). The company profile deck is served at `/profile` from static files in `public/profile/` (a rewrite in `next.config.mjs` maps `/profile` to `/profile/index.html`).

## Updating `/profile` from a Claude artifact

When asked to update the `/profile` artifact / company profile from a Claude artifact (a claude.ai artifact link the user gives you, read it with the Artifact tool's `read` action), the artifact is the source of truth for **slide content and design**. Make `public/profile/index.html` match it, and nothing else.

Do:

- Compare the artifact's slides with the `<section data-document-role="page">` slides in `public/profile/index.html`. Add, remove, reorder and edit slides so they match. Keep each slide's `data-label` and `data-screen-label` (numbered "01", "02", ...) in order.
- Keep the deck size on `<x-import ... width="1920" height="1358">`.
- Image paths must be absolute: `/profile/...`. Copy any new image the artifact uses into `public/profile/` (sub-folders like `v3/`, `cp/`, `ai/` already exist) and convert it to **WebP**, resized to no more than about 2000px on the long side, so the deck stays light (large images made phones run out of memory before). Do not leave `.png`/`.jpg` originals in `public/profile/`.
- Keep the `<title>`, description, `og:` and `twitter:` meta tags in `public/profile/index.html` (the social preview image is `public/profile/og.jpg`, 1200×630, absolute URLs on https://doughx.vercel.app). Update them only when the artifact's content changed: the description names the case-study clients, so add or remove names when clients are added or removed, and rebuild `og.jpg` if the cover changed.
- After editing, run `npx next build` or load `/profile` in the dev server and check the changed slides at desktop and phone width.

Do not:

- Replace or overwrite `public/profile/deck-stage.js`, `support.js` or `image-slot.js` with the artifact's versions. `deck-stage.js` carries our phone fixes: swipe up/down/left/right, the bottom thumbnail strip, rotation re-fit, wheel navigation and pinch-zoom crash protection (it skips re-fitting while the page is zoomed). If the artifact's runtime differs, leave ours.
- Touch anything outside `public/profile/` (the rest of the website is separate) unless the user asks.
- Delete existing images in `public/` that other pages may use.
- Add the viewport `user-scalable=no` / pinch-zoom blocking; the crash was fixed in `deck-stage.js` instead.

Commit message style: short, imperative, e.g. "Update company profile slides from latest artifact". Work on a branch and open a PR if the user asks for review.
