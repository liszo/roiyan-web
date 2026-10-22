# 22 · DESIGN.md — Brand, UX & UI Rules

> **Purpose:** the design system and UX rules for roiyan.com and every Roiyan visual (social, PDFs, decks, client reports).
> **Read when:** designing or coding any page/component, writing UI copy, producing social or PDF assets, briefing a designer or AI video tool.
> **Status:** rules approved Oct 5 2026; brand basics fixed by D-077 (Vazirmatn, #0F5C5A, #E8962E); derived tokens in §3 are [Draft]; rich media allowed under a performance budget (D-086).
> **Updated:** 2026-10-14 (22 Mehr 1405) — tokens filled from D-077; §5 rule 2 replaced (D-086); §11 motion, 3D & video added

## 1 · Brand foundation

| Item | Rule |
|---|---|
| Name | رویان / Roiyan. Wordmark in Persian and Latin + simple mark for favicon/avatars |
| Positioning line | Diagnose first, fix the biggest leak, pay for results where measurable |
| Promise (draft) | "Pay fully only when results arrive" — risk-reduction, not hype |
| Personality | Plain, direct, expert, honest, calm. A diagnostician, not a salesman |
| Brand discipline | Ship and earn: clean name + simple mark + 2 colors is enough until first results |

## 2 · Voice & copy rules (Persian first)

- **Numbers over adjectives.** «۳۲ نوبت جدید در ماه» beats «افزایش چشمگیر».
- **No superlatives:** never «بهترین»، «شماره یک»، «تضمینی ۱۰۰٪».
- **No guaranteed returns** (also an SMS-law requirement) — guarantees are only the three in file 11 §8.
- **Proof beside every claim:** a number, a client name (or industry if anonymized), a screenshot.
- Address the reader as **شما**, friendly-professional; avoid heavy formal Arabic-origin phrasing and English jargon. Use "سرنخ" not "لید" in public copy where natural.
- Talk problems and outcomes, not services: "مشتری‌ها برنمی‌گردند" not "باشگاه مشتریان".
- Organizations: more formal tone, "سازمان شما", maturity language. Small businesses: warmer, "کسب‌وکار شما". Starters: encouraging, "راه‌اندازی".
- Every price shows what is included and «معتبر تا پایان [ماه]».
- No fake urgency (countdowns, "only 2 spots left") unless literally true.

## 3 · Visual tokens

Base colours and font are **fixed by D-077** (confirmed 2026-10-14). The other values are derived from them by Claude and contrast-checked **[Draft — adjust freely, the two base colours stay]**.

| Token | Value | Rule |
|---|---|---|
| `--color-brand` | **#0F5C5A** (fixed) | Brand colour: logo, headings accents, links, selected states, brand surfaces. White text on it = 7.8:1 ✓ |
| `--color-brand-dark` | #0B4846 | Hover/pressed brand, dark brand sections. White text 10.4:1 ✓ |
| `--color-brand-tint` | #E7F1F0 | Light brand backgrounds (selected option cards, info boxes). Brand text on it 6.8:1 ✓ |
| `--color-action` | **#E8962E** (fixed) | **Action buttons only** (the one primary call to action per screen). Text on it is `--color-ink` (6.5:1 ✓) — **never white** (2.4:1 ✗) |
| `--color-action-dark` | #D2801F | Hover/pressed action button. Ink text 5.1:1 ✓ |
| `--color-ink` | #1B2626 | Body text (dark teal-grey, not pure black). 15.5:1 on white ✓ |
| `--color-muted` | #5A6B6A | Secondary text, captions. 5.6:1 on white ✓ |
| `--color-border` | #D9E2E1 | Borders, dividers (decorative, not text) |
| `--color-surface` / `--color-bg` | #FFFFFF / #F6F8F7 | Cards / page background |
| `--color-night` | #0B1F1E | Dark backgrounds behind 3D or video heroes. White text ✓; action colour on it 7.2:1 ✓ |
| `--color-success` / `--color-warning` / `--color-danger` | #1E7A46 / #A15C07 / #B42318 | Status only (score bands, alerts). All ≥ 5:1 on white ✓ |
| Font | **Vazirmatn** (fixed), variable weights 100–900, self-hosted | The only typeface, for Persian and Latin (Vazirmatn ships Latin glyphs). No IRANYekan, Inter or second font |
| Weights | 400 body · 500 UI labels · 700 headings · 800–900 hero numbers only | Fewer weights = smaller download |
| Radius | 12 px cards · **full pill for buttons, chips and toggles** · 10 px inputs | Pills are part of the look (D-095) |
| Easing | `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` · `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` · `--ease-press: cubic-bezier(0.34, 1.56, 0.64, 1)` | One set of curves keeps all motion feeling like one family |
| Spacing scale | 4-px base (4, 8, 12, 16, 24, 32, 48, 64, 96) | |
| Max content width | ~1200 px; reading width ~70 characters | |

Contrast: WCAG AA minimum (4.5:1 body, 3:1 large text). Dark mode: optional, later (`--color-night` is the start of it).

## 4 · RTL & Persian typography rules

- `dir="rtl"` and `lang="fa"` on `<html>`; use logical CSS properties (`margin-inline-start`, `padding-inline-end`) not left/right.
- **Persian digits** everywhere in UI (`lib/farsiNumerals.ts`); Latin digits only in code, URLs, phone input fields where the keyboard requires.
- **Jalali dates** in UI (e.g. ۲۷ مهر ۱۴۰۵); ISO in data.
- Money: «۱۵٬۰۰۰٬۰۰۰ تومان» or «۱۵ میلیون تومان»; thousands separator «٬»; always say تومان (never ریال in UI).
- Use the zero-width non-joiner (نیم‌فاصله, U+200C) correctly: «می‌شود»، «کسب‌وکار»، «سرنخ‌ها».
- Persian punctuation: «» quotes, ، comma, ؛ semicolon, ؟ question mark.
- Icons with direction (arrows, chevrons, progress) are mirrored in RTL; brand logos and media controls are not.
- Mixed text (Persian + English/numbers): wrap Latin runs in `<bdi>` or `dir="ltr"` spans to avoid reordering bugs; phone numbers displayed LTR.
- Line height 1.8–2.0 for Persian body text; avoid letter-spacing on Persian.

## 5 · UX rules (approved)

1. **Mobile first** — most cold traffic arrives from Instagram and SMS on phones.
2. **Performance budget, not a size cap (D-086):** 3D scenes, GSAP scroll scenes and video backgrounds are allowed on public pages. A static poster paints first; LCP < 2.5 s on 4G; Core Web Vitals green on mobile; reduced-motion and slow-device fallbacks; lighter mobile version. Full rule: `CLAUDE.md` rule 7 and §11 below.
3. **One primary action per screen**; the wizard button stays visible on scroll (sticky bottom bar on mobile).
4. Persian digits, Jalali dates, toman everywhere.
5. Prices always shown with inclusions and "valid until".
6. Proof beside every claim.
7. Accessible contrast and **tap targets ≥ 44 px**.
8. Forms: one question per screen in the wizard; numeric keypad for phone/OTP (`inputmode="numeric"`); OTP auto-fill (`autocomplete="one-time-code"`).
9. Never block content behind the phone gate except the final results.

## 6 · Page patterns

**Home (top → bottom):** risk-promise headline → two buttons for the two main buyers (small business / organization) → three proof numbers from real projects → how it works in 3 steps (diagnose, plan, results) → six pillars framed as problems → case studies → pay-for-results explainer → FAQ → closing CTA.

**Landing / service / industry pages** (reuse `LandingPageTemplate`): problem headline → who it's for → what changes (outcomes) → how it works → price "from" + inclusions → proof → FAQ → CTA "start free diagnosis" pre-filled with the goal/industry.

## 7 · Core components

| Component | Spec |
|---|---|
| Wizard shell | Progress bar (step x of 9), back button, one question, large tappable options, sticky "next" |
| Option card | Icon + label (+ optional hint); selected state uses brand colour (`--color-brand-tint` + brand border), not the action colour; multi-select shows count limit ("تا ۲ مورد") |
| Insight card | Shown mid-wizard; one sentence; neutral background; no CTA |
| Phone gate | Name, mobile, OTP; blurred score preview behind; privacy note link; resend timer |
| Score card | Big number (health 62/100 · maturity 3 of 5 · readiness), six pillar bars, weakest pillar highlighted |
| Plan block | Four blocks: One-time · Monthly · Pay for results · Your costs; each item: name, one-line outcome, price, toggle |
| Locked complement | Lock icon + reason tooltip ("لازم برای سیستم نوبت‌دهی") |
| Totals bar | "To start" and "Typical month after", sticky on mobile |
| Exit buttons | Pay deposit (action colour, dark text) · Book a call · Download PDF · (Sprint 2) Invite decision maker |
| Price tag | Firm price, "from" price, or range ±20%; always with «معتبر تا پایان …» |
| Case card | Industry, before → after numbers, services used, proof image |

## 8 · Imagery & media

- Real screenshots, real dashboards, real (permissioned) client photos. No stock "handshake" photos, no fake metrics.
- AI video/visuals (VB7/VB8, Roiyan's own social) follow the same palette and type; Persian on-screen text set with the brand font.
- Illustrations: simple, flat, limited palette; optional.

## 9 · PDFs & documents

Plan PDF (print stylesheet): logo, client name, date (Jalali), score, plan blocks, totals, validity, terms summary, contact. A4, RTL, brand font embedded, page numbers. Monthly client report: one page — 3 key numbers vs baseline, what we did, what we learned, next month.

## 10 · Social profile basics (Instagram first)

Display name «رویان | تشخیص و رشد کسب‌وکار» (draft) · bio: what we fix + how (diagnose → plan → results) + CTA to free diagnosis link · highlights: درباره ما / روش کار / نمونه کار / سؤالات · content pillars: educational, proof, behind-the-scenes, "leak teardown" of a generic business type. Details → `31_LEAD_GENERATION_AND_OUTREACH.md`.

## 11 · Motion, 3D & video (D-086)

Rich media is allowed to make the site memorable — but it must **explain something**, not decorate. [Draft art direction for review]

| Rule | Detail |
|---|---|
| Meaning first | Motion tells Roiyan's story: **scan → find the leak → fix → measured result**. Examples: a 3D "diagnostic scan" sweeping a business model in the hero; a leaking funnel that seals as you scroll; numbers that count up only when they are real |
| One heavy scene per page | At most one Three.js scene or one video background per page; everything else is light CSS/Motion |
| Palette | Only brand tokens: teal family for scenes, `--color-night` behind them. The action colour marks the **one primary action**: it may glow or carry light on that button (§13), never on decoration elsewhere |
| Poster first | Every 3D scene and video has a static poster (WebP/AVIF) that looks finished on its own |
| Reduced motion | `prefers-reduced-motion` → poster + simple fades. Respect it everywhere |
| Mobile | Lighter scene (lower pixel ratio, fewer objects) or the poster/short video only; pause when off-screen |
| Readability | Text over video/3D sits on a solid or 80%+ overlay; contrast rules still apply |
| Video | Muted, looped, `playsInline`, no sound, 8–15 s loop, compressed MP4 (+ WebM), served from Liara object storage |
| Scroll | GSAP ScrollTrigger (optionally with Lenis) for story sections; never hijack scrolling inside the wizard or plan page |
| Conversion screens | Wizard, phone gate, plan page: subtle Motion transitions only; nothing that delays a tap |
| Honesty | Animated numbers are real numbers or clearly labelled examples; no fake live counters |
| Licences | Only our own models/footage or free-for-commercial assets with the licence saved; no Shadertoy code (non-commercial licence by default) |

## 13 · Expressive effects: glass, glow, gradients, light (D-095)

Glass, glow, gradients, animated borders, liquid fills and particle bursts are **allowed and wanted**. They look "AI-made" only in their default form: purple and blue, black backgrounds, the same effect on every element, endless loops with no meaning, grey glass with nothing behind it. Roiyan uses them with **our palette, our story and a budget**, so they look like ours.

### 13.1 Our version of each effect

| Effect | Roiyan version (what makes it ours) | Fits best | Conditions |
|---|---|---|---|
| **Glass** (frosted surface) | Teal-tinted: brand at 8–16 % over `blur(12–20px) saturate(140%)`, 1 px hairline border (white 20–30 %), 1 px inner top highlight. Something real is always behind it | Navbar after scroll; phone gate over the blurred score preview; secondary button on night sections; sticky totals bar over the plan; text panels over 3D/video | Text contrast AA measured on the busiest part of the background; solid fallback when `backdrop-filter` is unsupported, `prefers-reduced-transparency` is set, or the device is low-end; max 2 blurred elements per viewport |
| **Glow / light** | Light comes from one source and means "live / scanning / here". Action-colour glow only on the one primary action; brand-teal glow on the "leak" point (for example the weakest pillar) | Primary CTA on night sections; the weakest pillar on the results screen; the hero scan | On light pages: plays once on enter and on hover/focus/press (≤ 1.2 s), no idle loop. On night sections: slow loop allowed (≥ 4 s cycle with rest) on the one primary CTA only |
| **Gradients** | Only from tokens: night → brand, brand → brand-dark (same-hue depth), brand → brand-tint, action → action-dark, and a night "aurora" of teal with a little action warmth | Night sections (hero, CTA band, pay-for-results explainer); subtle same-hue depth on button fills; progress fills | Never purple, blue, pink or rainbow; never behind body text; animated gradients are slow (≥ 8 s) or scroll-linked |
| **Spinning / conic border** | Means "scanning in progress" | Loading states only, while something real is waiting: building the plan, sending the OTP, submitting a form | Stops the moment the wait ends; never idle |
| **Liquid / fluid fill** | Fill rises or morphs from the start side with a soft curved edge, in surface or brand-tint | Ghost/outline buttons on night sections; option-card selection | ≤ 500 ms; must work on press as well as hover |
| **Particles / burst / confetti** | Small dots and rings in brand + action colours, no emoji | Earned moments only: OTP verified, plan ready, booking confirmed | Once, ≤ 900 ms, 8–16 particles; never on page load or on ordinary clicks |
| **Depth** (tactile base, layered shadows) | Shadows tinted with brand-dark/ink at low opacity, never pure black; buttons sink on press | All buttons, option cards, toggles | Press feedback must be visible on a phone (≥ 120 ms) |

### 13.2 Budget and composition

1. **One signature effect per screen-height.** Signature effects are glass, glow, animated gradient, conic border, liquid fill and burst. Quiet effects (hover lift, press sink, arrow slide, fades) are unlimited.
2. **Light pages get quiet versions; night sections are the stage** for the full versions.
3. **Every effect has a job:** point to the action, show waiting, confirm success, show layers, or tell the story scan → leak → fix → result. If you can't name its job, remove it.
4. **Still-frame test:** with motion off, the screen still looks finished.
5. **Make it ours:** Vazirmatn, real Persian text, RTL. Light sweeps travel right → left (reading direction), arrows point ← and sit at the end. Colours always from tokens, never library defaults.
6. **Conversion screens** (wizard, phone gate, plan page): effects only respond to the user (select, press, wait, success). No ambient loops, and nothing delays a tap.
7. **Technique and access:** animate only transform, opacity and filter; CSS first, Motion only when CSS can't do it; no canvas/WebGL inside components; `prefers-reduced-motion` → final static state; contrast AA at every animation frame; nothing flashes more than 3 times per second.
