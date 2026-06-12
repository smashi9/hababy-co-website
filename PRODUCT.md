# Product

## Register

brand

> The primary surface is the customer-facing marketing + request-to-book site (`hababy-site/`), where design *is* the product: it carries trust, warmth, and the premium-but-approachable positioning. The lightweight admin panel (built later) is a separate **product**-register surface — functional, plain, not editorial. When working on admin screens, treat the register as `product` for that task.

## Users

Hababy & Co serves families arriving in Rabat who need clean, inspected baby gear waiting for them — most browsing on a phone, often tired, often planning a trip. Four audiences in priority order:

1. **Moroccan diaspora returning home** for holidays or family visits — want reliable gear on arrival, easy WhatsApp contact, trust that items are clean and safe, delivery to a family home or the airport.
2. **Embassy, UN, NGO, relocation, and expat families in Rabat** — want professional service, clear pricing and deposits, delivery to home/hotel/serviced apartment, communication in English and French.
3. **Travelling families visiting Rabat** — want to understand the service fast, a simple request flow, clear safety/cleaning reassurance, mobile-friendly browsing.
4. **Local parents, grandparents, and hosts** (including Airbnb hosts, hotels, serviced apartments) — want temporary gear for visiting family, curated bundles, reliable delivery and pickup.

The job to be done: *"Get the right clean, safe baby gear to where my family is staying in Rabat, without carrying it across the world, and without worrying whether a stranger will actually deliver."*

## Product Purpose

A premium, parent-led baby equipment **rental** service launching as a deliberately Rabat-only pilot. The site helps a visitor understand the service, browse gear / bundles / Welcome Kits, and submit a **request** — not an instant purchase. Hababy & Co then personally confirms availability, delivery, and offline payment within 24 hours, with WhatsApp as the human handoff channel.

Success looks like: a visitor understands the service from the homepage, requests gear without confusion or any sense of online checkout, sees a clear "confirmed within 24 hours" message, and continues on WhatsApp — while the order is saved either way. The pilot stays Rabat-only so quality, punctual delivery, and personal service can be guaranteed.

This is also the first real test of an AI-assisted, non-coder website-building workflow, so the build is documented as a repeatable case study.

## Brand Personality

**Warm · Trustworthy · Parent-led.**

Voice is parent-to-parent: calm, competent, practical, reassuring — never cute, corporate, or salesy. The manual confirmation step is framed as a *quality feature* ("personally confirmed", "cleaned and checked", "confirmed within 24 hours"), never as a limitation ("awaiting confirmation", "maybe available"). Quietly upscale and Moroccan-inspired by *sense of place*, not souvenir decoration. The interface should make a tired parent feel: *this is safe, clean, reliable, personal — this will make travelling with my baby easier.*

Emotional goal: reduce stress. Lower the visitor's heart rate.

## Anti-references

This must NOT look or feel like:

- A generic **rental marketplace** or e-commerce discount catalogue (no "listings", no "book now / buy now / instant checkout", no payment-gateway language).
- A loud, cartoonish **baby store** or baby-shower invitation (no clipart, no pastel overload, no script-font excess).
- A cold **corporate SaaS dashboard** or tech-startup landing page (no hero-metric template, no generic feature-card grid).
- An inaccessible **luxury gold boutique** — premium but approachable, not exclusive.
- A **busy Moroccan-souvenir / tourist** aesthetic — zellige and geometry stay subtle, low-contrast, behind text at most.

Specific 2026-template tells to avoid even while honoring the warm palette: the small uppercase tracked **eyebrow above every section**, identical repeating **icon-heading-text card grids**, and a body background that reads as the default cream/sand template rather than distinctly *Hababy*.

## Design Principles

1. **Request-first is a feature, not a fallback.** Every flow should feel like a guided, personal request — calm, never a checkout. Confirmation language is reassurance, not apology.
2. **Trust is built in the details.** Cleanliness, safety, and "a real person checked this" are reinforced visually and in copy at every step. Deposits and estimates are clear, never hidden — clarity *is* the premium signal.
3. **Mobile-first, tired-parent-first.** The primary user is on a phone, distracted, planning travel. Core journeys must be excellent on mobile before any desktop polish; nothing important hides behind the WhatsApp button.
4. **Keep the brand, elevate the craft.** The committed palette (Marrakech Red, Sand, Sage, Charcoal on warm off-white) and type system (Playfair Display + Nunito) are fixed identity. Push layout, rhythm, typography, and detail so the result reads as distinctively Hababy — not a warm-neutral template. Moroccan inspiration stays subtle and refined.
5. **Local and accountable, not nationwide and automated.** The Rabat-only pilot is presented as deliberate quality control. One curated operator, personally responsible — never a multi-city platform.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. Concretely:

- Body text ≥ 4.5:1 against its background; large/heading text ≥ 3:1. Charcoal (`#333`) on warm off-white / sand passes — Rose Dust and Sand are **fills only, never text on white**, and Taupe is for borders/captions, not body copy.
- Never rely on color alone for state (availability badges carry text labels, not just hue).
- Full keyboard navigation, visible focus states, semantic structure, and a `prefers-reduced-motion` alternative for every animation.
- Mobile-first with large, touch-friendly targets and clear form labels + friendly validation.
- English and French at launch, with layouts kept flexible (no text baked into images, no over-narrow containers) so French's longer strings fit and Arabic / RTL remains possible later.
