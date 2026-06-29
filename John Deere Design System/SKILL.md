---
name: john-deere-design
description: Use this skill to generate well-branded interfaces and assets for John Deere, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick Reference

**Brand colors:**
- JD Green: `#367C2B` (primary — buttons, active states, headers)
- JD Yellow: `#FFDE00` (accent — warnings, highlights, deer mark)
- JD Black: `#27251F` (warm near-black — text, sidebar)

**Fonts:** Barlow Condensed (display/headlines, 700–800) + Barlow (body/UI, 400–700) + JetBrains Mono (data)
```html
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@700;800&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
```

**Logo:** Use `assets/logo/jd-badge.svg` (badge only) or `assets/logo/jd-horizontal.svg` (badge + wordmark).

**Copy style:** ALL CAPS heroes with period. "BUILT FOR THE WAY YOU FARM." Active voice. "Your fields." No emoji.

**Key components:** Button, Badge, Card, Input, Select, Toggle, DataTable, StatusIndicator, Tabs — all in `components/`.

**UI kits:** `ui_kits/operations_center/` (precision ag platform) and `ui_kits/marketing/` (deere.com).
