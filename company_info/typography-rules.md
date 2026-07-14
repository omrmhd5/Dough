# Dough Typography Rules & Design Guidelines

This document outlines the official typography rules and font mappings for the **Dough** creative brand system, converting points (pt) from the design specifications into standard CSS and Tailwind classes.

---

## 1. Primary Typeface Family: Montserrat
Montserrat is the official typeface used for Latin headlines, sub-headlines, body copy, indicators, and captions.
* **Characteristics**: Bold, geometric, highly legible, with a wide letter width.
* **Weights Used**:
  * `extrabold` (Montserrat ExtraBold) — Font weight: `800` / class: `font-extrabold`
  * `bold` (Montserrat Bold) — Font weight: `700` / class: `font-bold`
  * `medium` (Montserrat Medium) — Font weight: `500` / class: `font-medium`
  * `regular` (Montserrat Regular) — Font weight: `400` / class: `font-normal`

---

## 2. Typography Hierarchy & Configurations

### A. Headline
* **Usage**: Major section entry titles (e.g. Hero Headline).
* **Font Weight**: ExtraBold (`font-extrabold`)
* **Design Spec**: Size `70pt` / Leading `70pt`
* **CSS Equivalent**: `font-size: 93px; line-height: 93px;` (1pt = 1.33px)
* **Tailwind Classes**:
  * **Desktop**: `md:text-[93px] md:leading-[93px]`
  * **Mobile (Scaled)**: `text-[40px] leading-[40px]`
  * **Full**: `font-display font-extrabold tracking-tight text-[40px] leading-[40px] md:text-[93px] md:leading-[93px]`

### B. Sub-Headline 1
* **Usage**: Section titles (e.g. "Who we are", "What we bake", "Featured work").
* **Font Weight**: Bold (`font-bold`)
* **Design Spec**: Size `30pt` / Leading `33pt`
* **CSS Equivalent**: `font-size: 40px; line-height: 44px;`
* **Tailwind Classes**:
  * **Desktop**: `md:text-[40px] md:leading-[44px]`
  * **Mobile (Scaled)**: `text-3xl`
  * **Full**: `font-display font-bold text-3xl md:text-[40px] md:leading-[44px]`

### C. Sub-Headline 2
* **Usage**: Accent paragraphs, callouts, and large card headings (e.g. Hero intro text, large bento cards).
* **Font Weight**: Medium (`font-medium`)
* **Design Spec**: Size `25pt` / Leading `28pt`
* **CSS Equivalent**: `font-size: 33px; line-height: 37px;`
* **Tailwind Classes**:
  * **Desktop**: `md:text-[33px] md:leading-[37px]`
  * **Mobile (Scaled)**: `text-[25px] leading-[28px]`
  * **Full**: `font-display font-medium text-[25px] leading-[28px] md:text-[33px] md:leading-[37px]`

### D. Body Text
* **Usage**: General reading paragraphs and descriptions (e.g. card descriptions, detail paragraphs).
* **Font Weight**: Regular (`font-normal`)
* **Design Spec**: Size `12pt` / Leading `14pt`
* **CSS Equivalent**: `font-size: 16px; line-height: 19px;`
* **Tailwind Classes**:
  * **All viewports**: `text-[16px] leading-[19px]`
  * **Full**: `font-normal text-[16px] leading-[19px]`

### E. Caption / Small / Link Text
* **Usage**: Site navigation items, buttons, metadata, labels, and footer text (e.g. "Our Impact" label, project category labels, copyright notes).
* **Font Weight**: Regular (`font-normal`), Bold (`font-bold`) where needed for action elements.
* **Design Spec**: Size `9pt` / Leading `10.5pt`
* **CSS Equivalent**: `font-size: 12px; line-height: 14px;`
* **Tailwind Classes**:
  * **All viewports**: `text-[12px] leading-[14px]` (or equivalent standard `text-xs`)
  * **Full (Standard)**: `font-display font-normal text-[12px] leading-[14px]`
  * **Full (Uppercase Accent)**: `font-display text-[12px] leading-[14px] uppercase tracking-wider`

---

## 3. Best Practices & Consistency Rules
1. **Never use ad-hoc sizing**: Avoid random text sizes (such as `text-[9px]`, `text-[10px]`, `text-[15px]`, `text-4xl`, etc.) when custom mappings for 70pt, 30pt, 25pt, 12pt, and 9pt are already defined.
2. **Font Mappings**: Ensure that all typography elements declare `font-display` or fall back cleanly to `font-sans` (which is configured in `app/globals.css` to load Montserrat first).
3. **Responsive Scaling**: For headlines and large sub-headlines, always provide mobile-scaled equivalents (e.g. `text-3xl` scaling to `md:text-[40px]`) so text does not overflow or look disproportionate on phones.
4. **Layout Shifts on Hover**: When adding hover states that make text bold (such as in navigation menus), always include an invisible bold helper placeholder element (using a hidden block containing the same text) to reserve sizing bounds and avoid flickering or column movement.
