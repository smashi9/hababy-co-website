---
name: Hababy & Co
description: Warm, parent-led baby gear rental in Rabat — a calm home prepared before the family arrives.
colors:
  primary: "#b94a48"
  primary-deep: "#9f3d3b"
  rose: "#dca5a1"
  sand: "#ead7c3"
  sage: "#8fa18a"
  sage-ink: "#506549"
  taupe: "#a89e94"
  ink: "#333333"
  surface: "#ffffff"
  page: "#fbf7f1"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "normal"
  title:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: "0.02em"
rounded:
  md: "10px"
  lg: "16px"
  xl: "32px"
  pill: "999px"
spacing:
  card: "1.25rem"
  section-y: "4rem"
  section-y-lg: "5.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.15rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.surface}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.15rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card}"
  badge:
    backgroundColor: "#b94a481a"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: "0.4rem 0.7rem"
  badge-sage:
    backgroundColor: "#8fa18a2e"
    textColor: "{colors.sage-ink}"
    rounded: "{rounded.pill}"
  step-number:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    size: "2.5rem"
---

# Design System: Hababy & Co

## 1. Overview

**Creative North Star: "The Prepared Home"**

Hababy & Co should feel like walking into a calm, sunlit Rabat home where everything a family needs has already been cleaned, checked, and set out — before they arrived. The interface does the emotional work of lowering a tired parent's heart rate: warm off-white walls, soft sand-toned bands, generous air between things, and exactly one confident red voice that points to the next step. Nothing shouts. The premium signal is *care*, not luxury ornament — the quiet of a room that someone prepared for you on purpose.

This system is deliberately not a marketplace and not an app store. It rejects the cold efficiency of a SaaS dashboard, the candy-colored noise of a toy shop, the gold-edged exclusivity of a luxury boutique, and the souvenir-stall busyness of heavy Moroccan tiling. Moroccan heritage lives here as *sense of place* — the eight-point star in the logo, a warm earthen palette, a restrained geometric whisper — never as decoration laid on top. The request-first model is presented as a feature: every surface should read as "a real person is preparing this for your family," not "the system isn't automated yet."

Density is low and reassuring. Type is large and readable for someone reading on a phone, one-handed, while a toddler pulls at their sleeve. The committed brand palette and Playfair/Nunito pairing are fixed identity; the craft lives in rhythm, restraint, and detail — pushing the warm-neutral foundation past a generic template into something unmistakably Hababy.

**Key Characteristics:**
- Warm off-white canvas (`#fbf7f1`) with soft sand bands (`#ead7c3`) for sectioning — never stark white pages.
- One bold voice: Marrakech Red (`#b94a48`) reserved for actions and key highlights only.
- Editorial Playfair Display headings over practical Nunito body and UI.
- Soft, generously-rounded surfaces; flat by default with one diffuse shadow for true brand moments.
- Mobile-first, touch-first, calm — large tap targets, roomy spacing, no visual pressure.

## 2. Colors

A warm Moroccan-earthen palette: terracotta red as the single accent voice, sand and rose as soft fills, sage reserved for organic cues, all resting on a warm off-white canvas with charcoal ink.

### Primary
- **Marrakech Red** (`#b94a48`): The one bold color. Primary buttons, the final-CTA band (drenched red, white text), links, badges, step numbers, selected states, and small key highlights. Its scarcity is the point — it should read as *the* action on any screen.
- **Marrakech Red Deep** (`#9f3d3b`): Hover/active state for primary buttons only. Never a fill in its own right.

### Secondary
- **Rose Dust** (`#dca5a1`): Soft decorative fills, gentle warmth, secondary highlights. Fill-only.
- **Sand** (`#ead7c3`): Section bands, hero background, warm surface blocks. The primary tool for sectioning rhythm against the page canvas. Used at partial opacity (`bg-sand/70`, `/55`) for layered warmth.

### Tertiary
- **Sage** (`#8fa18a`) / **Sage Ink** (`#506549`): Organic and premium-natural product cues *only* — organic Welcome Kit badges, milk/organic indicators. Sage Ink is the readable text pairing on sage-tinted fills. Never a second primary.

### Neutral
- **Charcoal** (`#333333`): All body copy, headings, form labels, navigation, functional UI text. The workhorse text color.
- **Taupe** (`#a89e94`): Borders, dividers, muted captions, subtle UI detail — almost always at reduced opacity (`taupe/25`–`/45`).
- **Warm Off-White** (`#fbf7f1`): The main page canvas. The default background of the whole site.
- **White** (`#ffffff`): Cards, forms, clean content surfaces, and the header bar.

### Named Rules
**The One Red Voice Rule.** Marrakech Red carries actions and key highlights only. If two unrelated things on a screen are red, one of them is wrong. Warmth elsewhere comes from sand, rose, type, and imagery — never from spreading the accent.

**The Fills-Are-Not-Text Rule.** Rose Dust and Sand are *never* used as text on white — they fail contrast and read as washed-out. Taupe is for borders and captions, never for running body copy. Body text is Charcoal, full stop.

## 3. Typography

**Display Font:** Playfair Display (with Georgia, serif fallback)
**Body Font:** Nunito (with system-ui, sans-serif fallback)
**Accent Font:** Quicker Script — reserved for rare, small decorative tagline moments only; never functional text.

**Character:** A high-contrast editorial serif paired with a rounded, friendly humanist sans. Playfair brings the quietly-upscale, magazine-warm voice; Nunito keeps everything practical, legible, and soft for dense product and form content. The contrast axis (serif display + rounded sans) is intentional — never pair Playfair with a second serif.

### Hierarchy
- **Display** (Playfair, 500, `clamp(2.25rem, 5vw, 3.75rem)`, line-height 1.1): Hero headline and major brand moments. Ceiling stays at ~3.75rem — premium, not shouting.
- **Headline** (Playfair, 500, `clamp(1.875rem, 3vw, 2.25rem)`, line-height 1.15): Section titles. Set with `text-wrap: balance` for even lines.
- **Title** (Nunito, 800, `1.25rem`, line-height 1.3): Card titles, product names, value-prop headings. Practical content stays in Nunito, not Playfair.
- **Body** (Nunito, 400, `1rem`–`1.125rem`, line-height 1.65): Paragraphs, helper text, descriptions. Cap measure at 65–75ch. Charcoal, or `ink/72`–`/78` for secondary copy where contrast still passes.
- **Label** (Nunito, 900, `0.78rem`, letter-spacing 0.02em): Badges and small functional labels. Heavy weight, minimal tracking.

### Named Rules
**The Playfair-Is-For-Moments Rule.** Playfair Display appears at large sizes for headings and brand moments only. Small UI labels, helper text, dense product info, prices, forms, and admin tables are always Nunito. A serif price tag is a tell.

**The Script-Is-A-Garnish Rule.** Quicker Script is a single decorative word at most ("welcome home"), never a headline, price, button, label, or sentence. When in doubt, don't.

## 4. Elevation

Flat by default. Surfaces sit calmly on the page and earn depth through warm tonal layering — page canvas → sand band → white card — not through stacked shadows. A single diffuse soft shadow is reserved for genuine brand moments (the hero panel, the trust seal, the sticky header on scroll). Cards themselves carry only a near-invisible hairline shadow; their separation comes from a 1px taupe border and the warm background behind them.

### Shadow Vocabulary
- **Soft Ambient** (`box-shadow: 0 18px 50px rgb(51 51 51 / 0.08)`): Hero brand panel, trust-seal card, elevated brand moments. Wide, low-opacity, diffuse — a lifted-into-warm-light feel, never a hard drop shadow.
- **Hairline** (`box-shadow: 0 1px 0 rgb(51 51 51 / 0.03)`): Default cards. Barely-there; the taupe border does the real work.

### Named Rules
**The Border-Before-Shadow Rule.** Separation comes from the 1px taupe border (`#a89e94` at ~25–28% opacity) and the tonal background shift first. Reach for Soft Ambient only when an element is a true brand focal point — never to make an ordinary card "pop."

## 5. Components

### Buttons
- **Shape:** Fully pill (`999px`), min-height 2.875rem for comfortable mobile tapping, weight 800, ~`0.8rem 1.15rem` padding.
- **Primary:** Marrakech Red (`#b94a48`) background, white text. The request actions — "Request a booking", "Request this item", "Continue on WhatsApp".
- **Hover / Focus:** Background deepens to `#9f3d3b` with a subtle `translateY(-1px)` lift over a 160ms ease. Focus-visible must show a clear ring (add for AA — see Don'ts).
- **Secondary:** Translucent white (`rgb(255 255 255 / 0.75)`) with a 1px taupe border (`rgb(168 158 148 / 0.45)`) and charcoal text. On hover, border and text shift to Marrakech Red. Used for "Chat on WhatsApp" and quieter actions. Never styled as a payment CTA.

### Badges
- **Default:** Marrakech Red text on a 10% red tint (`#b94a481a`), pill, weight 900, `0.78rem`. Service states — "Request to book", "Personally confirmed".
- **Soft:** Charcoal text on a 60% sand tint — informational, non-urgent labels.
- **Sage:** Sage-Ink text (`#506549`) on an 18% sage tint — organic / premium-consumable cues only.
- Every badge carries a text label; availability is never communicated by color alone.

### Cards / Containers
- **Corner Style:** Generous 16px (`rounded.lg`); larger brand panels go to 24–32px.
- **Background:** White on the warm page, or warm page on a sand band — always a tonal step against what's behind.
- **Shadow Strategy:** Hairline by default (see Elevation). No drop shadows on content cards.
- **Border:** 1px taupe at ~25–28% opacity.
- **Internal Padding:** Comfortable and touch-friendly (`1.25rem`+).
- Cards should feel organized and calm, never salesy. **Never nest a card inside a card.**

### Pills & Tiles (signature)
- Category tiles, delivery-zone pills, and promise items share one quiet system: white background, 1px taupe border, weight 800 charcoal, pill or 16px-rounded. They make options feel light and tappable rather than heavy or commercial.

### Inputs / Fields (to build)
- **Style:** Large, touch-friendly, white background, 1px taupe border, ~10px radius, clear charcoal label above.
- **Focus:** Border shifts to Marrakech Red with a soft red focus ring; never remove the focus indicator.
- **Validation:** Friendly, specific, parent-to-parent ("Same-day delivery isn't available — please request at least 24 hours ahead"). The booking flow must feel like a guided request, never a checkout.

### Navigation
- **Header:** Sticky, warm off-white at 95% with backdrop blur, 1px taupe bottom border. Horizontal logo left, centered/right nav links (Nunito 800, `ink/75`, hover to red), an EN/FR language pill, and the two CTAs (secondary WhatsApp + primary request) right-aligned. Mobile collapses links and keeps the primary CTA reachable.
- **Footer:** White, taupe top border, three columns (brand sentence + Rabat-pilot note, Explore links, Trust & policy links + WhatsApp). Practical and trustworthy.

## 6. Do's and Don'ts

### Do:
- **Do** keep the page on warm off-white (`#fbf7f1`) and section with sand bands (`#ead7c3`) — never stark white full pages.
- **Do** reserve Marrakech Red for actions and key highlights only (The One Red Voice Rule).
- **Do** set body copy in Charcoal at ≥4.5:1 contrast; verify `ink/72`-style opacities still pass before shipping them.
- **Do** use Playfair for headings/brand moments and Nunito for everything functional.
- **Do** keep surfaces flat with a 1px taupe border; reserve the Soft Ambient shadow for true brand focal points.
- **Do** give every interactive element a visible focus state and a `prefers-reduced-motion` fallback (WCAG 2.1 AA).
- **Do** keep Moroccan inspiration subtle — the star mark and earthen warmth, not tiled backgrounds.
- **Do** make availability and deposits explicit; clarity is the premium signal.

### Don't:
- **Don't** use Rose Dust, Sand, or Taupe as text on white — fills and borders only; body text is Charcoal.
- **Don't** make it look like a generic rental **marketplace** or e-commerce discount catalogue, a cartoonish **toy shop**, a cold **SaaS dashboard / hero-metric** template, a gold-edged **luxury boutique**, or a busy **Moroccan-souvenir tile** background (PRODUCT.md anti-references).
- **Don't** put a tiny uppercase tracked **eyebrow above every section** — it's the template tell to design away from. Find a different cadence.
- **Don't** nest a card inside a card (the current hero stacks card-in-card — rework toward a single calm surface).
- **Don't** use `border-left`/`border-right` colored side-stripes, gradient text (`background-clip: text`), or decorative glassmorphism — ever.
- **Don't** spread Marrakech Red across multiple unrelated elements on one screen.
- **Don't** use checkout / payment language ("Book now", "Buy now", "Pay now", "Instant checkout") or make availability feel uncertain ("Awaiting confirmation", "Maybe available").
- **Don't** overuse Quicker Script, or set Playfair at small functional sizes.
