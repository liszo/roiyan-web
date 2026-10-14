# CLAUDE.md — roiyan.com front end (`roiyan-web`)

> **Purpose:** instructions for Claude (Claude Code or chat) when working on the roiyan.com **front-end** code. Copy this file to the `roiyan-web` repo root as `CLAUDE.md` (and `22_DESIGN.md` as `DESIGN.md`). The back end (`roiyan-api`, NestJS) gets its own CLAUDE.md when that repo is created; its rules are in `21_TECH_ARCHITECTURE.md`.
> **Read when:** before writing, reviewing or debugging any roiyan.com front-end code.
> **Updated:** 2026-10-14 (22 Mehr 1405) — WordPress removed; the front end talks only to our NestJS API (D-090…D-093); fresh Next.js 16 project (D-088); everything on Liara (D-087); rich media under a budget (D-086); brand fixed (D-077)

## What this project is

roiyan.com is the Persian-only, RTL sales site of Roiyan, an Iran-market growth agency. Its core is a **9-screen diagnostic wizard** that builds a personalized, priced plan (`/plan/[code]`). Catalog, prices, leads and plans live in **our own back end** (`roiyan-api`: NestJS on Fastify + PostgreSQL at `api.roiyan.com`). This repo is the **front end only**: pages, wizard, plan page and the founders' `/panel`. Business context: catalog `10_SERVICE_CATALOG.md`, pricing `11_PRICING_AND_OUTCOME_MODEL.md`, wizard spec `20_WEBSITE_WIZARD_SPEC.md`, architecture `21_TECH_ARCHITECTURE.md`, design `22_DESIGN.md` (copied here as `DESIGN.md`), setup steps `23_FRONTEND_SETUP_GUIDE.md`.

## Stack

- **Front end (this repo):** Next.js 16 (App Router, Turbopack) · React · TypeScript · Tailwind CSS v4 · shadcn/ui in RTL mode · next-intl (locale `fa` only) · react-hook-form + Zod for forms · Node.js 22 LTS.
- **Motion & visuals:** Motion · GSAP + `@gsap/react` · Three.js + React Three Fiber + drei · Lenis (optional) · video backgrounds from Liara object storage — public pages, under the budget in rule 7 (D-086).
- **Back end (other repo):** `roiyan-api` — TypeScript on Node.js, **NestJS on the Fastify adapter**, PostgreSQL + Prisma, at `api.roiyan.com` (D-090, D-091). It owns the database, the plan engine, OTP/SMS (Melipayamak), payments (Zarinpal) and email (Brevo).
- **API contract:** the API publishes OpenAPI; this repo generates its types into `lib/api/schema.d.ts` (`openapi-typescript`) and calls the API with `openapi-fetch` (D-091).
- **Hosting — everything on Liara (D-087):** this Next.js app, the NestJS API, PostgreSQL, object storage, n8n.
- **No WordPress** in Roiyan's own stack (D-090).
- Repo: `roiyan-web` (new, private). The old `liszo/roiyan-nextjs` repo is a read-only reference.

## Commands

```bash
npm install          # install packages from package.json
npm run dev          # local dev at http://localhost:3000
npm run build        # must pass before any commit (Next.js 16 no longer runs lint during build)
npm run lint         # run separately — must pass too
npm start            # runs the production build (Liara uses this)
npm run api:types    # regenerate lib/api/schema.d.ts from the API's OpenAPI (after API changes)
```

## Key paths

| Path | What |
|---|---|
| `app/layout.tsx` | Root layout: `<html lang="fa" dir="rtl">`, Vazirmatn font, `DirectionProvider` |
| `app/globals.css` | Tailwind v4 + design tokens from `DESIGN.md` §3 |
| `app/fonts/` | Vazirmatn font file, self-hosted with `next/font/local` |
| `lib/api/client.ts` | **The only way to reach data**: typed `openapi-fetch` client for `API_URL`; server-side only (adds the internal key, forwards the visitor IP) |
| `lib/api/schema.d.ts` | Generated API types — never edit by hand |
| `lib/farsiNumerals.ts`, `lib/jalali.ts`, `lib/money.ts` | Persian digits, Jalali dates, toman formatting — use for every number/date/price shown |
| `app/**/actions.ts` | Server Actions (wizard answers, OTP, accept plan, booking) — they call `lib/api/client.ts` |
| `components/ui/*` | shadcn/ui components (RTL) — our code, edit freely |
| `components/sections/*` | Page sections (hero, pillars, pay-for-results explainer, FAQ, CTA…) |
| `components/effects/*` | Heavy visuals (Three.js, GSAP scroll scenes, video) — client components loaded with `next/dynamic` |
| `components/wizard/*`, `app/tashkhis` | Wizard (9 screens) |
| `components/plan/*`, `app/plan/[code]` | Plan page (renders what the API calculated) |
| `components/booking/*`, `app/rezerv` | Booking flow |
| `app/panel/*` | Founders' admin panel (staff OTP login; leads, plans, prices) — not indexed |
| `app/api/revalidate/route.ts` | Webhook the API calls when catalog/prices change (secret-checked) |
| `messages/fa.json` | All static UI strings (next-intl) |
| `proxy.ts` | Next.js 16 name for the old `middleware.ts` (protects `/panel`) |
| `liara.json` | Liara deploy settings (app id, platform `next`, port, Node version) |
| `refs/` | Design reference screenshots for Claude — **not committed** |

## Non-negotiable rules

1. **The API is the system of record.** This repo never connects to a database and never stores business data; everything goes through `lib/api/client.ts`.
2. **The browser talks only to roiyan.com.** Pages fetch on the server; forms use Server Actions; no API keys or tokens in client code. **Only the API calls Zarinpal, Melipayamak (SMS/OTP) and Brevo** (D-090) — never this app.
3. **No secrets in the repo.** `.env*` is git-ignored. Secrets (`API_INTERNAL_KEY`, `REVALIDATE_SECRET`) live only in Liara environment variables. Only `NEXT_PUBLIC_*` vars reach the browser, and they never hold keys. EmailJS is removed — don't reintroduce it.
4. **Prices and rules are data** from the API — never constants here. The plan engine runs in the API; this repo only displays plans and their saved price snapshot.
5. **Permissions are enforced in the API**; the UI (including `/panel`) only hides.
6. **Persian-only UI:** `dir="rtl" lang="fa"`; logical CSS properties; Persian digits; Jalali dates; «تومان» with «٬» separators; correct نیم‌فاصله. Send ISO dates and Latin digits to the API.
7. **Performance budget (D-086)** — Three.js, GSAP, 3D and video backgrounds are allowed on public pages if all of these hold:
   - a static poster or CSS gradient paints first and is the LCP element; LCP < 2.5 s on 4G;
   - heavy libraries load only on pages that use them, after first paint (`next/dynamic` with `ssr: false`, or on scroll into view); never in the root layout;
   - `prefers-reduced-motion` → static version; slow devices/connections (low memory, `saveData`) → poster or video only;
   - mobile gets a lighter version, and 3D pauses when off-screen or the tab is hidden;
   - videos: muted, `playsInline`, looped, compressed MP4 (+ WebM), with a poster, served from Liara object storage — never from `public/`;
   - wizard, phone gate, plan page and `/panel`: effects never delay taps or typing (INP < 200 ms);
   - Core Web Vitals green on mobile before release; content pages static/cached; images through `next/image`.
8. **Accessibility:** WCAG AA contrast; tap targets ≥ 44 px; `inputmode="numeric"` + `autocomplete="one-time-code"` for OTP. Action buttons (#E8962E) use dark text, never white.
9. **Honesty:** no fake urgency (countdowns, "spots left"), no fake case studies or unverified numbers.
10. **OTP limits** (3 per number per hour, 10 per IP per hour) are enforced by the API; this app forwards the visitor IP and shows the API's Persian error messages.
11. **TypeScript everywhere:** all server-side code is TypeScript on Node.js (NestJS in the API, Server Actions/route handlers here). Business logic belongs in the API, not in Next.js route handlers (D-090, D-092).
12. **Free components only:** shadcn/ui and free/MIT sources; paid kits are studied and rebuilt as our own, never copied (D-089, proposed).

## Wizard & plan essentials

- Screen 1 sets **user group** (G1 small business, G2 organization, G3 starting, G4 freelancer); screen 2 sets **role** (codes in `04_GLOSSARY_AND_CODES.md`); G4 skips screen 2.
- After each screen, a Server Action saves the answer to the API (anonymous session id).
- The API's engine does: answers → pain-tag weights → top 3 tags → core services + **needed** complements → filters (group, industry, assets) → role-bundle +1 → budget phases → outcome units only with their tracking stack → 3–5 core services. This repo renders the result.
- Quote display: 4 blocks (one-time, monthly, pay for results, your costs); "to start" and "typical month after"; ranges ≤ ±20%; validity "until end of current Persian month".
- **Role shapes wording, never price.**

## Working style (Ramin's preferences)

- Ramin is new to the terminal: explain every command in one plain sentence and say what success looks like.
- Prefer **complete replacement files** over partial edits for CSS/JS components.
- One consolidated plan before editing many files; list files to touch and acceptance criteria.
- Explain architecture-level trade-offs briefly when they matter; otherwise be concise.
- When unsure about a business rule, check the docs above or ask — don't guess prices or rules.

## Definition of done

- [ ] `npm run build` and `npm run lint` pass; no TS errors
- [ ] Works at 375 px RTL (Chrome Android, Safari iOS)
- [ ] Persian digits/Jalali dates in all new UI
- [ ] Data only through `lib/api/client.ts`; API types regenerated if the API changed
- [ ] Heavy visuals: dynamic import, poster first, reduced-motion fallback, tested on a mid-range Android over mobile data
- [ ] No secrets added; no new foreign runtime dependency without a reason (fonts, scripts and media self-hosted or on Liara)
- [ ] Analytics events added for new user actions (event list in `20_WEBSITE_WIZARD_SPEC.md` §10)
- [ ] Docs updated if a rule or data shape changed (`21_TECH_ARCHITECTURE.md`)

## Infra gotchas

- **One deploy path:** Liara only (CLI `liara deploy` or Liara's GitHub integration — pick one, never both).
- Liara builds run `npm install` themselves: commit `package-lock.json`, pin versions, keep a `start` script. If package downloads are slow from the Iran build location, `liara.json` can set the build location [VERIFY in Liara docs].
- roiyan.com DNS is managed externally → to connect a domain or subdomain to a Liara app, add the records Liara's panel shows at the DNS provider.
- Local development needs the API address in `.env.local` (`API_URL`); until the API exists, pages use the mock data in `lib/api/mock.ts` (remove before launch).