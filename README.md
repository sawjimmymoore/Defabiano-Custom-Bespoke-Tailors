# De Fabiano Bespoke Tailor, E-Commerce Demo

A working Next.js e-commerce storefront for De Fabiano Bespoke Tailor (Bangkok), built as both a
real client demo and a reusable template for other bespoke/boutique tailor shops.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

For a production build:

```bash
npm run build
npm run start
```

> **Note on fonts:** this project uses `next/font/google` (Fraunces, Inter, IBM Plex Mono), which
> fetches from fonts.googleapis.com at build time. It will build fine on your machine or on Vercel
> with normal internet access. It could not be build-verified in the sandbox this was built in,
> because that sandbox blocks outbound requests to fonts.googleapis.com, that's a sandbox network
> restriction, not a code issue. `tsc --noEmit`, `eslint`, and a full `next build` with fonts
> temporarily stubbed out all passed clean; only the live Google Fonts fetch itself was untestable
> here. Worth a real `npm run build` check on your end just to be safe, but there's no reason to
> expect it to fail.

## What's real vs. placeholder

**Real:**
- All De Fabiano content, address, FAQ, social handles, pulled from the live defabiano.com site
- Full cart -> checkout -> order-saved flow, tested end-to-end (POST -> persisted -> retrievable)
- Appointment booking and contact message forms, same real POST/persist pattern
- All 31 routes build and render correctly

**Structural placeholder (by design, clearly labeled in the UI):**
- **Product photography**, there is no real product photography yet, so product images are
  procedurally generated fabric-texture visuals (`components/PlaceholderVisual.tsx`), tinted to
  each variant's color. Every placeholder carries a small "Placeholder" badge so it stays honest in
  front of a client. Swap in real photos by replacing this component's render with an `<Image>`
  tag, the calling code (`color`, `label` props) doesn't need to change.
- **360-degree product spin** (`components/PhotoSpin360.tsx`), a real, working drag-to-rotate
  interaction, but running on the same procedural placeholder art until real turntable photography
  exists. To make this fully real: shoot ~24-36 frames per product on a turntable (a phone is
  enough), drop them in `/public/products/{slug}/`, and swap the placeholder render for an
  `<img>` tag indexed by frame number, the drag/rotation logic doesn't change.
- **Checkout payment**, the checkout flow captures the order and shows the 50/50 deposit math,
  but does not process a real payment. Production needs Omise (Thai market, PromptPay + cards)
  wired into `app/checkout/CheckoutClient.tsx`.
- **Order/appointment/message storage**, currently local JSON files in `/data`, which is why this
  proves the flow but isn't durable in a real deployment (serverless filesystems are ephemeral).
  `lib/submissions.ts` is written so swapping this for Medusa.js or Supabase only touches that one
  file, no page or component needs to change. The schema is already close to Medusa's order model.

## Reusable template notes

Every design token lives in `app/globals.css` under `@theme` (colors, fonts), reskinning this for
a different bespoke/boutique client means changing those values and swapping `content/products.json`
plus `content/site-content.json`, not rebuilding pages.

## Project structure

```
app/
  page.tsx                  Home
  shop/                     Category-filterable product grid
  product/[slug]/           Product detail - variant selector, 360 spin, add to cart
  checkout/                 Checkout + success page
  fabric-gallery/           Cloth library grid
  appointment/               Booking form -> /api/appointments
  measurements/              Measurement guide
  about/                     Bio + FAQ
  blog/                      Journal index + post detail
  contact/                   Linktree-style channels + message form
  api/orders|appointments|messages/   Route handlers -> lib/submissions.ts
components/                 Nav, Footer, ProductCard, PhotoSpin360, ParallaxSwatches,
                             PlaceholderVisual, CartDrawer, AddToCartClient, Eyebrow, StatRow
content/                    products.json, site-content.json, blog-posts.json - all real content
lib/                        types.ts, products.ts, cart-context.tsx, submissions.ts
data/                       orders.json, appointments.json, messages.json (local store)
```

## Verified before delivery

- `tsc --noEmit` - clean
- `eslint` - clean, 0 warnings
- `next build` - all 31 routes compiled successfully
- Real end-to-end test: POSTed a test order, appointment, and message to the live API routes,
  confirmed all three persisted to `/data` and were retrievable via GET

## v2, Visual system rebuild

The functional backbone from v1 is unchanged; this pass rebuilt the entire visual layer per
feedback that the first version looked static and used the wrong palette.

**Theme:** switched from charcoal/brass to a light, cool-toned palette (`app/globals.css` under
`@theme`), every component reads these tokens, so re-theming again only means editing that one
file. Display font switched from a serif (Fraunces) to Space Grotesk, a bold modern grotesk, to
match the big-type editorial energy of the reference sites.

**New animated components** (in `/components`), adapted from Originkit source the user provided, Originkit's Framer-specific runtime calls were already stubbed to plain functions in the source,
so these port cleanly to standard React:
- `KineticGridBg.tsx`, reactive cursor-attraction dot grid, used behind the hero
- `MagneticCarousel.tsx`, dock-style magnifying category browser (flagged as the favorite)
- `CoverflowGallery.tsx`, 3D coverflow lookbook, adapted from Originkit's Smooth3DSlideshow
- `LinkPreviewHover.tsx`, hover-reveal preview card on inline links (journal teasers)
- `ScrambleText.tsx`, custom-built scramble-in-place text reveal for headlines
- `MeshHoverText.tsx`, custom-built cursor-proximity text distortion (interpreted from the
  horizonx.so "Mesh Text Hover" reference, no source was provided for that one, so this is an
  original implementation of the same idea using framer-motion springs per character)

All five ported/ built components render `PlaceholderVisual` (this project's own procedural
placeholder art) instead of Originkit's or horizonx's hotlinked demo photography, real product
photography drops in the same way described earlier in this README.

**SEO added:** per-page metadata (title templates, descriptions, OpenGraph, Twitter cards) on every
route, `app/robots.ts`, and `app/sitemap.ts` covering every product, category, and blog post.

**Not yet done:** the full Coverflow Carousel and Image Flipper components from the Originkit set
were not ported in this pass, both are significantly heavier (canvas-based tile flipping, complex
motion-value drivers) and lower-impact for a first design pass than the five above. Worth a
follow-up if there's a specific section that needs them.

## v3, Real content merge + accounts

Merged everything fetchable from the live defabiano.com (12 pages fetched: home, about, service,
contact, our-store, terms, privacy, shipping-returns, how-we-work, and all 4 product category
pages) plus addressed the "how do they buy without login" question directly.

**Pricing corrected:** was using invented premium pricing (~฿14,500/suit). Real site prices from
฿6,999 (men) / ฿6,000 (women, children), corrected across `content/products.json`.

**Real content merged:**
- `app/terms`, `app/privacy`, `app/shipping-returns`, full real policy text, not placeholders
- `app/how-we-work`, the real 7-step bespoke process from the live site
- Footer, real hours (Mon–Sat 09:00–21:00, Sun 01:00–17:00, note Sunday differs), real WhatsApp
  (+66 85 112 4295), real email (sam@defabiano.com), legal page links
- Product ratings, `rating`/`reviewCount` fields added, `StarRating.tsx` component on cards and
  detail pages (inspired by the VELORA reference)

**Mock account system added** (`lib/account-context.tsx`, `app/account/`), directly answers "how
do they buy without login": guest checkout still works with no account, but sign-up/log-in now
exists too, storing accounts in the visitor's own localStorage and showing real order history
pulled from `/api/orders`, filtered by email. This is loudly documented as demo-only, not real
auth, there's no password hashing, no server, no session security. Production needs a real auth
provider (Medusa's customer module, or NextAuth + Supabase) before this touches real customers.

**Could not fetch:** every image on defabiano.com is lazy-loaded and returned empty in a text
fetch, zero real photo URLs came through. The `/blogs` page also returned with no visible post
content (either not yet published or rendered by JS not captured in fetch). Both still need to
come from the user directly.

## v4, Design references applied (VELORA / VECTOR / TERRAIN)

- **Bolder split hero** (VECTOR pattern), big uppercase type on the left, a full-bleed visual panel
  on the right with a floating price tag, instead of the centered/smaller v2 hero.
- **New Arrival badges** (VELORA pattern), `isNew` flag added to `content/products.json`
  (currently derived from lowest review count as a proxy for "newest"; swap for a real added-date
  field when there is one), rendered on `ProductCard` alongside the existing Bestseller badge.
- **Stacked-deck lookbook** (`StackedDeck.tsx`, TERRAIN's "The Collection" pattern), replaces the
  home page's coverflow with an overlapping fanned-card browser; front card shows price, rating,
  and a direct link to the product.
- **Dark mission/stats band** (`MissionStatsBand.tsx`, TERRAIN's scorecard pattern), a high-contrast
  section on the home page pulling real process stats (7 steps, 50% deposit, etc.) tied to
  `/how-we-work`.

## v5, Real content + images from user-provided scrape, wishlist, more motion

User provided a full scrape package (defabiano-fabric-gallery.zip: 11 site pages as Markdown +
a fabric gallery spreadsheet with ~500 real hotlinked photo URLs). This fixed the "empty bottle,
no images" problem directly.

**Real images wired in (hotlinked from img1.wsimg.com, the original site's CDN):**
- Fabric Gallery, completely rebuilt on 11 real shirting-fabric categories (100% Cotton Basic
  Weave, Nano Water Repel, Panama Care, Easy Care, Scarlet Easy Care, Non-Iron, Easy Iron, Dobby
  Self Design, Basket Pinpoint, Twill 90-Shades, Wash & Wear Checks/Stripes), ~10 real photos each
- Home page, real Getty lifestyle photos for Men/Women/Children category cards, real hero photo
- About and Our Store pages, real showroom photo

**New real pages added:** `/service` (5 real services: Bespoke Tailoring, Alterations, Branding,
Shuttle, Home/Personal Service, plus 7 real FAQ) and `/our-store` (real hero image, "Why Visit",
BTS/car directions, real per-day hours table, Sunday genuinely differs: 01:00–17:00 vs
09:00–21:00 the rest of the week).

**Contact page merged with real copy**, actual hero headline/eyebrow, the real WhatsApp
specialist CTA ("usually responds within minutes"), and the real "Send Your Own Measurements"
Google Form link.

**New "Saved Items" (wishlist) feature**, `lib/saved-items-context.tsx`, heart-toggle on every
product card and detail page, visible from `/account` (works for guests too, not just logged-in
users, logged-in just means it survives longer / shows alongside order history).

**More motion coverage**, `Reveal.tsx`, a scroll-triggered fade/slide wrapper, applied across
Service, Our Store, and Fabric Gallery section headers so text and boxes animate in rather than
appearing static.

**Fabric Gallery gained real scroll, not just arrows**, `ScrollGallery.tsx` supports native
touch/trackpad/drag scroll with snap points, plus hover arrow buttons, per the "not just arrow but
also scroll function" request.

**Color personality pass**, added a secondary warm "clay" accent token (`--color-clay`, used
sparingly) and a very subtle dot-grid texture on the page background, so the palette has more
depth than flat blue-on-white without reverting to the rejected black/orange look.

**Verified:** `tsc` clean, `eslint` clean, production build compiles all 40 routes, dev-server
confirmed 206 real image references rendering on the fabric gallery page and 10 on the homepage,
and a fresh end-to-end order + appointment POST test passed.

**Still not done, flagged honestly:** the deeper 3D/WebGL treatment (literal 3D product showcase
beyond the existing 360°-spin and tilt-hover patterns), and full HorizonX-style cinematic effects, both remain a follow-up, not because they were forgotten but because they're the highest-effort,
lowest-certainty items relative to what shipped this pass (real content was the more urgent fix).

## v6, Real AI-generated product photography, catalog rebuilt

User supplied 23 real, professional-quality AI-generated product photos (studio shots on white/off-
white backgrounds, matching real e-commerce catalog style). These replaced procedural placeholder
art across the site, optimized from 36MB of PNGs down to 1.9MB of JPEGs (resized to a sensible
max height, quality 82) before committing to `/public/products/`.

**Catalog rebuilt from 12 fictional SKUs to 14 real-photo-backed products:**
- Signature Two-Piece Suit, now 7 real color variants (Navy, Charcoal, Grey, Black, Brown,
  Burgundy, Forest Green), each with its own real photo
- New: Double-Breasted Suit, Wool Overcoat (Black/Camel), Women's Tailored Suit (Navy/Black,
  replacing the old separate blazer+trousers), Black Evening Gown, Boys' Formal Suit (Navy/Grey),
  Girls' Formal Dress, Silk Bow Tie
- `lib/types.ts`, `ProductVariant` gained an optional `image` field; falls back to the procedural
  placeholder for anything not yet photographed (currently just Pocket Square, flagged in its own
  data as pending)

**Real photos now flow through the entire shopping experience**, not just product pages:
- `ProductCard.tsx`, real photo when available
- `ProductImageDisplay.tsx` (new), replaces the fake 360°-spin placeholder with a real photo +
  mouse-driven 3D tilt effect (CSS `preserve-3d`, not WebGL) for anything that has real photography.
  Products without a photo still get the honest placeholder spin.
- Cart drawer, checkout line items, StackedDeck lookbook, home page category tiles, and the hero, all now show real product photography

**Verified:** `tsc` clean, `eslint` clean, production build compiles 42 routes (14 products x
static generation), dev-server confirmed real photos serve at 200 and render across home/shop/cart,
fresh end-to-end order test passed with a real photo attached to the cart line.

## v7, Cinematic full-viewport hero (Originkit / motionsites.ai inspired)

**Originkit CLI note:** `npx originkit@latest add hero-03 --prompt` was attempted with the
provided API key. The CLI installed and authenticated fine, but the actual component fetch was
blocked: `x-deny-reason: host_not_allowed`, this sandbox's network egress allowlist doesn't
include originkit.dev. Confirmed via a direct `curl` to the same host, same error. This is a
sandbox network setting, not a bad key, add `originkit.dev` to network egress settings to use
the CLI directly in a future session.

**Built the same effect by hand instead**, drawing techniques from the three reference builds
provided (museum hero, liquid-glass agency site, TOONHUB carousel):
- `HeroSection.tsx` (new, extracted to its own client component, `framer-motion` can't run in a
  server component, which is why this needed to split out from `page.tsx`), full `h-screen`
  hero, real photography (Double-Breasted Suit) full-bleed background with layered gradient
  overlay instead of the previous split-panel layout
- `BlurText.tsx` (new), word-by-word blur-in reveal, adapted from the liquid-glass reference's
  text animation pattern
- **Liquid glass UI** (`.liquid-glass` / `.liquid-glass-strong` in `globals.css`), translucent,
  blurred, gradient-stroke-bordered panels, adapted from the reference CSS almost directly (same
  masking technique) but only used on this one dark hero section, the rest of the site stays on
  the light theme, so this doesn't fight the established brand
- Glass stat cards at the bottom of the hero pull real numbers (20+ years, 5.0 rating, 4-6 day
  turnaround, ฿6,999 starting price) instead of generic placeholder stats

**Verified:** `tsc` clean, `eslint` clean, all 42 routes build (homepage still prerenders as fully
static despite the hero needing client-side motion), dev-server confirmed the hero renders with
the liquid-glass elements present and all core routes still return 200.

## v8, Scroll-scrubbed video hero + site-wide 3D background

Implemented exactly to the provided prompt spec.

**`ScrollScrubVideo.tsx`**, the video never autoplays. Playback time is mapped directly to scroll
position: `useScroll` tracks progress through a tall (280vh/260vh) container, `useSpring` smooths
that progress slightly, and a `useMotionValueEvent` listener sets `video.currentTime` directly
(skipping redundant seeks under a 0.03s threshold to reduce stutter). Also carries a subtle
scroll-linked 3D tilt (`rotateX` + `scale` via `useTransform`).

**Canvas frame-extraction was intentionally skipped**, it's real, and would produce smoother
scrubbing than direct video seeking on some browsers, but it's meaningfully more complex (extract
frames to canvas, draw per scroll tick) for a marginal gain over the spring-smoothed direct-seek
approach already implemented. Flagging as a genuine "if you want it, it's a real next step," not
glossing over the tradeoff.

**Two videos wired in, one per section as requested:**
- `HeroSection.tsx`, hero-scrub.mp4 as the scroll-driven background, frosted glass nav badge,
  headline, CTAs, and stat cards layered on top, staggered entrance via `whileInView`
  (IntersectionObserver under the hood)
- `SuitDetailsScrollSection.tsx` (new), details-scrub.mp4 as its own scroll-scrub section further
  down the home page, three frosted-glass craftsmanship cards (canvas construction, hand-stitched
  lapel roll, working cuff buttons) staggering in as you scroll through it

**`GlobalBackground3D.tsx`**, site-wide, mounted once in the root layout so it's present on
*every* page, not just the hero (per "not just the hero section but all pages"). Four large,
blurred, low-opacity gradient orbs drifting slowly with a gentle scroll-linked parallax
(`useTransform` on `scrollY`), tuned low-opacity enough not to fight the light theme's readability
on every other page.

**Verified:** `tsc` clean, `eslint` clean, production build compiles all 42 routes, dev-server
confirmed both videos serve at 200 and are present in the rendered home page HTML, and a fresh
end-to-end order POST test still passed with the new hero/background in place.

## v9, Fixed video blur, split-panel layout, real 3D background, bolder typography

Four direct fixes against feedback on v8.

**1. Video blur, root cause found and fixed.** The uploaded videos are 720x1280 (portrait,
9:16), they were being force-stretched into a full-width landscape hero, which is what caused
the blur, not a compression issue. Re-encoded both with ffmpeg (`-g 1 -keyint_min 1`, all-keyframe
streams, CRF 20) so every scrubbed frame decodes crisp instead of from an interpolated
inter-frame, but the bigger fix was giving them a container that matches their native aspect
ratio instead of stretching them.

**2. Full-bleed video replaced with a contained side panel.** `HeroSection.tsx` rewritten:
video now sits in a `3:4` rounded panel on one side (`SplitScrollVideo.tsx`, new, reusable),
text content beside it, matching "left or right side only with dedicated section," not full
viewport. The hero also moved back to the site's light theme (was dark/cinematic) to match the
editorial reference decks provided. `SuitDetailsScrollSection.tsx` uses the same component with
the video on the opposite side, alternating like the reference decks do slide to slide.

**3. Site-wide 3D background was actually invisible, real bug, now fixed.** `body`'s solid
background color was being propagated to the browser's canvas layer, which paints beneath
*everything* regardless of z-index, so the ambient 3D shapes in `GlobalBackground3D.tsx` were
rendering, just permanently hidden behind that canvas paint. Fixed by removing the color from
`body` and moving it to `GlobalBackground3D`'s own fixed layer instead, so it's a real DOM layer
content can render above or occlude, not an inescapable browser-level paint. Also increased shape
opacity/count and made the home page's two full-width section bands translucent + backdrop-blur
so the shapes visibly show through them, not just the plain-background sections.

**4. Typography bolder, closer to the reference decks**, hero headline moved to
`font-extrabold uppercase`, stacked short line breaks (`Cut to / You. / Not Off / The Rack.`)
instead of two long lines; section headings across the home page bumped from `font-bold text-2xl`
to `font-extrabold tracking-tight text-3xl`.

**Verified:** `tsc` clean, `eslint` clean, all 42 routes build, dev-server confirmed the split
layout renders (not full-bleed), both re-encoded videos serve at 200, and a fresh end-to-end
order test passed.

## v10 - Real calendar booking, automated FAQ chat, em dash cleanup

**Booking rebuilt as an actual calendar, not raw date/time inputs.** `AppointmentCalendar.tsx`
(new) is a Calendly-style month grid: navigate months, pick a day (past days disabled), then pick
from real time slots generated from the site's actual hours (Mon-Sat 09:00-21:00, Sun 01:00-17:00,
45-minute slots). Slot availability is live, not decorative: it fetches `/api/appointments` and
disables any slot already booked that day, so two visitors can't be shown the same open time.
`AppointmentClient.tsx` is now a two-step flow (date/time, then contact details) with a visible
step indicator, replacing the old single flat form with native `<input type="date">` /
`type="time">`.

**Automated chat widget added** (`ChatWidget.tsx`, new, mounted site-wide in `app/layout.tsx`) -
a floating launcher bottom-right opens a real chat-style panel. This is explicitly not an AI
chatbot: every answer is one of the site's real, already-published FAQ entries
(`content/site-content.json`), presented as tappable question buttons, no free-text input and no
model call, so there's nothing to hallucinate. Asked questions clear from the button list as you
go; "Book a fitting" and "Talk to a person on WhatsApp" (using the real WhatsApp number and
message) are always available as an escalation path.

**Em dash sweep.** Every em dash across the codebase (copy in `content/*.json`, on-page strings,
error messages, and code comments) was found and replaced, rewritten into plain sentences with
periods or commas rather than just swapped in place, so nothing reads as a comma splice.
Site-facing copy in `about`, `privacy`, `account`, and the three blog posts was hand-checked
after the pass to confirm it still reads naturally.

**Verified:** `tsc --noEmit` clean, `eslint` clean (0 errors after fixing one
`react-hooks/set-state-in-effect` flag in the new calendar component). `next build` hits the same
pre-existing sandbox restriction noted in v1 (this sandbox's network egress blocks
fonts.googleapis.com) - not something introduced this pass; unaffected on a real machine or Vercel.

## v11 - Fixed the invisible-content bug (root cause found)

The reported "text isn't loading" was a real, sitewide CSS stacking bug, not a data or copy
problem. `GlobalBackground3D.tsx` (introduced in v8) renders a `position: fixed; inset: 0` layer
with a solid `bg-paper` fill, mounted once at the very top of `app/layout.tsx`. It never had an
explicit `z-index`. Per the CSS stacking spec, a positioned element with `z-index: auto` paints
*after* (on top of) plain, non-positioned in-flow content, even though it's earlier in the DOM.
That's why the pattern in the screenshots was so specific: the sticky nav (`z-40`) and the hero's
photo panel (which happens to use `relative` for other reasons) stayed visible because they're
positioned elements with their own stacking, while ordinary text blocks, like the entire hero
headline column, and the entire Contact page, which is nothing but plain `<div>`s, were painted
underneath the opaque background layer and effectively disappeared. It looked worse on some pages
than others purely by accident of which elements happened to carry `relative`/`sticky`.

**Fix:** added `-z-10` to `GlobalBackground3D`'s container, so it now paints at the very back
as intended for an ambient background, instead of ambiguously among normal content. Audited every
other `fixed`/`sticky` layer in the project (`CartDrawer`, `ChatWidget`, `Nav`,
`ScrollScrubVideo`) and confirmed they all already carry explicit z-index values and don't have
this problem.

**On the "fetch the real logo" note:** re-checked the live defabiano.com. It doesn't have a
distinct logo graphic anywhere on the page. GoDaddy Website Builder-based, and the brand mark is
just the wordmark "Defabiano" in the nav, no separate image file. That's why the build uses a
styled text wordmark rather than a logo image, there's no real logo asset to pull in. Happy to
design an actual logo mark if that's wanted, but flagging this instead of inventing one that
doesn't exist on the real site.

**Verified:** `tsc --noEmit` clean, `eslint` clean.
