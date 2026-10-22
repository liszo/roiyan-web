# 24 · Design Process Guide — how to design and build every roiyan.com page

> **Purpose:** the step-by-step design process for roiyan.com, from "empty project" to "page ready to launch": what to design first, what to research and exactly what to look for, how to turn references into a direction, how to build components and pages with Claude Code and the installed skills, and how to check each page.
> **Read when:** you have finished the setup guide (`23_FRONTEND_SETUP_GUIDE.md`, phases A–F) and want to start designing; before each new page or section; when a page "looks generic" and you don't know why.
> **Status:** [Draft v1.3] by Claude for Ramin. Rules come from `22_DESIGN.md` (DESIGN.md in the repo), the wizard spec `20_WEBSITE_WIZARD_SPEC.md` and the routes in `21_TECH_ARCHITECTURE.md` §4. Dates follow Sprint 1 in `41_ROADMAP_AND_PLANS.md` (launch Thu Oct 29 · 7 Aban, D-094). · **Updated:** 2026-10-17 (25 Mehr 1405) — Step 3 now covers every wizard screen and the plan page (§3.0–§3.3); §4.2 capture script · **2026-10-22 (30 Mehr 1405)** — §4.2 "Avoid" list narrowed to the *generic versions* of effects (glass, glow, gradients now allowed under DESIGN.md §13, D-095); §5.2 rewritten: you drop raw references, Claude Code writes the taste read and infers motion, then builds a lab with candidates

## How the two guides fit together

| Guide | Answers | You use it |
|---|---|---|
| `23_FRONTEND_SETUP_GUIDE.md` | "How do I install, run, save and deploy?" | Once at the start, then as a reference (Phases H, I, J, troubleshooting) |
| **This guide (24)** | "What do I design, in what order, how do I judge it?" | Every day from now until launch, and for every new page after |

Phase G of guide 23 (collect references) is expanded here in Steps 4 and 6.

## The design loop in one picture

```
1 Pages & priorities ─► 2 Words first ─► 3 Grey boxes (wireframe) ─► 4 Visual direction (once)
        ─► 5 Component kit (once) ─► 6 Build page by page ─► 7 Motion & hero ─► 8 Check & polish ─► deploy
```

- Steps 1, 4 and 5 happen **once** (they set the foundation).
- Steps 2, 3, 6 and 8 repeat **for every page**.
- Step 7 comes **last**, when the static page already works — motion decorates a working page, it never rescues a weak one.

**Who does what:** you decide (what to show, which direction, yes/no on each result); Claude Code builds (code); the skills check quality — `impeccable` (design polish), `vibe-to-ui` (directions), `lahne-man` (Persian copy), `design:design-critique` and `design:accessibility-review` (reviews).

---

## Step 1 · Pages and priorities (do once — 30 min)

Build in the order a visitor **pays you**: the money path first, decoration last.

| # | Page / screen | Route | Priority for Oct 29 | Why this order |
|---|---|---|---|---|
| 1 | Component kit (internal) | `/kit` (not indexed, removed or hidden before launch) | Must | Every page reuses it |
| 2 | **Wizard** (9 screens + insight card + phone gate) | `/tashkhis` | Must | The product. Every channel ends here |
| 3 | **Results + plan page** | `/plan/[code]` | Must | Where the decision and the money happen |
| 4 | Booking | `/rezerv` | Must | The main exit until e-Namad arrives (D-081) |
| 5 | **Home** | `/` | Must | First impression; sends people to the wizard |
| 6 | Small-business / organization landings | `/kasb-o-kar`, `/sazman` | Must | Ads and SMS land here |
| 7 | Pay-for-results explainer | `/natije-mehvar` | Must | The thing that makes Roiyan different |
| 8 | Legal + about + contact | `/qavanin`, `/harim`, `/bazgasht`, `/darbare`, `/tamas` | Must | e-Namad, Zarinpal and trust |
| 9 | Pillar + service template | `/khadamat/[pillar]`, `/khadamat/[pillar]/[service]` | Should | One template, many pages |
| 10 | Industry template | `/sanat/[industry]` | Should (cut first if late, D-094) | One template, 13 pages |
| 11 | Founders' panel | `/panel` | Must (plain, functional) | Ugly is fine; it must be clear |
| 12 | Cases | `/nemoone-kar` | **Later** — no real cases yet | Honesty rule: no fake cases |
| 13 | Freelancer / starter landings | `/freelancer`, `/shoroo` | Sprint 2 | Wizard screen 1 covers them at launch |

**Rule:** don't start page N+1 until page N works on your phone. A finished wizard beats five half-designed pages.

---

## Step 2 · Words first (every page — before any design)

Design is the shape of the words. If the words are unknown, the design will be generic.

0. **Once:** give Claude Code the specs it needs. In the repo create a folder `docs/` and copy into it, from the Claude project, `20_WEBSITE_WIZARD_SPEC.md`, `10_SERVICE_CATALOG.md`, `11_PRICING_AND_OUTCOME_MODEL.md` and **this guide** `24_DESIGN_PROCESS_GUIDE.md` (same names, underscores not spaces). Prompts that say "guide 24 step …" need the guide in `docs/`. Claude Code can only use what is in the repo. When those project files change, copy them again.
1. Open the page pattern in `DESIGN.md` §6 (home and landing pages) or the screen list in `20_WEBSITE_WIZARD_SPEC.md` §3 (wizard).
2. Make a **copy deck**: a simple file `content/<page>.md` with one heading per section and the real Persian text under it (headline, one sentence, button label). Short is better.
3. 🤖 Ask Claude Code to draft, then clean it with lahne-man:

```text
Read DESIGN.md §1, §2 and §6 and CLAUDE.md. Draft the Persian copy deck for the HOME page as content/home.md:
one heading per section in the order of DESIGN.md §6, real Persian text (headline ≤ 10 words, one supporting sentence, button label),
«شما» voice, no superlatives, no guaranteed results, no invented numbers. Where a fact is missing, write [TODO: …] instead of inventing.
Then run the lahne-man skill over the deck and list what it changed.
```

For the **wizard**, use this prompt instead (the questions already exist in the spec — the job is natural Persian wording):

```text
Read docs/20_WEBSITE_WIZARD_SPEC.md §1–§4 and §6–§7, DESIGN.md §2 and CLAUDE.md. Write content/wizard.md: the Persian copy for every wizard screen 1–9,
the insight card, the phone gate and the results screen. Per screen: question (short, «شما» voice), each answer option (≤ 5 words, optional one-line hint),
helper text if needed, and button labels. Write separate wording per track where the spec differs: small-business track (G1, G3, G4) and organization track (G2),
and the role variants from §4 (role changes wording, never the options' meaning or price). Keep the exact option sets, limits («تا ۲ مورد», «تا ۳ مورد») and budget bands
from §3 — write the bands with Persian digits and «میلیون تومان». Phone gate: say why we need the number and link to the privacy page. Results: labels for health score, maturity level, readiness score.
No invented numbers or promises. Mark anything unclear as [TODO]. Then run the lahne-man skill over the file and list what it changed.
```

4. **You** read it aloud. Anything you wouldn't say to a clinic owner on the phone → rewrite.
5. Both founders approve the **headline promise** (D-083: written only from the three guarantees in file 11 §8; final wording still needs both founders).

**Launch-day honesty problem to solve now [Draft — founders decide]:** `DESIGN.md` §6 puts "three proof numbers from real projects" and "case studies" on the home page, but Roiyan has no client results yet. At launch, replace those two sections with things that are true today, for example: "how we measure results" (baseline → tracking stack → monthly report), "open prices, valid until the end of the month", and the founders with real photos and roles. Add the real-numbers section when the first permissioned case exists (file 32 §13).

✅ Done when: `content/<page>.md` exists, every section has real text or a visible `[TODO]`, and no sentence promises a result.

---

## Step 3 · Grey boxes — the wireframe (every page — 20–40 min)

Before colours and effects, check the **order and size** of things on a phone. Do the **money path first**: wizard (3.2) and plan page (3.3) before home (3.1) if you haven't wireframed them yet — they are pages 2 and 3 in Step 1.

### 3.0 Rules for every wireframe

- Lives in the route group `app/(wireframes)/` (the folder name doesn't appear in the URL): `/home-wire`, `/wizard-wire`, `/plan-wire`. Each page sets `robots: { index: false }`. **Delete the whole `app/(wireframes)/` folder before launch.**
- Greys only (`neutral-*`), no images, no icons beyond grey squares, no animation. One filled dark-grey button = the primary action; everything else is an outline button or a link.
- **Real Persian text** from the copy deck (`content/<page>.md`). Where the deck has `[TODO]`, show a grey bar, never invented text.
- **Sample data only from the docs** and marked «نمونه» on screen — e.g. the dental-clinic quote in `docs/11_PRICING_AND_OUTCOME_MODEL.md` §6. Never invent prices or scores. Numbers through `lib/farsiNumerals.ts` and `lib/money.ts`.
- 375 px wide, RTL, spacing from the DESIGN.md §3 scale; buttons 44 px tall; body text 16 px, small text never under 14 px.
- Sticky bars are drawn where they will really be (bottom of the screen on mobile). **Only one sticky bar per screen.**
- Acceptance for every prompt: `npm run build` + `npm run lint` pass; nothing outside `app/(wireframes)/` changes except new copy files.

### 3.1 Home

🤖 Prompt:

```text
Using content/home.md, build app/(wireframes)/home-wire/page.tsx: a grey-box wireframe at 375 px width.
Only grey rectangles, real Persian text from the copy deck, our spacing scale (DESIGN.md §3), RTL.
No colours, no images, no animation. One primary button per screen-height, as DESIGN.md §5 rule 3 says.
Include a sticky bottom bar «شروع تشخیص رایگان» that appears after the hero scrolls away, and a footer (legal links /qavanin /harim /bazgasht /darbare /tamas, phone, email, address, e-Namad slot).
```

Open it on your phone. Ask yourself four questions:

| Question | Good answer |
|---|---|
| Within the first screen, do I know **what Roiyan does** and **what to tap**? | Yes, one sentence + one button «شروع تشخیص رایگان» |
| Is any section there only "because websites have one"? | No — delete it |
| Can I reach the wizard button from anywhere (sticky on mobile)? | Yes |
| Is the order the order of the visitor's questions (what? for me? how? cost? proof? start)? | Yes |

### 3.2 Wizard — every screen, both tracks

The wizard is judged **one screen at a time**, so the wireframe shows every screen as a separate **phone frame of 375 × 667 px** (the smallest common phone), stacked top to bottom with a label above each. If something doesn't fit inside its frame, you see it immediately.

**Before:** `content/wizard.md` is up to date (the fixes from the copy review are applied) and `docs/20_WEBSITE_WIZARD_SPEC.md` is in the repo.

🤖 Prompt:

```text
Build app/(wireframes)/wizard-wire/page.tsx: a grey-box wireframe of EVERY wizard screen, following guide docs/24_DESIGN_PROCESS_GUIDE.md §3.0.
Sources: content/wizard.md (all text), docs/20_WEBSITE_WIZARD_SPEC.md §1–§3 (screens, options, limits, tracks), DESIGN.md §5 and §7 (wizard shell, option card, insight card, phone gate, score card).

Layout: each screen is a separate frame exactly 375 × 667 px (overflow visible but the frame edge drawn as a dashed line, so anything below the fold is obvious), RTL, stacked vertically with 48 px gaps. Above each frame a small LTR label: screen number, track and group (e.g. "5 · SB track · G1 owner").
Put a small reusable PhoneFrame and WizardShell in app/(wireframes)/_parts/ (they are wireframe-only, not real components).

Wizard shell in every frame: top bar (back button, progress «مرحله x از n» counted per path — G3 and G4 skip screen 2, so they see «از ۸»), the question, optional hint, the options, and a sticky bottom «بعدی» button (draw it disabled on frames where nothing is selected, enabled where it is).

Frames, in this order:
A. Shared: 1 group (4 options) · 2 role, SB owner list · 2 role, organization list · 3 industry (13 options — try a 2-column grid of short chips so it fits; say in the label if it still scrolls) · 3 professions for G4 (6 options).
B. Small-business track (G1 owner): 4 goals with the role default pre-selected and «تا ۲ مورد» · 4 with 2 selected (third option drawn as blocked, with the limit message) · 5 problems «تا ۳ مورد» · insight card (one sentence, no button except «بعدی») · 6 what you already have (checklist) · 6 G3 variant (what is ready) · 7 where you sell · 8 budget band + when to start + city as three short groups on one screen, G1 bands · 8 with the G3/G4 bands.
C. Organization track (G2, R-CEO): 4 goals · 5 problems · insight card, organization wording · 6 current systems incl. the accounting single choice · 7 people in the decision + official invoice + timeline · 8 budget, organization bands.
D. Phone gate: 9 empty (name + mobile, why we need the number, link to /harim, blurred score preview behind) · 9 organization (+ company name) · 9 with the numeric keyboard open — draw a grey block for the keyboard over the bottom 260 px and check the button is still visible · OTP entry (6 boxes, resend timer, change-number link) · OTP wrong-code error in Persian.
E. Results: SB health score (big number «۶۲ از ۱۰۰» marked «نمونه», six pillar bars, weakest pillar highlighted, one sentence, primary button to the plan) · organization maturity «سطح ۳ از ۵» · G3 readiness score · "building your plan" loading state.

Use only text from content/wizard.md; [TODO] items become grey bars. Sample numbers marked «نمونه». No colours, images or animation.
Acceptance: build + lint pass; every frame labelled; nothing outside app/(wireframes)/ changes. At the end, list the frames where content overflows 667 px.
```

Open `/wizard-wire` **on your phone** and check:

| Question | Good answer |
|---|---|
| Does every screen fit in its frame without scrolling? | Yes — except the industry list if it truly can't; then the next button stays visible |
| Are the options and «بعدی» in the bottom two-thirds (thumb zone)? | Yes |
| Is the progress count right on every path (G4 «از ۸»)? | Yes |
| Is the limit («تا ۲ مورد», «تا ۳ مورد») visible **before** I hit it? | Yes |
| Phone gate with the keyboard open: can I still see the button and the privacy link? | Yes |
| Does the results screen say **one** thing (score + weakest pillar) and offer **one** button? | Yes |
| Could I finish all frames with one thumb in < 4 minutes? | Yes |

**Decide here [Draft — Ramin]:** on single-choice screens (1, 2, 3, 8 groups), should a tap **auto-advance** to the next screen? It's faster, but DESIGN.md §7 says "sticky next". Recommendation: auto-advance on single-choice screens with one question, keep «بعدی» on multi-select and on screen 8 (three groups). If you agree, update DESIGN.md §7 and file `22_DESIGN.md`.

### 3.3 Plan page — copy deck first, then the wireframe

The plan page has no copy deck yet. Make it first (Step 2), then wireframe it.

🤖 Prompt 1 — copy deck:

```text
Read docs/11_PRICING_AND_OUTCOME_MODEL.md §6–§8, docs/20_WEBSITE_WIZARD_SPEC.md §6–§7, DESIGN.md §2 and §7, and CLAUDE.md.
Write content/plan.md: the Persian copy for /plan/[code] — page title, score summary sentence (SB, organization, G3), weakest-pillar sentence, the four block titles exactly as the glossary names them (one-time work, monthly plans, «پرداخت برای نتیجه», «هزینه‌های شما») with one helper line each, the item row labels (outcome line, firm / «از» / range price, toggle on/off), locked-complement reason pattern, the pay-for-results explainer line and «مثال» label for the example month, the "your costs are paid directly to providers" line, totals labels «برای شروع» and «ماه معمول بعد از آن», the validity line «قیمت‌ها تا پایان {ماه} معتبر است», the price-snapshot note, the plan-version label (v2 after the call), the organization note that formal contracts follow the diagnostic, and the exit labels «رزرو تماس» and «دانلود پلن» (payment is hidden until e-Namad, D-081 — no payment label).
«شما» voice, no promises beyond file 11 §8, no invented numbers; [TODO] where unclear. Then run the lahne-man skill and list what it changed.
```

🤖 Prompt 2 — wireframe:

```text
Build app/(wireframes)/plan-wire/page.tsx: a grey-box wireframe of the plan page, following docs/24_DESIGN_PROCESS_GUIDE.md §3.0.
Sources: content/plan.md (all text), docs/11_PRICING_AND_OUTCOME_MODEL.md §6 (blocks, totals, ranges, validity) and its worked example (Tehran dental clinic) as the ONLY sample data, marked «نمونه»; DESIGN.md §5 and §7 (score card, plan block, locked complement, totals bar, exit buttons).

Main view: one 375 px column (full page, scrolls) in this order: header with plan code + version + validity line → score card (big number, six pillar bars, weakest highlighted, one sentence) → the four blocks in this fixed order, never mixed: One-time · Monthly · «پرداخت برای نتیجه» · «هزینه‌های شما» → each item row: name, one-line outcome, price (firm / «از» / range), toggle → the locked complement (AU2 needed for DS4) with a lock and its reason visible on tap, not hover → the pay-for-results row with base + per result + «مثال» month → the your-costs block with "paid directly to providers" → exits «رزرو تماس» (primary) and «دانلود پلن» (outline); no payment button.
ONE sticky bottom bar on mobile: «برای شروع» and «ماه معمول بعد از آن» totals + the primary «رزرو تماس». Add bottom padding so the bar never covers the last item.

Then, below the main view, smaller state frames (375 × 667, dashed edge, LTR label above each): 1) one optional item toggled off and the totals changed; 2) locked-complement reason open; 3) organization (G2) version — firm price only for GA2/GA3, everything else as ranges ≤ ±20 %, «دانلود پلن» prominent, the formal-contract note, maturity level instead of health score; 4) G3/G4 version — smaller «برای شروع» shown first; 5) plan version 2 banner after the call.

Totals must be computed from the sample rows with lib/money.ts, not typed. No colours, images or animation.
Acceptance: build + lint pass; the totals match file 11 §6 (to start 40.5M, typical month ≈23M); nothing outside app/(wireframes)/ and content/plan.md changes.
```

Open `/plan-wire` on your phone and check:

| Question | Good answer |
|---|---|
| First screen: do I see my score, my weakest area and what to do next? | Yes, without scrolling |
| Can I tell fixed prices from pay-for-results from my own costs at a glance? | Yes — four separate blocks, same order every time |
| When I switch something off, do I see what changed? | Yes, totals update and the item looks "off" |
| Do I understand why a locked item is locked? | Yes, one short reason |
| Is the example month clearly an example, not a promise? | Yes — «مثال» |
| Is there one sticky bar, and does it never cover content? | Yes |
| Organization version: ranges, contract note, download prominent? | Yes |

✅ Done when: you would be happy to launch each page even in grey. Keep the `(wireframes)` routes out of every menu and delete the folder before launch.

---

## Step 4 · Visual direction — do once (Oct 15–16)

This is where the site stops looking "made by AI". You decide **one** direction and write it down; every later page follows it.

### 4.1 What you already have (don't re-decide)

- Font: **Vazirmatn** only. Colours: brand **#0F5C5A**, action **#E8962E**, plus the derived tokens (`DESIGN.md` §3).
- Personality: plain, direct, expert, honest, calm — "a diagnostician, not a salesman" (§1).
- Story for motion: **scan → find the leak → fix → measured result** (§11).

So research is **not** "which colours?". It is: **layout, spacing, typography scale, how numbers are shown, how calm/serious it feels, how motion is used.**

### 4.2 Collect references — exactly what to look for

Spend **60–90 minutes**, collect **10–15 sites** in `refs/direction/`. Look at sites of **diagnostic, data and trust businesses**, not agencies (agency sites all look the same).

**Capture with the script, not by hand.** `scripts/capture-refs.mjs` (in the repo; needs `playwright-core` and `npx playwright-core install ffmpeg` once) opens each link at 1440 px and 390 px, scrolls like a person, closes cookie banners, records a video, saves frames plus one contact sheet per device, and writes `report.md` (libraries such as GSAP/Three.js/Lenis, fonts, type sizes, colours, radius, animations with durations, videos, 3D, reduced-motion support, page weight) and `SUMMARY.md` for all sites.

1. Put links in `refs/direction/urls.txt`, one per line: `https://site.com short-name  # note`. Paste the **real site** link, not the land-book page.
2. Run `npm run refs` (one site: `npm run refs -- 3`). If your VPN is a local proxy: `$env:REFS_PROXY="http://127.0.0.1:<port>"; npm run refs` in PowerShell. Iranian sites: run with the VPN **off** (many block foreign IPs).
3. Hover/click effects the scroll can't trigger: record ≤ 20 s with a screen recorder into `refs/direction/manual/`.
4. `refs/` is git-ignored — never commit other sites' material. Study only; never copy code, images or text.

Then 🤖 write the notes:

```text
Read refs/direction/SUMMARY.md and, for each site folder, report.md, desktop-sheet.jpg and mobile-sheet.jpg (open frames/ only when a sheet is unclear). Update refs/direction/notes.md: one block per site — LIKE / BORROW (layout, type scale, spacing, number style, motion idea) / NOT — then "patterns across sites" and a "fits us?" table (calm diagnostician, Persian RTL, mobile first, DESIGN.md performance budget, honesty rules). Ignore cookie banners and anything the capture caused. Describe ideas only.
```

| Look at | Where | Search words to type | What to capture |
|---|---|---|---|
| Health / clinic-tech, insurance, fintech landing pages | land-book.com, recent.design | `health`, `fintech`, `insurance`, `analytics`, `audit` | Calm hero, how trust is shown, big numbers |
| Product pages that **explain a process** in steps | land-book.com, supahero.io | `how it works`, `onboarding`, `steps` | 3-step explainers, diagrams instead of photos |
| Pricing and calculators | pricingpages.design | `usage based`, `calculator`, `add-ons` | How price + inclusions + toggles are laid out |
| Multi-step forms and quizzes | Mobbin (free part), component.gallery | `onboarding`, `quiz`, `stepper`, `OTP` | Big tappable options, progress, back button |
| Score / report screens | Mobbin, land-book | `score`, `report`, `dashboard summary` | How one big number + bars are shown |
| Navbars, CTAs, footers | navbar.gallery, cta.gallery, footer.design | — | Only once the direction is chosen |
| Persian / RTL sites done well | Any Iranian product you respect (banks' new apps, fintechs, ed-tech) | — | How Persian headlines breathe; line height; digits |

**If you add a screenshot by hand, write one line for it in `refs/direction/notes.md`:**

```
01-landbook-stripe-like.png — LIKE: huge calm white space, numbers in a light card. BORROW: spacing and number style. NOT: their colours.
```

**Look for (good signs):** lots of white space · one idea per section · real UI shown instead of stock photos · numbers big and labelled · few font sizes · motion that explains something.

**Avoid the generic versions (these make sites look AI-made or untrustworthy):** purple/blue/rainbow gradients · grey glass with nothing behind it · the same glow or glass on every element · endless loops that mean nothing · stock photos of handshakes and laptops · fake dashboards with invented numbers · countdown timers · several signature effects on one screen · English-first layouts squeezed into RTL.

**Allowed and wanted, in our version:** glass, glow, light sweeps, gradients, animated borders, liquid fills and small success bursts, built from our tokens, with a job and within the budget in `DESIGN.md` §13 (D-095). When you collect references, **don't filter these out**; Claude Code translates them.

### 4.3 Turn references into three directions (vibe-to-ui)

🤖 Prompt in Claude Code:

```text
Use the vibe-to-ui skill. Inputs: the screenshots and notes in refs/direction/, DESIGN.md (fixed tokens: Vazirmatn, #0F5C5A, #E8962E — don't change them), and our personality: calm diagnostician, honest, Persian/RTL, small-business owners on mobile.
Propose 3 distinct visual directions for roiyan.com. For each: a name, 5 lines (layout, type scale, spacing density, how numbers and proof look, motion idea for "scan → leak → fix → result"), and a small preview page at /kit/directions/<name> using the same home copy deck.
Do not apply anything to real pages until I choose.
```

Open the three previews **on your phone**. Choose with this scorecard (1–5 each):

| Criterion | Question |
|---|---|
| Trust | Would a 45-year-old clinic owner trust this with money? |
| Clarity | Do I know what to tap in 3 seconds? |
| Distinct | Would I recognise it without the logo? |
| Persian | Does Persian text look natural (not cramped, not English-shaped)? |
| Buildable | Can we finish it by Oct 29? |

Pick the highest total; show Mehdi the top two before deciding (5 minutes).

### 4.4 Write the direction down

🤖 Prompt:

```text
I chose direction "<name>". Add a section "## 12 · Visual direction (chosen <date>)" to DESIGN.md: the name, 8–10 concrete rules (type scale in px, section spacing, card style, how numbers/scores look, image style, motion style, what we never do). Keep §3 tokens unchanged. Then delete the other direction previews.
```

Then copy that new §12 back into the Claude project file `22_DESIGN.md` (or send it to Claude chat to update the file) so both stay the same.

✅ Done when: DESIGN.md §12 exists and you could describe the site's look in two sentences.

---

## Step 5 · Component kit — build once, reuse everywhere (Oct 16–18)

Pages are assembled from parts. Build the parts first on one internal page, `/kit`, so you can see them all together.

### 5.1 The kit list (order matters)

| # | Component | Used on | Spec | Look at (free) |
|---|---|---|---|---|
| 1 | Buttons (brand, action, ghost), links | everywhere | §3, §5 (44 px, action = dark text) | shadcn Button |
| 2 | Section shell (spacing, heading, eyebrow) | all pages | §3 spacing, §12 | — |
| 3 | Price tag | services, plan | §7 Price tag («معتبر تا پایان …») | pricingpages.design |
| 4 | Number / stat display | home, results, plan | §12 rules | Magic UI number ticker (real numbers only) |
| 5 | FAQ (accordion) | home, landings | — | shadcn Accordion |
| 6 | CTA band | all public pages | one action | cta.gallery |
| 7 | Navbar (mobile menu + sticky «شروع تشخیص رایگان») | all public pages | §5 rule 3 | navbar.gallery |
| 8 | Footer (contact, legal links, e-Namad slot) | all public pages | file 53 §5 | footer.design |
| 9 | **Wizard shell**: progress "x از ۹", back, question, sticky next | wizard | §7 | Mobbin onboarding, Kinetics step progress |
| 10 | **Option card** (single / multi with «تا ۲ مورد») | wizard | §7 | component.gallery "radio card" |
| 11 | Insight card | wizard | §7 | — |
| 12 | **OTP input** (numeric, auto-fill, resend timer) | phone gate | §7, CLAUDE.md rule 8 | Kinetics PIN/OTP |
| 13 | **Score card** (big number + six pillar bars, weakest highlighted) | results | §7 | Kinetics progress ring |
| 14 | **Plan block** + toggle + locked complement | plan page | §7, file 11 §6 | pricingpages.design add-ons |
| 15 | **Totals bar** (sticky on mobile) | plan page | §7 | — |
| 16 | Exit buttons group | plan page | §7 | — |
| 17 | Form fields (text, phone, select) with Persian errors | booking, panel | §4, §5 rule 8 | shadcn Form |
| 18 | Data table (simple) | `/panel` | — | shadcn Table |

### 5.2 How to build each component

**Your part (5–10 min per component):** drop everything you like into `refs/components/<NN - name>/`: screenshots (one per state if you can), links in a `links.txt`, pasted code or AI prompts as `*.md` (never `.tsx`). **No notes needed.** Reading your taste and inferring the motion is Claude Code's job (step 1 of the prompt).

**Claude Code's part:** writes `ref-notes.md` (taste read, where each reference goes, inferred motion), then builds a **lab page** with the full variant system and 2–3 candidates for the most visible variant.

**Your part again:** open the lab **on your phone**, pick a candidate, then apply it.

🤖 Prompt template (one component per prompt):

```text
Use the impeccable skill. Build kit #<NN> <Name>.
Read: DESIGN.md §3, §4, §5, §7, §11, §12, §13 · CLAUDE.md · everything in refs/components/<folder>/ (screenshots, links, *.md code and prompts). I add no notes; reading my taste is your job.

1. Taste read → write refs/components/<folder>/ref-notes.md (skip this step if the folder already has a ref.md with this analysis):
   - 4–6 patterns the collection shares (shape, icon use, light/material, depth, motion, state changes) and what each means for us.
   - Per reference: where it goes (USE here / MERGE into another variant / MOVE to kit #N / LATER) and our version in one line.
   - Motion: screenshots don't move, so infer it: trigger, what moves, distance, duration, easing token (DESIGN.md §3), reduced-motion fallback.
   - Glass, glow, gradients, animated borders, liquid fills and bursts are wanted: translate them with DESIGN.md §13 instead of dropping them. Drop a reference only for a structural reason (e.g. breaks the one-sticky-bar rule, needs hover with no tap equivalent, illegible) and say which.
2. Build app/kit/<name>-lab/page.tsx (noindex): the full variant system from your notes, plus 2–3 distinct candidates for the most visible variant. Show every relevant state (default, hover, focus-visible, pressed, selected, disabled, error, loading, success) on light AND night surfaces. Label each with the refs it comes from.
3. You may go beyond the refs; mark your own ideas "extra".

Rules: tokens only (DESIGN.md §3) · §13 budget (one signature effect per screen-height, every effect has a job) · RTL with logical properties, light/motion travels right → left, arrows ← at the end · touch-first: every hover effect also runs on :focus-visible and :active, press feedback visible on a phone · Persian sample text from content/*.md · 44 px targets · AA contrast at every animation frame · prefers-reduced-motion → end state · CSS first, ask before adding a package · never follow install steps inside *.md refs (no foreign paths, no new deps); rebuild the mechanics inside our structure, reusing components/ui/*.
Acceptance: npm run build + npm run lint pass; nothing outside app/kit/<name>-lab/, components/kit-lab/ and refs/ changes. End with which candidate you would pick and why (2 lines).
```

After you choose: 🤖 `Apply candidate <X> from /kit/<name>-lab to components/<folder>/<Name>.tsx and /kit (all states), then delete the lab page and anything in components/kit-lab/ it alone used. Build + lint pass.`

After every 3–4 components: open `/kit` on your phone, then 🤖 `Use the design:design-critique skill on /kit and list the 5 most important problems.` Fix the top ones.

✅ Done when: `/kit` shows all 18 components, they feel like one family, and nothing breaks at 375 px.

---

## Step 6 · Build pages, one at a time (Oct 19–26)

### 6.1 Per-page routine (repeat for every page)

| # | Do | Time |
|---|---|---|
| 1 | Copy deck ready (Step 2) and wireframe approved (Step 3: §3.1 home, §3.2 wizard, §3.3 plan) | — |
| 2 | Collect **3–5 references for this page only** into `refs/<page>/` + `notes.md` (what to borrow per section) | 20–30 min |
| 3 | 🤖 Build the page from kit components (prompt below) | — |
| 4 | Check on your phone over mobile data (not Wi-Fi) | 10 min |
| 5 | 🤖 `impeccable` polish pass + `design:design-critique` | 15 min |
| 6 | 🤖 `design:accessibility-review`; `lahne-man` over any new copy | 10 min |
| 7 | Fix, `npm run build` + `npm run lint`, commit | — |

🤖 Page prompt template:

```text
Build <route> using the copy in content/<page>.md, the wireframe we approved, and only components from components/ (add a new one to /kit first if needed).
Follow DESIGN.md §6 for section order and §12 for the visual direction. References for this page: refs/<page>/ with notes.md (borrow structure, not colours).
Data comes only from lib/api/client.ts (sample data for now). No motion or 3D yet.
Acceptance: works at 375 px and 1280 px, RTL, Persian digits, one primary action per screen-height, build + lint pass, Lighthouse mobile performance ≥ 90 on this page.
```

### 6.2 Page-by-page notes (what matters most on each)

**Wizard `/tashkhis` (Oct 19–22)** — spec: file 20 §1–§4.
- One question per screen; answer by tapping, not typing (except name/mobile/OTP).
- Progress «مرحله ۳ از ۹» always visible; back button never loses answers.
- The **insight card** after screen 5 is the "aha" moment — give it space, no button except next.
- Phone gate: show the **blurred score preview** behind; say why we need the number and link to `/harim`.
- Test: finish all 9 screens with one thumb, on a mid-range Android, over mobile data, in < 4 minutes.

**Results + plan `/plan/[code]` (Oct 20–24)** — spec: file 20 §6–§7, file 11 §6.
- First screen: the score (big) + weakest pillar + one sentence of meaning.
- Then the **four blocks** in this order: One-time · Monthly · Pay for results · Your costs. Never mix them.
- Totals bar «برای شروع» / «ماه معمول بعد از آن» sticky at the bottom on mobile.
- Locked complements show the lock and the reason; toggles update totals instantly.
- Exits: at launch only «رزرو تماس» and «دانلود پلن» (payment hidden until e-Namad, D-081).

**Home `/` (Oct 21–24)** — spec: §6 + the honesty substitution in Step 2.
- Hero: promise headline (founders' wording) + two buttons for the two buyers (کسب‌وکار کوچک / سازمان) + the static poster of the future hero visual.
- "How it works in 3 steps" is the most important section after the hero — make it visual.
- Six pillars written as **problems**, not service names (§2: «مشتری‌ها برنمی‌گردند», not «باشگاه مشتریان»).

**Landings `/kasb-o-kar`, `/sazman` (Oct 23–25)** — same template, different tone (§2: warmer vs more formal; "health score" vs "maturity level").

**`/natije-mehvar` (Oct 24–25)** — explain base + per result + cap + 72-hour disputes with one **labelled example** («مثال»), never a promise. Pricing-calculator references help here.

**Booking, legal, about, contact (Oct 24–26)** — plain and trustworthy; real phone, address and founders. Legal text from file 53 §5.

**`/panel` (Oct 23–26)** — clarity over beauty: tables, filters, one action per row. Persian, RTL, same tokens.

✅ Done when each page passes the checklist in Step 8.

---

## Step 7 · Motion and the hero visual (Oct 25–27, after pages work)

Rules: `DESIGN.md` §11 and CLAUDE.md rule 7. Order:

1. **Poster first:** the hero must look finished as a still image (that image is what slow phones and reduced-motion users see).
2. **Small motion:** Motion for fades, option-card selection, number count-up (real numbers only). Install when needed (guide 23, Phase H).
3. **One scroll story** on home or `/natije-mehvar`: "scan → leak → fix → result" with GSAP ScrollTrigger (shortlist row 2 in guide 23 §11).
4. **3D or video hero last** (shortlist rows 1 or 3). If it isn't smooth on a mid-range Android by Oct 27, **launch with the poster** and upgrade after launch (D-094 cut order).

🤖 Prompt:

```text
Add the hero visual to the home page following DESIGN.md §11 and CLAUDE.md rule 7: static poster as LCP, the 3D/video loaded with next/dynamic after first paint, reduced-motion and slow-device fallback, lighter on mobile, pauses off-screen.
Story: a calm teal "scan" passes over a simple business shape, one point (the leak) glows in the action colour, then seals. No text inside the 3D. Keep LCP < 2.5 s on 4G.
```

---

## Step 8 · Check and polish (every page, before it counts as done)

| Check | How | Pass |
|---|---|---|
| Phone first | Real phone, mobile data, 375 px | Nothing cut off, no sideways scroll |
| One action | Look at each screen-height | One clear primary button |
| Persian | `lahne-man` + read aloud; digits, «» quotes, نیم‌فاصله, «٬» in prices | Sounds like a person, not a translation |
| Honesty | No invented numbers, no countdowns, guarantees only from file 11 §8 | Nothing you couldn't prove tomorrow |
| Accessibility | `design:accessibility-review`; tab through with keyboard | Contrast AA, 44 px targets, labels on inputs |
| Speed | Chrome DevTools → Lighthouse (mobile) | Performance ≥ 90, LCP < 2.5 s |
| Consistency | Compare with `/kit` | Same buttons, spacing, card style |
| Data | Only from `lib/api/client.ts` | No hard-coded prices |

Final design review (Oct 26): 🤖 `Use the impeccable skill to audit the whole site for consistency against DESIGN.md §12 and list fixes by priority.` Fix priority 1 items only; the rest go to Sprint 2.

---

## Day-by-day plan to launch (design work only)

Matches Sprint 1 in `41_ROADMAP_AND_PLANS.md`; back-end work runs in parallel (guide for `roiyan-api` when Ramin asks).

| Date | Design work |
|---|---|
| Wed Oct 14 – Thu Oct 15 | Step 1 done (this table); copy decks for wizard + home (Step 2); founders review the headline |
| Fri Oct 16 | Step 4: references (90 min) → vibe-to-ui 3 directions → choose → DESIGN.md §12 |
| Sat Oct 17 | Step 3 for the wizard (§3.2) and plan page (§3.3, copy deck first) — about 1.5 h |
| Sat Oct 17 – Sun Oct 18 | Step 5: kit components 1–12 |
| Mon Oct 19 – Wed Oct 22 | Wizard (Steps 2–3–6) + kit 13–16 |
| Tue Oct 20 – Sat Oct 24 | Results + plan page |
| Wed Oct 21 – Sat Oct 24 | Home; price review on Sat Oct 24 (business, not design) |
| Fri Oct 23 – Sun Oct 25 | Landings, `/natije-mehvar`, booking, `/panel` |
| Sat Oct 24 – Mon Oct 26 | Legal, about, contact; service/industry templates if time allows |
| Sun Oct 25 – Tue Oct 27 | Step 7: motion, scroll story, hero (poster fallback ready) |
| Mon Oct 26 – Wed Oct 28 | Step 8 on every page; soft launch to ~10 warm contacts; fix |
| **Thu Oct 29** | Launch |

---

## Common beginner mistakes (and the fix)

| Mistake | Fix |
|---|---|
| Starting with the 3D hero | Build the wizard and plan page first; the hero is Step 7 |
| Asking Claude "make it beautiful" | Give the copy deck, the reference + what to borrow, and acceptance criteria |
| Copying a reference's colours and fonts | Borrow structure, mechanics, material and motion; colours and font always come from our tokens |
| Banning glass/glow/gradients because AI overuses them | Use our version from `DESIGN.md` §13: brand-tinted, with a job, one signature effect per screen-height |
| References with nobody reading them | Drop raw references freely; Claude Code writes `ref-notes.md` (taste read + inferred motion) before building (§5.2) |
| Checking only on the laptop | Most visitors arrive on phones from SMS and Instagram — check on a phone every time |
| Different button styles on different pages | Every new UI piece goes into `/kit` first |
| Filling empty sections with invented numbers | Use `[TODO]` or remove the section until real data exists |
| Polishing page 1 for three days | Good enough + consistent beats perfect + unfinished; polish in Step 8 |

---

**Related files:** `22_DESIGN.md` (DESIGN.md) · `20_WEBSITE_WIZARD_SPEC.md` · `11_PRICING_AND_OUTCOME_MODEL.md` §6 · `21_TECH_ARCHITECTURE.md` §4 · `23_FRONTEND_SETUP_GUIDE.md` (Phases G, H, §11 shortlist) · `41_ROADMAP_AND_PLANS.md` · `53_LEGAL_AND_COMPLIANCE.md` §5
