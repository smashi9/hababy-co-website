---
target: homepage
total_score: 30
p0_count: 0
p1_count: 4
timestamp: 2026-06-12T13-23-44Z
slug: hababy-site-components-home-homepage-tsx
---
# Critique — Hababy & Co Homepage

Target: `hababy-site/components/home/HomePage.tsx` (+ SiteHeader, SiteFooter). Register: brand.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Hover feedback present; little real status (static page, no forms yet) |
| 2 | Match System / Real World | 4 | Voice is excellent — plain, parent-to-parent, no jargon |
| 3 | User Control and Freedom | 3 | Sticky header, anchor nav, no traps; CTAs dead-end at anchors |
| 4 | Consistency and Standards | 3 | Token system is consistent — but eyebrow-on-every-section is consistency-to-a-fault |
| 5 | Error Prevention | 3 | n/a — no forms built yet |
| 6 | Recognition Rather Than Recall | 3 | Labeled nav; footer policy items look clickable but are inert spans |
| 7 | Flexibility and Efficiency | 3 | Fine for a landing; no skip-link/keyboard accelerators |
| 8 | Aesthetic and Minimalist Design | 2 | Placeholder copy, identical card grids, nested hero cards, eyebrow noise |
| 9 | Error Recovery | 3 | n/a — nothing to recover yet |
| 10 | Help and Documentation | 3 | How-It-Works is genuinely helpful inline guidance |
| **Total** | | **30/40** | **Good — solid foundation, brand-distinctiveness is the real gap** |

## Anti-Patterns Verdict

**Does this look AI-generated? Yes — recoverably so.** The build is competent, on-palette, and well-organized, but it carries three of the skill's named tells at once: an uppercase tracked **eyebrow above every section** (7 sections + two more tracked labels), **identical card grids** (3 value props, 6 bundles, 4 kits, all same-sized icon/heading/text), and the documented **warm-off-white + sand** palette that is itself the 2026 template default. Add **zero photography** and visible **placeholder copy**, and a visitor could say "AI made this." This is exactly what PRODUCT.md principle #4 ("keep the brand, elevate the craft") targets — the identity is right; the craft hasn't yet escaped the template.

**Deterministic scan:** `detect.mjs` returned 0 findings, but it under-parses TSX/Tailwind; absence of findings is a tooling limit, not a clean result. Manual review is authoritative.

## What's Working

1. **Voice and copy** — "personally confirmed", "checked like a parent would", "delivered before you arrive". Genuinely warm, specific, parent-to-parent. The single strongest asset; heuristic #2 = 4.
2. **A real, consistent token system** — the committed palette, Playfair/Nunito pairing, pill buttons, and card border system are applied consistently. The foundation is sound.
3. **Request-first framing is present** — the hero disclaimer and How-It-Works section land the "this is checked by a person" model early and calmly.

## Priority Issues

- **[P1] Eyebrow above every section.** `SectionIntro` renders `text-sm font-extrabold uppercase tracking-[0.18em] text-primary` on 7 sections; "The Hababy Promise" and "Request-first booking" add two more tracked labels. This is the saturated AI scaffold. Fix: kill the repeating eyebrow; find one different cadence (a single named kicker system, or let the Playfair headline carry sections alone). Command: `/impeccable typeset`.
- **[P1] Zero imagery on an imagery-implied brand brief.** A family baby-gear service shows no photography — the hero puts the logo in a box where a warm lifestyle/product/arrival photo belongs (the "colored rectangle where a hero image goes" failure). The UI brief itself asked for a lifestyle/product visual. Fix: ship real hero + product/trust imagery (warm Rabat home, clean gear, arrival moment). Command: `/impeccable bolder`.
- **[P1] Visible placeholder & duplicated copy undermines a trust brand.** Bundles renders 6 identical cards all reading "Placeholder bundle preview…"; the hero repeats "Prepared with care for your family." 3×; the product fallback note is user-visible. A premium, trust-led brand cannot show "Placeholder" to visitors. Fix: real differentiated bundle/kit copy. Command: `/impeccable clarify`.
- **[P1] Mobile navigation disappears.** Nav links are `hidden … lg:flex` with no hamburger/menu fallback. Below 1024px the entire main nav vanishes, leaving only the Request button. Fix: add a real mobile menu (disclosure/drawer). Command: `/impeccable adapt`.
- **[P2] Nested cards + monotonous section rhythm.** The hero stacks card-in-card-in-card (panel → white box → three mini-cards — nested cards are always wrong), and nearly every section is the same shape: eyebrow + Playfair title + grid of identical white cards. No art-direction variation across folds. Fix: rebuild the hero as one calm surface; vary section composition. Command: `/impeccable layout`.

## Persona Red Flags

**Jordan (First-Timer):** Clicks "Bundles" in the nav → page just scrolls to a grid of cards labeled "Placeholder bundle preview." Reads as broken/unfinished; erodes trust at first contact. "Chat on WhatsApp" scrolls to the footer instead of opening WhatsApp — the promised action doesn't happen.

**Casey (Distracted Mobile):** On a phone the main nav is gone entirely (no menu). No floating WhatsApp button (a stated PRODUCT requirement); the WhatsApp CTA only scrolls. Primary "Request a booking" is reachable (good), but the contact path she actually wants doesn't reach WhatsApp.

**Riley (Stress Tester):** WhatsApp CTAs are `#contact` anchors, not `wa.me` links — appears to work, doesn't. Footer policy items (Terms, Privacy, Deposit/Cancellation) are inert `<span>`s styled like links. "Request a booking" → `#request` → its button → `#products`: circular, no real destination.

**Nadia (project persona — Moroccan diaspora mum, one-handed on a phone, tired):** Wants to reach a real person on WhatsApp fast and to *see* the gear she's trusting with her baby. Both fail: WhatsApp doesn't open, and there's no imagery of the actual gear or homes.

## Minor Observations

- Footer policy links are non-interactive spans at `text-ink/55` on white (~3.4:1) — both a contrast miss and a recognition trap.
- Muted body opacities (`ink/70`, `/72`, `/78`) pass on warm sections but sit close to the 4.5:1 floor; the `/55` cases fail. Worth an audit pass.
- No `:focus-visible` styling on `.btn`/links beyond browser default — verify visible focus for WCAG 2.1 AA.
- Zero motion anywhere (only hover transitions). For a brand surface this is a missed first-load opportunity, not a failure.

## Questions to Consider

- What would the hero look like if a single warm photograph carried it, with the logo small in the header where it belongs?
- If the eyebrow disappeared from all seven sections, what would give each section its identity instead?
- Does a trust brand survive showing the word "Placeholder" to a tired parent deciding whether to trust you with their baby's car seat?
