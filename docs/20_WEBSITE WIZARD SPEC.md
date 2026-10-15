# 20 · Website Wizard & User Flow Spec
 
> **Purpose:** the functional spec of the "Diagnose & Personalize" wizard, the plan page, user groups/roles, the mapping engine, quote display, exits, follow-up and analytics.
> **Read when:** building or changing the wizard, writing wizard copy, debugging plan output, designing follow-up, discussing user groups/roles/permissions.
> **Status:** Round 1 approved (Oct 5) · Round 2 groups/roles proposed (Oct 10) with Claude's review (Oct 11). Items are tagged **[LAUNCH]** (ship by Thu Oct 29 · 7 Aban, D-094) or **[SPRINT-2]** (after launch).
> **Updated:** 2026-10-14 (22 Mehr 1405) — storage/admin references moved from WordPress to the API and `/panel` (D-090, D-093)
 
## 1 · Principles (standing rules)
 
1. **Goals, not menus.** Visitors answer about goals and pains; the engine maps services. Toggles appear only on the plan.
2. **Group, not menu.** The user group sets the catalog filter and exits; the visitor never sees a service list.
3. **Role shapes wording, never price.** Two colleagues from one company get the same quote.
4. **9 screens, one question each, tap-to-answer, < 4 minutes**, progress bar, branches skip irrelevant questions.
5. **Phone gate last:** name + mobile + OTP right before results, blurred score preview behind.
6. **Outcome units appear only with their tracking stack** in the plan.
7. Mobile first; Persian digits, Jalali dates, toman with thousands separators.
## 2 · Users: groups, roles, plan roles, staff roles
 
| Set | Values | Captured | Drives | Ship |
|---|---|---|---|---|
| User group | G1 small business (1–19) · G2 organization (20–200) · G3 starting a business · G4 freelancer/solo professional | Screen 1 | Track, catalog filter, result label, main exit | [LAUNCH] |
| User role | G1: owner, works for owner, partner/spouse · G3: founder · G4: owner (auto) · G2: CEO, operations, sales/marketing, HR, IT/digital, finance | Screen 2 | Default goals, question wording/order, bundle proposed first, follow-up content | [LAUNCH] |
| Plan role | Owner (ran the wizard) · Approver (may accept and pay) · Viewer (read only) | Sign-up, then invites | What the plan page allows | [SPRINT-2] |
| Staff role | Admin (both founders) now; Sales, Delivery, Partner later | Staff users in the API (`/panel`) | What the panel shows | Admin [LAUNCH]; others when first freelancer/partner joins |
 
G1, G3, G4 run on the **small-business track**; G2 on the **organization track**.
 
### Role codes (screen 2)
 
| Group | Code | Shown as (draft EN) | Note |
|---|---|---|---|
| G1 | R-OWN | I am the owner | Default |
| G1 | R-STF | I work for the owner | Accept button → "send to the owner"; invite owner as **approver** |
| G1 | R-PRT | I am the owner's partner or spouse | Invite owner as **approver** (Round 2 said "viewer" — corrected) |
| G3 | R-OWN | I am the founder | Other options hidden; starter wording |
| G4 | R-OWN | (set automatically) | Screen 2 skipped |
| G2 | R-CEO | Owner or CEO | |
| G2 | R-OPS | Operations manager | |
| G2 | R-SAL | Sales or marketing manager | |
| G2 | R-HR | HR manager | |
| G2 | R-IT | IT or digital manager | |
| G2 | R-FIN | Finance manager | Invoice question first on screen 7 |
 
No "other" option: it gives the engine nothing; every default is editable.
 
## 3 · Screens, question by question
 
Screens 1, 2 and 9 are shared; 3–8 follow the track. Role changes wording/defaults on 4–8, never the number of screens.
 
| # | Small-business track (G1, G3, G4) | Organization track (G2) | Input |
|---|---|---|---|
| 1 | Which describes you: I own a small business (1–19 staff) · I manage/work in an organization (20–200) · I am starting a business · I work for myself (doctor, consultant, designer, freelancer) | Same screen; sets group + track | Single, 4 options |
| 2 | Your role (G4 skips; G3 sees founder only) | Your role: CEO · operations · sales/marketing · HR · IT/digital · finance | Single |
| 3 | Industry (13 options; G4 sees professions: medical, legal, consulting, design, education, other) | Industry | Single |
| 4 | Main goal, up to 2; role default pre-selected | Goals, up to 2; pre-selected by role | Multi |
| 5 | Biggest problems, up to 3; options depend on goal | Biggest problems, up to 3; ordered by role | Multi |
| Insight | One line from answers so far, e.g. "Businesses like yours usually lose most customers at follow-up" | Same, organization wording | Info card |
| 6 | What you already have: website, store, booking, Instagram page, map listing, customer list/CRM (G3: what is ready — name, logo, place, products) | Current systems: CRM, accounting (Sepidar, Holoo, Hamkaran, other, none), Excel, messengers | Checklist |
| 7 | Where you sell: in person, phone, Instagram DM, website, marketplaces (G3: where you plan to sell) | People in the decision · official invoice needed · timeline (R-FIN, R-CEO see invoice first) | Checklist / 3 short choices |
| 8 | Budget band, when to start, city. G1: <10M, 10–30M, 30–80M, >80M. G3/G4: <5M, 5–15M, 15–40M, >40M. Start: this month / within 3 months / exploring. City: Tehran / other | Budget: <50M, 50–150M, 150–400M, >400M | 3 short choices / single |
| 9 | Name + mobile + OTP; blurred score preview behind | Name + mobile + OTP + company name; optional "who decides with you?" phone [SPRINT-2] | Phone gate |
 
**Industries (13):** medical & dental · beauty & salons · restaurants & cafés · shops · online stores · schools & training institutes · real estate · professional services (legal, accounting, consulting) · manufacturing & distribution · tourism & hotels · car services · construction & building services · other.
 
**Goals (SB):** more new customers · more repeat customers · sell online · save time · look more professional · know my numbers.
**Goals (Org):** grow sales · less chaos · data for decisions · better hiring · less manual work.
 
**Result label:** SB "health score 62/100" · Org "maturity level 3 of 5" · G3 "readiness score". All from six pillar sub-scores → results show the weakest pillar.
 
## 4 · Role defaults
 
| Group · role | Pre-selected goals | Problems shown first | Wording / bundle |
|---|---|---|---|
| G1 owner | More new customers | Not enough customers, lost in follow-up | "your business" |
| G1 works for owner | Save time | Manual work, support overload | Plan notes owner must accept; invite offered |
| G1 partner/spouse | More new customers | Same as owner | Approver invite for the owner |
| G2 CEO | Grow sales, less chaos | Chaos, no data | Maturity level, phases; "Get the house in order" |
| G2 operations | Less chaos, less manual work | Chaos, manual work, support overload | SOPs and adoption first |
| G2 sales/marketing | Grow sales | Not enough leads, lost in follow-up | "Sales engine" bundle; U1 shown |
| G2 HR | Better hiring | Hiring slow/poor, depends on a few people | "Hire without chaos"; U8 shown |
| G2 IT/digital | Data for decisions, less manual work | Disconnected systems, no numbers | Integrations and BI first |
| G2 finance | Data for decisions | Sales & accounting disconnected | Invoice note on screen 7 and plan; "Know the numbers" |
| G3 any | Look professional, more new customers | Not findable, no brand | "Readiness score"; "Launch kit" |
| G4 owner | More new customers, save time | Empty slots, hard to find online | "Fill the calendar" or "Get found locally" |
 
Defaults live in the `role_defaults` table in the API → tunable without code (in `/panel`, or the reviewed seed file until that screen exists, D-093).
 
## 5 · Mapping engine
 
1. Each answer adds weight to one or more **pain tags**.
2. **Top 3 tags** select core services; each pulls its **needed** complements (catalog cross-sell map).
3. Filters: **group** (service's groups[] must contain visitor's group) [LAUNCH], **industry** (drops irrelevant rows, e.g. booking for manufacturers), **assets owned** (no DS2 if they have a good site).
4. **Role bundle:** services in the role's bundle get **+1 weight** (win ties) [LAUNCH].
5. **Budget fit:** if the plan exceeds the budget band → Phase 1 (within budget) + Phase 2.
6. **Outcome units** only if the plan contains or adds their tracking stack. G3 never gets H units.
7. Result: **3–5 core services + needed complements**.
### Pain-tag table
 
| Pain tag | Comes from answers like | Core services | Outcome unit |
|---|---|---|---|
| Not enough new customers | Goal: more new customers | PM1, PM6, VB5 | U1 or U7 |
| Empty slots and no-shows | Medical, beauty, consulting + booking problems | DS4, AU2, PM3 | U2 |
| Hard to find online | No website or map listing | VB5, DS1 or DS2, VB2 | – |
| Instagram not selling | Sells by DM, has a page | VB6, VB7, AU3 | U6 |
| Customers don't come back | Goal: repeat customers | PM5, AU2 | U5 |
| Store visits but few orders | Has an online store | DS7, PM8, PM6 | U3, U4 |
| Too much manual work | Goal: save time | AU1, AU7, AU8 | – |
| Leads lost in follow-up | Sells by phone/DM, no CRM | SY3, SY4, AU2 | – |
| Don't know my numbers | Goal: know my numbers / data for decisions | GA6, GA7 | – |
| Chaos, depends on a few people | Org goal: less chaos | GA3, SY1, SY2, SY8 | – |
| Hiring is slow or poor | Org goal: better hiring | SY2, SY5 | U8 |
| Support overload | Many repeated questions | AU4, SY6 | – |
| Looks unprofessional | Goal: look professional, no brand | VB1, DS2 | – |
| Sales & accounting disconnected | Uses Sepidar, Holoo or Hamkaran | SY7, AU7 | – |
| Not sure where to start | Few answers, or "exploring" | GA2 or GA3 | – |
 
## 6 · Quote display
 
See `11_PRICING_AND_OUTCOME_MODEL.md §6` for blocks and totals. Extra display rules:
- Toggles: every proposed service can be switched off; needed complements show a lock + reason ("required for the booking system"); totals update live.
- G3/G4 see a smaller "to start" number first.
- R-STF / viewers see totals, but the accept button reads "send to the owner to accept" [SPRINT-2: opens invite].
## 7 · Plan page `/plan/[code]` and exits
 
Shows: score, weakest pillar, plan with toggles, totals, exits.
 
| Exit | Who sees it first | What happens | Ship |
|---|---|---|---|
| Pay the deposit | G1/G4 owners with F and M plans; anyone buying GA2 or GA3 | Zarinpal; OTP again; acceptance = agreement record | [LAUNCH] (switches on when e-Namad arrives) |
| Book a call | Everyone; first for G2 and H/S plans | Booking calendar; Mehdi locks the baseline | [LAUNCH] |
| Download the plan | Everyone; prominent for G2 | Print-ready PDF | [LAUNCH] |
| Invite a decision maker | G2 any role, G1 R-STF, G1 R-PRT | Approver/viewer link by SMS; approver may accept & pay | [SPRINT-2] |
 
- **Plan versions:** Mehdi edits after the call → v2 at the same link, sent by SMS. Read-only share link for partners/managers. Approvers always see the newest version.
- Organizations (until registration): note that formal contracts follow the diagnostic.
## 8 · Accounts & permissions [SPRINT-2]
 
| Requirement | Decision |
|---|---|
| Identity | Mobile number verified by OTP; no password; email optional |
| Creation | Automatically at the wizard phone gate; also via /vorood |
| Stored | name, phone, group, role, company (G2), industry, city, created_at, last_login |
| Session | Signed cookie, 30 days; OTP again to accept or pay |
| Many plans | One account holds several plans; newest first; re-running the wizard creates a new plan linked to the account (Q52 default) |
| Changing group/role | From account page; affects new plans only |
| Deletion | Request from account page; phone and answers erased within 7 days; paid-plan records kept for accounting |
 
**Permissions by plan role** (corrected: owner's accept right depends on user role)
 
| Action | Owner (R-OWN/R-CEO etc.) | Owner (R-STF/R-PRT) | Approver | Viewer | Admin |
|---|---|---|---|---|---|
| Read plan & score | ✓ | ✓ | ✓ | ✓ | ✓ |
| Toggle services | ✓ | ✓ | ✓ | – | ✓ |
| Invite approver/viewer | ✓ | ✓ | – | – | ✓ |
| Accept & pay deposit | ✓ | – (sends to owner) | ✓ | – | – |
| Download PDF | ✓ | ✓ | ✓ | ✓ | ✓ |
| Edit items/prices, publish version | – | – | – | – | ✓ |
 
Safeguards: max 2 invites per plan; invite SMS via transactional pattern, names who invited, one-reply opt-out; OTP limits 3/number/hour and 10/IP/hour.
 
## 9 · Follow-up sequence
 
| When | Channel | G1 & G4 | G2 | G3 |
|---|---|---|---|---|
| Right after OTP | SMS | Link to plan | Link to plan | Link to plan |
| +2 h, no exit chosen | SMS | Weakest pillar + book-a-call link | "Share the plan with your team" (+ invite link in Sprint 2) | "Your launch kit in 3 weeks" + book link |
| +1 day | Call (Mehdi) | Hot = budget band ≥3 and "this month" | Hot = timeline "this quarter" or invoice needed | Hot = budget band ≥3 |
| +3 days, opened not accepted | SMS | Industry objection answer | Role objection: HR → hiring result, finance → ROI note, operations → adoption promise | Starter case, same industry |
| 5 days before month end | SMS | Prices valid until month end | same | same |
| +30 days, no reply | SMS | Case from same industry | Case from similar-size org | Starter case |
 
Promotional SMS need an advertising line and opt-out text («لغو ۱۱»).
 
## 10 · Pipeline stages & analytics
 
**Website pipeline (API, on each plan):** new → contacted → call booked → proposal sent → won → lost (with reason). Each plan carries an owner (staff user).
**CRM (Notion) stages:** ۱. سرنخ جدید → ۲. تماس گرفته شد → ۳. جلسه تشخیص → ۴. پیشنهاد ارسال شد → ۵. مذاکره → ۶. قرارداد بسته شد → ۷. مشتری فعال · از دست رفت · آرشیو.
 
**Analytics events (GA4 + Clarity):** wizard started · each screen completed · group chosen · role chosen · track chosen · phone verified · plan viewed · toggle changed · exit clicked · deposit paid · [SPRINT-2] invite sent · approver verified. Drop-off per screen tells you which question to cut or reword; report drop-off by group and role.
 
## 11 · Known issues to resolve before building Round 2
 
1. G4 catalog appears in three versions (Q48) — working version in file 10.
2. G3 list vs GA4 "All" — resolved: GA4 excluded for G3.
3. DS3 (60–150M) offered to G3 whose top budget band is ">40M" — engine pushes to Phase 2.
4. Plan-owner accept right depends on user role — fixed in §8 table.
5. R-PRT invites owner as viewer — corrected to approver.
6. Effort: Round 2 says "about a day", totals 19 h → plan for 2–3 days + testing.
7. One account row per phone would break per-lead pipeline → keep **pipeline stage on the plan**, not on the account.