# John Deere Design System

## Company Overview

Deere & Company (NYSE: DE), founded 1837 by blacksmith John Deere in Grand Detour, Illinois. Headquartered in Moline, IL. One of the world's largest manufacturers of agricultural, construction, forestry, and turf equipment. ~$55B annual revenue; ~75,000 employees; operations in 160+ countries. Fortune 500 #84.

**Brand promise:** "Nothing Runs Like a Deere™"  
**Hero copy pattern:** "BUILDING AMERICA SINCE 1837."

## Product Lines

| Segment | Products |
|---|---|
| **Agriculture** | Row-crop tractors (8R, 9R), utility tractors (5M, 6M, 7R), combines (S-Series, X9), planters (ExactEmerge), sprayers (R4038, R4045), tillage, hay |
| **Construction & Forestry** | Excavators, dozers, loaders, motor graders, forestry harvesters |
| **Turf & Utility** | Riding mowers (X, Z series), compact tractors (1–3 Series), Gator UTVs |
| **Technology** | Operations Center, JDLink™, APEX™, See & Spray™, AutoTrac™, CommandCenter™ |

## Digital Products Covered

### 1. Operations Center (primary UI kit)
Web farm management platform at `operations.deere.com`. Farm/field tracking, equipment monitoring, crop planning, reporting. Enterprise SaaS for farmers, agronomists, and ag retailers. UI kit: `ui_kits/operations_center/`.

### 2. Marketing Website (secondary UI kit)
`deere.com` — product discovery, dealer locator, equipment specs, brand storytelling. UI kit: `ui_kits/marketing/`.

## Asset Sources

| Asset | Location | Notes |
|---|---|---|
| Logo SVGs | `assets/logo/` | Copied from provided uploads; CSS `<style>` blocks added |
| Badge SVG (official) | `uploads/John_Deere_idueR-FERQ_6.svg` | Original upload |
| Horizontal lockup | `uploads/John_Deere_idg9_cq9LF_1.svg` | Original upload |
| Color-bar lockup | `uploads/John_Deere_Logo_4.svg` | Original upload |
| Banner photography | `assets/images/` | Provided |
| Brand guidelines PDF | `uploads/deere_brand_guideline_john_deere_inspired.pdf` | Image-based; limited text extraction |

---

## Content Fundamentals

### Voice & Tone
**Direct.** No hyperbole. If the combine is the most productive, say by how much. If the system saves time, say how many hours.

**Hardworking.** Every word earns its place. Short sentences. Active verbs. No corporate filler.

**Trusted.** 180+ years on the land. Copy leans into heritage and results — not nostalgia.

**Human-scale.** Even at global scale, JD speaks to the individual: "your fields", "your operation", "your next harvest."

### Style Rules
| Rule | Detail |
|---|---|
| Headlines | ALL CAPS. Period at end of complete sentences: "BUILT FOR THE WAY YOU FARM." |
| Body copy | Sentence case. |
| UI labels, nav, status | ALL CAPS |
| Button labels | Title Case: "View Fields", "Add Equipment" |
| Product names | Official capitalization: "ExactEmerge™", "8R 410", "S790 Combine" |
| Numbers | Always numerals: "37 fields", "4.2 ac/hr", not "thirty-seven fields" |
| Units | US customary: acres, mph, bu/ac, °F |
| Pronouns | "You/your" for users. "We" sparingly. Never "I/me" for the product. |
| Emoji | Never in enterprise digital products |

### Copy Examples
- Hero: `"BUILT FOR THE WAY YOU FARM."`
- CTA: `"View My Fields"` / `"Track Equipment"`
- Status label: `"ACTIVE · 4.2 AC/HR"`
- Error: `"Unable to connect to JDLink. Check machine status."`
- Empty state: `"No fields added yet. Add your first field to get started."`

---

## Visual Foundations

### Color System
Three primary brand colors, all confirmed from official SVG logo files:

| Token | Value | Use |
|---|---|---|
| `--jd-green-600` | `#367C2B` | Primary buttons, active states, header accents, brand elements |
| `--jd-yellow-400` | `#FFDE00` | Deer mark, warnings, highlights, accent bars. Never as body text background. |
| `--neutral-800` | `#27251F` | Primary text, sidebar backgrounds, heavy UI chrome |

Neutrals are **warm gray** throughout — never pure grays or cool grays.

### Typography
- **Display**: Barlow Condensed 700/800 — hero text, section headers, callouts, ALL CAPS headlines
- **Body/UI**: Barlow 400/500/600/700 — all body copy, labels, data, nav
- **Mono**: JetBrains Mono — coordinates, telemetry values, technical data fields

### Backgrounds
- Main content: `var(--surface-page)` = `#F8F7F5` (warm near-white)
- Cards: `#FFFFFF` with subtle shadow or `1px` border
- Sidebar: `#1A1A18` (near-black warm)
- No gradients on UI chrome. No textures in digital products.
- Photography (marketing only): full-bleed on hero surfaces.

### Animation
- Easing: `ease-out` entering (decelerate), `ease-in` exiting (accelerate)
- Micro-interactions (hover, focus, toggle): `150ms`
- Panel/drawer open-close: `250ms`
- Page-level transitions: `350ms`
- No decorative loops — operator contexts require sustained focus
- Loading: skeleton screens preferred; green spinner for inline actions

### Hover / Press States
- Buttons: darken ~12% on hover; `scale(0.98)` on press
- Cards: shadow lifts one level
- List rows: `#EDF7EA` (lightest green tint) on hover
- Links: underline + darken

### Focus States
- 3px offset ring: `0 0 0 3px rgba(54,124,43,0.32)` (JD green, 32% opacity)
- Always visible — operators may use keyboard or limited input devices

### Cards
White background. 1px `#DEDEDC` border or `var(--shadow-sm)`. `8px` radius. `16–24px` padding.

### Corner Radius
| Context | Value |
|---|---|
| Badges, tags | 4px |
| Buttons, inputs | 6px |
| Cards, panels | 8px |
| Modals | 12px |
| Pills, avatars | 9999px |

### Imagery
- Equipment in real farm/field settings — not studio or stock
- Golden-hour and natural mid-day lighting; saturated greens and warm golds
- Human presence: actual operators, farmers, technicians
- Aerial/drone photography prominent
- Split compositions: factory + field, person + machinery
- No AI-generated or styled stock imagery

### Transparency / Blur
- Modal backdrop: `rgba(26, 26, 24, 0.72)`
- No backdrop-filter in data-dense interfaces
- Tooltips: opaque only

---

## Iconography

**Primary system:** Heroicons (Outline style, 24px default, stroke `1.5px`)  
**Sizes:** 16px (sm), 20px (md), 24px (lg)  
**Color:** `currentColor` — inherits from text  
**Usage:** Inline SVG from heroicons.com or via CDN in non-React contexts  

Equipment-specific glyphs (tractor silhouette, combine, planter) used in Operations Center — maintain consistent stroke weight with Heroicons.

No emoji as icons. No Unicode characters as icons.

---

## Font Notes

⚠️ **Substitution active.** Barlow (body) + Barlow Condensed (display) are used as the closest publicly-available substitutes for JD's proprietary digital typeface. Replace with licensed fonts when supplied by the brand team.

---

## File Manifest

```
styles.css                    Global CSS entry point (@import only)
tokens/
  fonts.css                   Google Fonts import (Barlow + JetBrains Mono)
  colors.css                  Full color token system
  typography.css              Font family, scale, weight, leading tokens
  spacing.css                 4px-grid spacing scale + layout tokens
  shadows.css                 Shadow scale + semantic aliases
  borders.css                 Radius + border-width tokens

assets/
  logo/
    jd-badge.svg              Badge mark (leaping deer) — styled SVG
    jd-horizontal.svg         Horizontal lockup (badge + wordmark) — styled SVG
    jd-lockup.svg             Full lockup with green/yellow color bars — styled SVG
    jd-badge.png              Badge PNG
    jd-horizontal.png         Horizontal lockup PNG
    jd-lockup.png             Full lockup PNG
  images/
    banner-building-america.jpeg   Hero banner — "BUILDING AMERICA SINCE 1837."
    factory-worker.jpeg            Factory worker photography

components/
  core/                       Button, Badge, Card, Avatar
  forms/                      Input, Select, Toggle, Checkbox
  data/                       DataTable, StatusIndicator
  navigation/                 Tabs, Breadcrumb

guidelines/                   Foundation specimen cards (colors, type, spacing, shadows, brand)

ui_kits/
  operations_center/          Precision ag web platform (fields, equipment, dashboard)
  marketing/                  deere.com marketing homepage

SKILL.md                      Agent skill definition
readme.md                     This file
```
