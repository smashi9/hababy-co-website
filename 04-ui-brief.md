# Project 001 — UI Brief

## Product Name

Hababy & Co

## Document Purpose

This document defines the visual and user-interface direction for the Hababy & Co website.

It should be used by:

* Gemini for visual exploration and UI direction
* Claude Code for design review and critique
* Codex for implementing the visual system
* ChatGPT for explaining and documenting design decisions

This file focuses on how the website should look, feel, sound, and behave visually.

It does not define the full technical architecture, database schema, backend logic, or implementation sequence.

## Source Documents

This UI brief is based on:

```text
00-project-brief.md
01-product-requirements.md
99-source-materials/hababy-developer-handover-original.md
```

## Brand Summary

Hababy & Co is a premium, parent-led baby equipment rental service launching as a Rabat-only pilot.

The brand should feel:

* Warm
* Calm
* Trustworthy
* Parent-led
* Premium but approachable
* Quietly upscale
* Moroccan-inspired
* Practical
* Service-oriented
* Clean and reassuring

The website should not feel like a generic rental marketplace.

It should feel like a curated, personal, accountable service that helps families arrive comfortably in Rabat.

## Design Goal

The website should make parents feel:

```text
This is safe.
This is clean.
This is reliable.
This is personal.
This will make travelling with my baby easier.
```

The design should reduce stress.

It should feel calm, warm, and easy to understand.

## Visual Direction

The visual direction should be:

```text
Warm Moroccan editorial
Soft premium family service
Clean mobile-first rental interface
Parent-led and trustworthy
```

Avoid:

```text
Cheap marketplace
Overly playful baby store
Corporate SaaS dashboard
Cold tech startup
Overly luxury boutique
Busy Moroccan souvenir aesthetic
```

The Moroccan inspiration should be subtle and refined, not decorative overload.

## Audience Impact

The UI should work for four main audiences:

1. Moroccan diaspora returning home
2. Embassy, UN, NGO, relocation, and expat families
3. Travelling families visiting Rabat
4. Local parents, grandparents, and hosts

The design should feel international enough for expats and visitors, while still having a warm Moroccan sense of place.

## Confirmed Brand Assets

The following logo assets are confirmed for this project and should be used in the build.

Store them in:

```text
02-projects/project-001-first-website/assets/brand/
```

Confirmed SVG files:

| Asset                   | Filename                     | Intended Use                                            |
| ----------------------- | ---------------------------- | ------------------------------------------------------- |
| Primary vertical logo   | `hababy-logo-primary.svg`    | Hero section, brand moments, print-style placements     |
| Horizontal logo         | `hababy-logo-horizontal.svg` | Website header, navigation, footer brand area           |
| Stork mark without text | `hababy-stork-mark.svg`      | Favicon, badge-style UI, watermark, small brand moments |

## Logo System

The Hababy & Co logo system is based on a stork carrying a bundle with a small heart, placed inside an eight-point Moroccan star.

The confirmed logo assets cover the most important website uses:

```text
Primary logo
Horizontal logo
Icon / stork mark
```

The original brand system also mentions possible future lockups:

```text
App icon
Badge / stamp
One-colour logo
Reversed white logo
```

These should be treated as optional or future assets unless the files are actually added to the project.

Do not assume these optional files exist during implementation.

## Logo Usage Guidance

Use the horizontal logo for:

```text
Website header
Navigation
Footer brand area
Email-style layouts
```

Use the primary vertical logo for:

```text
Hero section
Brand-led landing sections
Print-style visuals
Presentation moments
```

Use the stork mark without text for:

```text
Favicon
Small badge-style UI
Watermark
Trust badge
Loading state
Social avatar placeholder
```

## Temporary Fallback Rule

If an expected logo file is missing during implementation, do not invent a new logo.

Instead:

* Use the text wordmark `hababy & co`
* Use the confirmed brand colours and typography
* Add a clear developer note saying the logo file is missing
* Continue the build without blocking the entire project

## Logo Rules

Once final logo files are used:

* Do not stretch the logo.
* Do not rotate the logo.
* Do not recolour the stork.
* Do not add gradients.
* Do not add shadows.
* Do not place the full-colour logo on busy backgrounds.
* Use the horizontal logo in the site header.
* Use the stork mark for favicon or small icon use.
* Keep enough clear space around the logo.
* Use SVG versions where possible.

## Colour Palette

Use the confirmed Hababy & Co brand colours.

| Role            | Name           | HEX       | Use                                             |
| --------------- | -------------- | --------- | ----------------------------------------------- |
| Primary         | Marrakech Red  | `#B94A48` | Logo, primary buttons, CTAs, links, key accents |
| Accent          | Rose Dust      | `#DCA5A1` | Soft fills and secondary highlights only        |
| Surface         | Sand           | `#EAD7C3` | Section backgrounds, cards, soft bands          |
| Organic Accent  | Sage           | `#8FA18A` | Organic or premium-natural product cues         |
| Neutral         | Taupe          | `#A89E94` | Borders, muted captions, dividers               |
| Ink             | Charcoal       | `#333333` | Body text and most headings                     |
| Page Background | Warm Off-White | `#FBF7F1` | Main page background                            |
| Surface         | White          | `#FFFFFF` | Cards, forms, clean sections, admin surfaces    |

## Colour Usage Rules

### Marrakech Red

Marrakech Red is the main bold colour.

Use it for:

* Primary buttons
* Important CTAs
* Links
* Logo accents
* Selected states
* Key highlights

Do not overuse it.

It should remain the one bold colour in the interface.

### Rose Dust

Use Rose Dust for:

* Soft backgrounds
* Decorative fills
* Gentle highlights
* Secondary visual warmth

Do not use Rose Dust as text on white.

### Sand

Use Sand for:

* Hero bands
* Section backgrounds
* Cards
* Warm surface areas
* Soft content blocks

Do not use Sand as text on white.

### Sage

Use Sage only for:

* Organic option badges
* Premium-natural product cues
* Milk or organic-related indicators

Use it sparingly.

Sage should not become a second primary brand colour.

### Taupe

Use Taupe for:

* Borders
* Dividers
* Muted labels
* Captions
* Subtle UI details

Do not use Taupe for long body text.

### Charcoal

Use Charcoal for:

* Body copy
* Headings
* Form labels
* Navigation
* Functional UI text
* Product descriptions

## CSS Variables

Use these CSS variables in the build:

```css
:root {
  --color-primary:   #B94A48;
  --color-rose:      #DCA5A1;
  --color-sand:      #EAD7C3;
  --color-sage:      #8FA18A;
  --color-taupe:     #A89E94;
  --color-ink:       #333333;
  --color-surface:   #FFFFFF;
  --color-page:      #FBF7F1;

  --font-heading: "Playfair Display", Georgia, serif;
  --font-body:    "Nunito", system-ui, sans-serif;
  --font-accent:  "Quicker Script", cursive;

  --radius-md: 10px;
  --radius-lg: 16px;
}
```

## Typography

Use the confirmed Hababy & Co font system.

## Headings

Use:

```text
Playfair Display
```

For:

* Hero headings
* Section headings
* Page titles
* Editorial brand moments

Playfair Display should be used at larger sizes.

Avoid using it for:

* Small UI labels
* Form helper text
* Dense product information
* Admin tables
* Functional microcopy

## Body and UI

Use:

```text
Nunito
```

For:

* Paragraphs
* Buttons
* Navigation
* Forms
* Labels
* Product cards
* Admin UI
* Functional text
* FAQ content
* Booking flow copy

Nunito is the main practical font of the website.

## Accent Font

Use:

```text
Quicker Script
```

Very sparingly.

Appropriate uses:

* A small tagline word
* A “welcome home” note
* A warm editorial accent

Do not use Quicker Script for:

* Body text
* Prices
* Forms
* Buttons
* Product names
* Functional labels
* Admin UI
* Legal content
* Navigation

## Typography Rules

* Use sentence case in running text.
* Keep the wordmark lowercase as `hababy & co`.
* Use line-height around 1.6 for readable body copy.
* Use no more than two weights per font family where possible.
* Prioritize readability over decoration.
* Do not make the site feel like a baby shower invitation.
* Do not make the site feel like a luxury fashion magazine.
* Leave enough space for French text, which may be longer than English.

## Layout Principles

The website should feel spacious, calm, and easy to scan.

Use:

* Generous whitespace
* Rounded cards
* Soft section bands
* Clear CTAs
* Clean product grids
* Simple step-by-step flows
* Trust-building microcopy
* Mobile-first layouts

Avoid:

* Dense text blocks
* Overly complex animations
* Busy backgrounds behind text
* Too many decorative motifs
* Too many colours competing at once
* Layouts that only work well in English

## Component Style

## Buttons

Primary buttons should use:

* Marrakech Red background
* White text
* Rounded corners
* Clear action language

Examples:

```text
Request a booking
Request this item
Continue on WhatsApp
```

Secondary buttons should use:

* White or transparent background
* Marrakech Red or Charcoal text
* Subtle border

Examples:

```text
Chat on WhatsApp
View bundles
Learn how it works
```

Button labels should be specific.

Avoid vague labels like:

```text
Submit
Click here
Continue
```

unless the surrounding context is very clear.

## Cards

Cards should feel soft and trustworthy.

Use cards for:

* Product listings
* Bundles
* Welcome Kits
* Value propositions
* Trust badges
* How-it-works steps
* FAQ highlights

Card styling:

* White or warm off-white background
* Soft border in Taupe or light neutral
* Rounded corners
* Comfortable padding
* Minimal shadow or no shadow

Cards should feel organized, not “salesy.”

## Badges

Use badges for:

* Request to book
* Personally confirmed
* Available on request
* Organic available
* Model image note
* Rabat pilot
* Cleaned and checked

Badge colour guidance:

* Marrakech Red for important service states
* Sage for organic options
* Taupe or neutral for informational labels

Avoid badges that make availability feel uncertain.

Preferred labels:

```text
Request to book
Personally confirmed
Available on request
```

Avoid labels like:

```text
Awaiting confirmation
Maybe available
Unknown
```

## Forms

Forms should feel simple and reassuring.

Use:

* Large touch-friendly inputs
* Clear labels
* Helpful helper text
* Friendly validation messages
* Step-by-step structure
* Visible progress indicators in the booking flow

Avoid making the booking flow look like a checkout.

It should feel like a guided request.

## Imagery Direction

Use photography that feels:

* Soft
* Natural
* Warm
* Clean
* Real
* Calm
* Family-oriented
* Not overly staged

Preferred imagery:

* Clean baby gear in warm homes
* Arrival moments
* Stroller, cot, high chair, and car seat details
* Calm parent preparing for travel
* Rabat or Morocco sense of place, used subtly
* Neutral interiors
* Soft daylight

Avoid imagery that feels:

* Stock-photo corporate
* Messy
* Overly colourful
* Loud baby-store style
* Too luxury and inaccessible
* Too sterile and medical

Manufacturer images are acceptable during the pilot, but where used, the UI should support this note:

```text
Model image; exact item confirmed before delivery.
```

## Patterns

Patterns may be used sparingly.

Possible pattern references:

* Zellige tile
* Scattered storks
* Moroccan trellis
* Soft geometric motifs

Use patterns for:

* Subtle section backgrounds
* Packaging-inspired moments
* Social tiles
* Small decorative bands

Pattern rules:

* Keep patterns low-contrast behind text.
* Do not place busy patterns behind important copy.
* Do not overuse Moroccan motifs.
* The brand should feel Moroccan-inspired, not tourist-themed.

## Iconography

Use a consistent outline icon set.

Icons may include:

```text
Stroller
Crib
High chair
Car seat
Travel cot
Baby monitor
Bottle
Pacifier
Changing table
Diaper bag
Safe and clean
Sanitized
Calendar
Flexible
Delivery
Location
Care
Family
Package
Payment
Support
Trusted
```

Icon rules:

* Use consistent stroke weight.
* Use Charcoal or Marrakech Red.
* Use icons to aid scanning, not as decoration only.
* Icons should support categories, how-it-works steps, safety, and trust badges.
* Do not mix many icon styles.

## Voice and Tone in UI

The UI copy should sound:

* Warm
* Calm
* Competent
* Parent-to-parent
* Trustworthy
* Clear
* Practical

Use phrases like:

```text
Delivered clean and ready
Personally confirmed
Every item checked before it reaches your family
Travel light
Welcome home
Confirmed within 24 hours
Clean, checked, and ready before you arrive
```

Avoid phrases like:

```text
Cheap
Rental listing
Awaiting confirmation
Maybe available
Unverified
Marketplace
Instant checkout
```

## Language Direction

The website should support English and French at launch.

Arabic can come later.

The design should avoid choices that make Arabic difficult later.

For now:

* Keep layouts flexible.
* Avoid text embedded in images.
* Avoid overly narrow text containers.
* Leave space for French text, which may be longer than English.
* Do not hardcode text into visual assets.
* Use components that can later support right-to-left layout if Arabic is added.

## Page-Level UI Direction

## Home Page

The homepage should feel like a calm landing page for tired parents planning travel.

Hero direction:

* Soft Sand or warm off-white background
* Clear headline
* Short reassuring subheadline
* Primary CTA
* WhatsApp secondary CTA
* Gentle brand image, product image, lifestyle image, or subtle pattern

The homepage should quickly communicate:

```text
Rent baby gear in Rabat.
It is clean and checked.
It is delivered before you arrive.
You request first, then Hababy & Co confirms personally.
```

The homepage should not feel like a generic startup landing page.

It should feel specific to families, Rabat, travel, and trust.

## Catalogue Page

The catalogue should feel practical and easy to browse.

Use:

* Clean product grid
* Category filters
* Date range filter
* Clear prices
* Availability badges
* Product images
* Simple CTAs

Do not make it feel like an e-commerce discount catalogue.

The catalogue should support trust and calm decision-making.

## Product Detail Page

The product detail page should build confidence.

It should include:

* Strong image area
* Clear product title
* Pricing and deposit block
* Rental date selector
* Estimate preview
* Included items
* Optional add-ons
* Safety notes
* Cleaning notes
* CTA to request

The design should make deposits and estimates clear without making the page feel intimidating.

## Bundles Page

Bundles should feel helpful and curated.

The UI should communicate:

```text
We understand what families need.
You do not have to figure everything out from scratch.
```

Use warm cards with clear included items.

Bundles should feel like thoughtful solutions, not random product groups.

## Welcome Kits Page

Welcome Kits should feel like arrival comfort.

They are sold, not rented.

They should feel:

* Warm
* Practical
* Gift-like but not gimmicky
* Helpful for parents arriving tired

Organic options should use the Sage badge sparingly.

## Booking Flow

The booking flow should feel like a guided request, not a payment checkout.

Use:

* Step indicator
* Friendly section titles
* Calm helper text
* Clear summary
* Visible confirmation copy
* WhatsApp handoff after submission

The booking flow should avoid payment pressure.

It should clearly say that final availability and total will be confirmed within 24 hours.

The customer should never feel that they are being charged online.

## Admin UI Direction

The admin panel should be simple and functional.

It does not need the full editorial brand treatment.

Admin should prioritize:

* Tables
* Forms
* Clear actions
* Status labels
* Easy editing
* Low confusion

Use the brand colours lightly, mainly for buttons and status indicators.

Do not overdesign the admin panel.

The admin interface is a tool for the owner, not a marketing experience.

## Accessibility and Usability

The site should be:

* Mobile-first
* Easy to read
* Easy to tap
* Clear in English and French
* High enough contrast for body text
* Not dependent on colour alone
* Understandable without technical knowledge

Important rules:

* Body text should use Charcoal.
* CTAs should have strong contrast.
* Do not use Rose Dust or Sand as text on white.
* Forms must have clear labels.
* Error messages must be understandable.
* Buttons must clearly describe the action.
* Interactive elements must be usable on mobile.

## Design Do's

Do:

* Use warm off-white backgrounds.
* Use Marrakech Red for key actions.
* Keep the design calm and premium.
* Use generous spacing.
* Use rounded cards.
* Use simple icons.
* Use trust-building copy.
* Make mobile feel excellent.
* Keep Moroccan inspiration subtle.
* Make the request-first model feel intentional and premium.
* Use the confirmed SVG logo files.
* Make the site feel personal and accountable.

## Design Don'ts

Do not:

* Make the site look like a toy shop.
* Use too many colours.
* Use busy patterns behind text.
* Overuse script typography.
* Make the booking flow look like checkout.
* Hide deposit information.
* Make availability feel uncertain.
* Make the service feel like a marketplace.
* Use “cheap” as a value proposition.
* Use generic baby clipart.
* Make the admin UI decorative or complicated.
* Invent brand assets that do not exist.
* Use unconfirmed logo files in code.

## Suggested Visual Keywords for Gemini

Use these prompts and direction words when asking Gemini for UI exploration:

```text
warm premium Moroccan-inspired baby gear rental website
soft editorial family travel service
clean mobile-first rental catalogue
parent-led trustworthy baby equipment service
Rabat baby gear delivery website
warm off-white, Marrakech red, sand, sage accents
Playfair Display headings, Nunito body
subtle Moroccan geometric pattern
clean rounded cards, calm booking flow
```

Avoid prompts that produce:

```text
cartoon baby website
luxury gold baby boutique
generic SaaS landing page
marketplace app
busy Moroccan tile background
```

## Asset Implementation Notes

The build should use the confirmed SVG logo files from:

```text
assets/brand/
```

Expected files:

```text
assets/brand/hababy-logo-primary.svg
assets/brand/hababy-logo-horizontal.svg
assets/brand/hababy-stork-mark.svg
```

Implementation guidance:

* Use the horizontal logo in the header.
* Use the primary vertical logo only where its shape works naturally.
* Use the stork mark for favicon and small brand moments.
* Do not rasterize SVGs unless necessary.
* Preserve transparency.
* Add alt text for logo images.
* Ensure logo display sizes are controlled through CSS.
* Do not distort the logo by forcing both width and height unnaturally.

## UI Acceptance Criteria

The UI direction is acceptable when:

* The site feels warm, calm, trustworthy, and parent-led.
* The site does not feel like a generic marketplace.
* The brand palette is applied correctly.
* Marrakech Red is reserved for key actions and highlights.
* Rose Dust and Sand are used only as fills, not text on white.
* Sage is used sparingly for organic cues.
* Body text is readable in Charcoal.
* Playfair Display is used for headings.
* Nunito is used for body and UI text.
* Quicker Script is used only sparingly, if at all.
* The horizontal SVG logo is used in the website header.
* The primary vertical SVG logo is used only where its shape works naturally, such as hero or brand moments.
* The stork-only SVG mark is used for favicon or small brand moments.
* The build uses only confirmed logo assets unless new assets are explicitly added.
* Mobile layouts are prioritized.
* Product cards are clear and easy to scan.
* The booking flow feels like a request, not checkout.
* WhatsApp is easy to access.
* Safety and cleanliness are visually reinforced.
* Moroccan inspiration is subtle and refined.
* English and French layouts both work.
* The admin UI is simple and functional.

## Open UI Questions

These questions do not block the next workflow step, but should be answered before final design implementation:

1. Are the three SVG logo files already placed in `assets/brand/`?
2. Is the stork-only mark suitable at favicon size, or does it need a simplified favicon export?
3. Do we need reversed white or one-colour logo versions before launch?
4. Do we need a separate badge/stamp file, or can that wait until packaging and inspection cards?
5. Do we have product photos, or will we start with manufacturer images?
6. Should the first website lean more editorial or more practical/catalogue-first?
7. Should the homepage hero use a product image, lifestyle image, pattern, or illustration?
8. Should the site feel more “premium boutique” or more “warm family service”?
9. What exact French tone should be used: formal, warm, or simple conversational?
10. Should WhatsApp appear as a floating button on all pages from launch?
11. Should the admin panel use the same full brand theme or a simpler functional theme?


