# 10 · Service Catalog
 
> **Purpose:** the canonical list of every Roiyan service: code, what it includes, pricing model, price range, who can buy it.
> **Read when:** quoting, building a plan, writing a service page, answering "do you do X?", changing the wizard mapping.
> **Source of truth for:** service codes, names, models, toman ranges, group availability. Pricing rules live in `11_PRICING_AND_OUTCOME_MODEL.md`.
> **Status:** approved (Round 1, Oct 5 2026) + group filter (Round 2, Oct 10 2026) · **Updated:** 2026-10-11 (19 Mehr 1405)
 
## Rules for reading this file
 
- Prices are in **million toman (M)**, valid for **Mehr 1405**, reviewed on the **first working day of each Persian month** (`SOP-FIN-01`).
- **Models:** `F` fixed project · `M` monthly plan · `H` hybrid outcome (base + per result) · `S` scoped after diagnostic. Details: file 11.
- **Groups:** `G1` small business (1–19 staff) · `G2` organization (20–200) · `G3` starting a business · `G4` freelancer / solo professional. "All" = G1–G4.
- **Track** (Round 1 field, kept for history): `SB` small business, `Org` organization, `Both`. The engine now reads **Groups**.
- **Price evidence:** only monthly SEO is sourced (DMRoom, Seokar 1405 pages: 15–25M corporate/service sites, 10–40M low-competition keywords). Every other range is an estimate → Mehdi must check against 3–4 competitor quotes (open task).
- **Out of scope (never sell):** hardware, network IT, filmed video production. AI-generated video/content is in scope.
- Personalization is the delivery mode of every service, never a separate line item.
## 1 · Growth Analysis · تحلیل رشد
 
| Code | Service | Includes | Model | Price (M) | Track | Groups |
|---|---|---|---|---|---|---|
| GA1 | Free self-diagnosis | Wizard report: health score, top 3 leaks, draft plan | Free | 0 | Both | All |
| GA2 | Focused audit | One area (funnel, website & SEO, marketing & ads, or operations); report in 48–72 h | F | 4–8 | Both | All |
| GA3 | Full business diagnostic | Interviews, data access, baseline numbers, 90-day roadmap. **Required before any H or S work** | F | SB/G1/G4 15–20 · Org/G2 25–40 | Both | G1 G2 G4 |
| GA4 | Competitor & pricing analysis | 5–8 competitors: offers, prices, channels, gaps | F | 6–12 | Both | G1 G2 G4 ⚠ |
| GA5 | Customer research (new) | Short survey + 5–8 customer interviews, buyer profile | F | 8–15 | Both | G1 G2 |
| GA6 | BI dashboard setup | Looker Studio or Metabase on sales & marketing KPIs | F | 10–35 | Both | G1 G2 |
| GA7 | Monthly KPI report | Report + 45-min review call | M | 5–12 | Both | G1 G2 |
| GA8 | Growth advisory retainer | Monthly strategy call, priorities, oversight of all active services | M | 12–30 | Both | G1 G2 G4 |
 
⚠ Round 2 table said GA4 = "All", but the G3 rule excludes it. Resolved here as G1 G2 G4 (see `44_OPEN_QUESTIONS.md`).
 
## 2 · Systematization · سیستم‌سازی
 
| Code | Service | Includes | Model | Price (M) | Track | Groups |
|---|---|---|---|---|---|---|
| SY1 | Process mapping & SOPs | Per department: flowcharts, written procedures, owners | S | from 20 | Org | G2 |
| SY2 | Org structure & roles | Org chart, job descriptions, KPIs per role | S | from 15 | Org | G2 |
| SY3 | CRM selection & setup | Pipeline, stages, data import, training; Didar, Payamgostar, HubSpot free, or Mehdi's e-CRM | F | 15–40 | Both | G1 G2 G4 |
| SY4 | Sales process & scripts (new) | Stages, call & DM scripts, follow-up rules | F | 10–20 | Both | G1 G2 G4 |
| SY5 | Hiring & onboarding system | Job posts, screening form, scoring, onboarding checklist, automated steps | F | 15–35 | Org | G2 |
| SY6 | Customer service system (new) | Inbox rules, reply templates, response-time targets | F | 10–20 | Both | G1 G2 |
| SY7 | Accounting & ERP integration | Sepidar, Holoo, Hamkaran, Moadian e-invoice links; **partner-delivered** | S | after GA3 | Org | G2 |
| SY8 | Staff training & adoption | Live sessions + short video guides | F | 3–6 per session | Both | G1 G2 |
| SY9 | Quarterly systems review | Check adoption, fix gaps, update SOPs | M | 8–15 per quarter | Org | G2 |
 
## 3 · Automation & AI · اتوماسیون و هوش مصنوعی
 
| Code | Service | Includes | Model | Price (M) | Track | Groups |
|---|---|---|---|---|---|---|
| AU1 | Workflow automation | One n8n workflow, tested and documented | F | 8–25 per workflow | Both | G1 G2 G4 |
| AU2 | SMS & notification automation | Order status, reminders, birthdays, review requests | F | 6–15 | Both | G1 G2 G4 |
| AU3 | Instagram DM sales system | Auto-replies, product answers, order form, handoff to staff | F | 10–25 | SB | G1 |
| AU4 | Chatbot: website, Telegram, Bale | FAQ, lead capture, booking | F | 15–40 | Both | G1 G2 |
| AU5 | AI assistant on company knowledge (new) | Answers staff/customers from the business's own documents | S | from 30 | Org | G2 |
| AU6 | AI voice agent | Phone-answering pilot; Persian quality tested first | S | pilot | Both | G1 G2 |
| AU7 | Reporting & integrations | Connect tools, auto-fill sheets and dashboards | F | 8–20 | Both | G1 G2 |
| AU8 | Automation care plan | Monitoring, fixes, small changes | M | 3–8 | Both | G1 G2 G4 |
 
## 4 · Digital Solutions · راهکارهای دیجیتال
 
| Code | Service | Includes | Model | Price (M) | Track | Groups |
|---|---|---|---|---|---|---|
| DS1 | Landing page | One page, one offer, form, tracking | F | 8–15 | Both | All |
| DS2 | Corporate website | WordPress, ~10 pages, SEO basics | F | 30–80 | Both | G1 G2 G4 |
| DS3 | Online store | WooCommerce, Persian checkout, gateway, SMS notices | F | 60–150 | SB | G1 G3 ⚠ |
| DS4 | Online booking system | Clinics, salons, consultants; SMS reminders | F | 25–60 | SB | G1 G4 |
| DS5 | Custom plugin or internal tool | Built to spec | S | from 20 | Both | G1 G2 |
| DS6 | Payment gateway & e-Namad setup | Application, documents, integration | F | 3–6 | SB | G1 G3 G4 |
| DS7 | Speed & Core Web Vitals | Audit, fixes, before/after report | F | 6–15 | Both | G1 G2 G4 |
| DS8 | Security hardening & cleanup | Malware removal, firewall, backups | F | 5–12 | Both | G1 G2 G4 |
| DS9 | Migration | Host, domain or platform change; domestic hosting and CDN | F | 5–15 | Both | G1 G2 G4 |
| DS10 | Website care plan | Updates, backups, uptime, security, small edits | M | 3–10 | Both | All |
 
⚠ DS3 (60–150M) sits above every G3 budget band (top band "over 40M"); the engine will usually push it to Phase 2.
 
## 5 · Performance Marketing · مارکتینگ نتیجه‌محور
 
| Code | Service | Includes | Model | Price (M) | Track | Groups |
|---|---|---|---|---|---|---|
| PM1 | Lead-gen funnel | Landing, offer, OTP form, lead sheet, tracking. **Required for PM2 and PM3** | F | 12–25 | Both | G1 G2 G4 |
| PM2 | Verified leads program | Campaigns delivering OTP-verified leads | H | unit U1 | Both | G1 G2 G4 |
| PM3 | Booked appointments program | Campaigns that fill the calendar via our booking system | H | unit U2 | SB | G1 G4 |
| PM4 | SMS campaign sprint | Targeted list, copy, A/B test, report; panel cost paid by client | F | 6–12 per sprint | Both | G1 G2 |
| PM5 | Customer club & SMS loyalty | Member signup, coupon codes, monthly campaigns | F + M or H | setup 10–20, then 4–8/month | SB | G1 |
| PM6 | Native ads management | Yektanet & Tapsell; ad spend paid by client | M or H | 8–20 | Both | G1 G2 G4 |
| PM7 | Marketplace management | Divar, Torob, Digikala, Basalam listings and ads | M | 6–15 | SB | G1 |
| PM8 | Win-back & abandoned cart | Recovery sequences for lapsed buyers and carts | F + H | setup 5–12 | SB | G1 |
| PM9 | Monthly marketing management | Several channels run together, one report | M | 15–40 | Both | G1 G2 |
 
## 6 · Visibility & Brand · دیده‌شدن و برند
 
| Code | Service | Includes | Model | Price (M) | Track | Groups |
|---|---|---|---|---|---|---|
| VB1 | Brand basics | Logo, colors, typefaces, one-page guideline | F | 15–40 | Both | All |
| VB2 | SEO foundation | Technical fixes, on-page, Search Console | F | 15–35 | Both | G1 G2 G4 |
| VB3 | Monthly SEO | Content plan, on-page, links, monthly report | M | 15–30 | Both | G1 G2 G4 |
| VB4 | Content writing | SEO articles and service pages | F | 1–3 per article | Both | G1 G2 G4 |
| VB5 | Map listings | Neshan, Balad, Google Maps, review setup | F | 2–5 | SB | G1 G3 G4 |
| VB6 | Instagram profile & strategy | Bio, highlights, content pillars, 30-day plan | F | 5–12 | SB | G1 G3 G4 |
| VB7 | Instagram content with AI video | Posts, stories, reels made with AI video tools | M | 12–35 | SB | G1 G4 |
| VB8 | AI video & ad creative pack | Ad videos and images for one campaign | F | 5–15 per pack | Both | G1 G2 G4 |
| VB9 | Reputation & reviews (new) | Review requests, replies, monitoring | M | 4–8 | SB | G1 G4 |
 
## Group rules (engine filter)
 
| Group | Sees | Never sees | Note |
|---|---|---|---|
| G1 Small business | Everything marked G1 | SY1, SY2, SY5, SY7, SY9, AU5 | Full SB catalog |
| G2 Organization | Everything marked G2 | DS3, DS4, DS6, AU3, PM3, PM5, PM7, PM8, VB5, VB6, VB7, VB9 | Firm prices only for GA2 and GA3; everything else phased ranges after the diagnostic |
| G3 Starting | GA1, GA2, VB1, VB5, VB6, DS1, DS3, DS6, DS10 | Everything else, incl. all H units | Phased plan: launch essentials first, growth after first customers; "readiness score" instead of health score |
| G4 Freelancer | Everything marked G4 | GA5–GA7, SY1, SY2, SY5–SY9, AU3–AU7, DS3, DS5, PM4, PM5, PM7, PM8, PM9 | Booking, brand, maps, verified leads lead the plan. ⚠ Q48 open: Round 2 gave three different G4 lists; this table is the working version |
 
## Cross-sell map
 
"Needed" = the first service does not work without it (wizard pre-ticks and locks it). "Useful" = suggested.
 
| Bought first | Needed with it | Useful next | Usually leads to |
|---|---|---|---|
| GA2 Focused audit | – | GA4, GA6 | The fix it recommends |
| GA3 Full diagnostic | – | GA8 | Any H or S service |
| SY1 Process mapping | SY8 | SY2, AU1 | SY9, AU8 |
| SY3 CRM setup | SY8 | SY4, AU7 | GA7, SY9 |
| SY5 Hiring system | AU1 | U8 applicants | SY2 |
| AU1–AU4 builds | AU8 | AU7 | GA6 |
| AU3 Instagram DM system | AU8 | VB6, VB7 | U6 DM orders |
| DS1 Landing page | Tracking (inside PM1) | DS6 | PM2 |
| DS2 Corporate website | DS10 | VB2, VB5 | VB3 |
| DS3 Online store | DS6, DS10 | AU2, PM8 | PM5, PM6 |
| DS4 Booking system | AU2 | VB5 | PM3 |
| PM1 Lead-gen funnel | – | GA6 | PM2, PM3 |
| PM4 SMS sprint | – | PM5 | PM9 |
| PM6 Native ads | PM1 or a converting page | VB8 | PM9 |
| VB1 Brand basics | – | VB6, DS2 | VB7 |
| VB3 Monthly SEO | VB2 (if not done) | VB4 | GA7 |
| VB7 Instagram content | VB6 (if not done) | AU3 | PM5 |
 
## Bundles (wizard proposals)
 
| Bundle (Persian name TBD) | Contents | Proposed first to |
|---|---|---|
| Get found locally | VB5 + VB6 + DS1 | G1 owner in shops/clinics/salons; G4 any role; G3 |
| Fill the calendar | DS4 + AU2 + PM3 | G1 and G4 in medical, beauty, consulting |
| Sell online | DS3 + DS6 + AU2 + PM8 | G1 owner with store/stock; G3 with products |
| Bring customers back | PM5 + AU2 + U5 | G1 owner or works-for-owner in shops & restaurants |
| Launch kit (new R2) | VB1 + VB5 + DS1 + DS6 | G3, any role |
| Get the house in order | GA3 + SY1 + SY3 + SY8 | G2 owner/CEO, operations (orgs 20–200 staff) |
| Hire without chaos | SY2 + SY5 + U8 | G2 HR |
| Know the numbers (new R2) | GA3 + GA6 + GA7 + AU7 | G2 finance, IT/digital |
| Sales engine (new R2) | PM1 + SY3 + SY4 + PM2 | G2 sales/marketing; G1 owner with a sales team |
 
Roles pick which bundle is proposed **first** (+1 weight); every service the group allows stays available as a toggle.
 
## Counts (for sanity checks)
 
8 GA + 9 SY + 8 AU + 10 DS + 9 PM + 9 VB = **53 services**. 8 outcome units (U1–U8, file 11). 9 bundles.