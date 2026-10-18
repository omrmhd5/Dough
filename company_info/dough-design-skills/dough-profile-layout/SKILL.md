---
name: dough-profile-layout
description: Editorial page and deck layouts in the Dough company profile style (boutique-agency, high negative space).
---
# Dough profile layout

Read `dough-brand` first.

**Canvas:** landscape 1920 × 1358 (≈ √2). Pixel-fixed; scale to fit. Use a deck-stage with one `<section>` per page, inline styles.

**Grid:** 150px outer margins. Content starts at y=200. Running header at top:72px, 24px / 500 / uppercase / 0.14em tracking, in Water (`#457D9E`) on light or Sparkle on dark: left = "Case 04" or section, right = page title. Page number bottom-right (right:150 bottom:64, 24px).

**Page types**
1. *Cover / section opener:* huge lowercase headline (84–120px, 300 + 700 key word), one image, lots of air.
2. *Split:* text column 560–660px left, full-bleed or inset image right (half page). Never overlap text and image; keep header inside the text column.
3. *Case study:* label, headline, brief / what we did / result in three short lines, one hero image plus 1–2 supporting crops. Big figure (120–140px / 300, −0.04em) for one result.
4. *Logo wall:* white or one-colour logos on navy, even optical size (scale by visual weight, not box width), no greyscale unless the client logo is mono.
5. *Gallery:* 2–3 images with generous gutters (48–96px), captions 24px.
6. *Contact:* headline, 4 contact rows, no heavy rules; real links.

**Rules**
- Min text 24px; body 26px / 300 / 1.6; max body width ~560px.
- Hairlines `rgba(18,41,64,0.2)` on light, `rgba(196,217,235,0.3)` on dark.
- Photos: square corners, shadow `0 30px 60px -30px rgba(18,41,64,0.35)`. Use object-fit:cover with a deliberate focal point; never crop faces, hands or product heads. Cut out products or unify backgrounds rather than leave mismatched black boxes.
- Backgrounds: max two per deck (cream `#FFFCF7` and navy `#122940`, warm grey `#E9E8E6` sparingly). No charcoal/black footers.
- Alternate light and dark pages for rhythm; one idea per page.
- Case-study order: strongest first, grouped by client.
