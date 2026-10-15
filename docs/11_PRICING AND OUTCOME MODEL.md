# 11 · Pricing & Outcome Model (RaaS)
 
> **Purpose:** how Roiyan prices work: the four models, the outcome fit test, the 8 outcome units, hybrid (H) contract rules, quote structure, deposits, guarantees, inflation rules.
> **Read when:** writing a quote or proposal, deciding if something can be sold "per result", drafting a contract, answering a pricing objection, changing prices.
> **Source of truth for:** pricing logic and rules. Service prices themselves → `10_SERVICE_CATALOG.md`.
> **Status:** approved Oct 5 2026 · **Updated:** 2026-10-11 (19 Mehr 1405)
 
## TL;DR
 
- Headline promise (Persian, risk-based, not "RaaS vs SaaS"): "pay fully only when results arrive" (draft Persian: «فقط وقتی نتیجه گرفتید، کامل پرداخت کنید» — wording not yet approved). "RaaS" stays a brand term, not the main sentence.
- Every service has exactly one model: **F, M, H or S**.
- **H (pay for results)** only when a service passes the **4-condition fit test**. Roughly a third of the catalog qualifies.
- H = **base fee (covers our cost, is the floor) + per-result fee**, **cap = 3× base per month**, **3-month minimum**, **our tracking stack mandatory**, **prepaid credit**, **72-hour dispute window**.
- Client always pays media/third-party costs directly ("your costs"). We never front ad or SMS money.
- Toman prices, fixed per Persian month, "valid until end of [month]", reviewed monthly.
## 1 · The four pricing models
 
| Code | Model (EN / FA) | How it is billed | Wizard/plan shows |
|---|---|---|---|
| F | Fixed project · پروژه ثابت | Deposit, then milestones | One firm price |
| M | Monthly plan · پلن ماهانه | Paid at the start of each month; 3-month minimum where noted | Price per month |
| H | Hybrid outcome · ترکیبی نتیجه‌محور | Base fee + fee per verified result, with floor and cap | Base fee + per-result fee + an example month |
| S | Scoped · محدوده‌ای | Price set after the diagnostic | Range and "from" price |
 
## 2 · The outcome fit test (standing rule)
 
A service may be priced H **only if all four answers are yes**. One "no" → F, M or S.
 
1. Do **we control the lever** that produces the result?
2. Is the result **counted in a system both sides can see** (our form, booking, OTP, gateway)?
3. Is it **hard to dispute** (phone-verified, timestamped, unique)?
4. Does it **arrive within weeks**, not quarters?
**Fails the test:** SEO rankings (months; Google controls), websites and brand (no result unit), systematization (we don't control staff adoption), client sales closed by phone (not countable by us).
 
## 3 · The eight outcome units
 
| Unit | One result = | Proof system | Base (M/month) | Per result | Sold in |
|---|---|---|---|---|---|
| U1 Verified lead | Phone confirmed by OTP, inside service area, meets agreed criteria, not a repeat within 90 days | Our form + lead sheet | 8–15 | 50–300K toman (by industry) | PM2, PM6 |
| U2 Booked appointment | Booked in our booking system and confirmed by SMS | Our booking system | 8–12 | 150–500K toman | PM3 |
| U3 Recovered cart order | Paid within 72 h of our message, via unique link/code | Gateway + store | 3–5 | 5–8% of order value | PM8 |
| U4 New-customer first order | First paid order from a new phone number via our campaign link/code | Gateway + store | 10–20 | 5–10% of order value | PM6, PM9 |
| U5 Redeemed club coupon | Returning customer uses a code we sent, online or in store | Club panel | 4–8 | 20–80K toman | PM5 |
| U6 DM-captured order | Order form completed in our Instagram DM system, phone verified | DM system log | 3–6 | 30–100K toman | AU3 |
| U7 Qualified call | Call >60 s to a tracked number from our ads or map listing | Call-tracking line | 6–10 | 50–200K toman | PM6, VB5 |
| U8 Qualified job applicant | Applicant passes the agreed screening score | Our screening form | 5–8 | 100–300K toman | SY5 |
 
- Per-result fees are **starting points** to calibrate with Mehdi's campaign data.
- **U7 stays OFF** until a call-tracking (virtual number) provider usable in Iran is confirmed.
**Worked example (clinic, U1):** base 10M, 150K per lead, 80 leads → bill = 10 + 12 = **22M**, under the 30M cap. A month with zero qualified leads → pays only the **10M base**, which covers our work.
 
## 4 · Rules that ship with every H contract
 
1. **3-month minimum term** (matches the founders' max unpaid exposure of 3 months).
2. **Tracking stack is ours and mandatory:** forms, booking, OTP, tracked lines, our lead sheet. **No stack → no H pricing** (fall back to F/M).
3. **Base fee** paid at the start of each month; **per-result fees** drawn from a **prepaid credit (wallet)** topped up monthly.
4. **72-hour window** to dispute a result; after that it counts.
5. **Cap** = 3× base per month unless agreed otherwise.
6. **"Your costs"** (ad spend, SMS credit, call-line fees) paid by the client directly.
7. A **written definition of a qualified result** (esp. U1, U8) is agreed **before** the campaign starts.
8. **Force majeure** (internet disruption): pauses targets and billing.
9. GA3 (full diagnostic) is required before any H engagement → it sets the baseline.
## 5 · Iran-specific pricing risks (apply everywhere)
 
| Risk | Why it bites in Iran | Rule |
|---|---|---|
| Inflation | Toman prices erode within months | Every price says «معتبر تا پایان همین ماه»; reprice monthly. Long contracts may index to USD/gold (July blueprint rule) |
| Lead-quality disputes | "These leads were junk" is the easiest way not to pay | Written criteria + 72 h dispute window |
| Late payment | Paying after results invites delay | Prepaid credit consumed per result |
| Media spend | SMS panel / Yektanet costs can sink cash flow | Client pays media directly; never front it |
| Attribution leaks | Many sales close by phone, DM or in store | Count only inside systems we install; if client closes by phone, sell U1/U2, **never a share of their sales** |
| Client-side conversion | We deliver leads, their sales team fails | Price on leads/bookings, never on their sales |
| Internet disruption | Results stop for reasons outside anyone's control | Force-majeure clause |
 
## 6 · Quote structure (plan page and proposals)
 
Four clearly separated blocks so fixed and outcome prices never blur:
 
| Block | Holds | Shown as |
|---|---|---|
| One-time work | F and S items | Firm price for F; "from" + range for S |
| Monthly plans | M items | Price per month + minimum term |
| Pay for results | H items | Base/month + fee per result + example month at a likely volume |
| Your costs | Ad spend, SMS credit, gateway fee, domain | Estimated band, paid to providers directly |
 
- **"To start"** = deposit on one-time work + first month of monthly and base fees.
- **"Typical month after"** = monthly + base + example results.
- Ranges never wider than **±20%**. Validity: **«قیمت‌ها تا پایان [ماه شمسی جاری] معتبر است»**.
- G2 organizations: firm price only for GA2/GA3; everything else phases with ranges.
- G3/G4: show a smaller "to start" number first.
- A **price snapshot** is saved per plan version: a monthly price change never alters a quote already sent.
- **Role shapes wording, never price**: two colleagues from one company get the same quote.
**Worked example (Tehran dental clinic, goal "more patients", budget 30–80M):**
 
| Block | Item | Price (M) |
|---|---|---|
| One-time | DS4 booking system | 40 |
| One-time | AU2 SMS reminders (needed for DS4) | 10 |
| One-time | VB5 map listings | 3 |
| Monthly | DS10 care plan | 4 / month |
| Pay for results | U2 booked appointments | 10 base + 0.3 per booking (≈19 at 30 bookings) |
| Your costs | Native ads budget, SMS credit | ≈15 and 1–2 / month |
 
To start: 26.5 deposit (half of 53) + 14 first month = **40.5M**. Typical month after: **≈23M** + client's own costs.
 
## 7 · Payment terms & deposits
 
| Engagement | Terms |
|---|---|
| Fixed project < ~3 weeks | 50% to start, 50% on delivery |
| Fixed project ≥ ~3 weeks | 40% / 30% / 30% at start, mid-milestone, delivery |
| Monthly plans | Paid at the start of each month |
| H plans | Base at month start; results from prepaid credit; 3-month minimum |
| Diagnostic (GA2) | Paid upfront; **credited** to any project bought within 30 days |
| Full diagnostic (GA3) | Paid upfront; partly credited |
 
- **No work starts without the deposit** (`SOP-SAL-03`).
- Floors: clients resist a bare "minimum fee" but accept a **setup package** they can see (tracking, landing page, form, CRM sheet) → that is the floor for H.
- Fixed projects: no minimum, only a deposit.
## 8 · Guarantees (cheap to keep)
 
1. **Audit refund:** GA2 fee returned if the report finds nothing worth acting on.
2. **Two revision rounds** within agreed scope on fixed projects.
3. **Zero-result months:** outcome plans bill **nothing per result** in a month our tracking shows zero qualified results (base fee still applies).
Who may claim (Round 2): plan **owner** or **approver**.
 
## 9 · Price-change and discount rules
 
- Prices change only in the **monthly review** (first working day of each Persian month), by both founders (`SOP-FIN-01`).
- Any discount **> 20%** = joint decision of both founders (July partnership rule).
- Adjust **scope** to fit a budget rather than lowering rates.
- No fake urgency (countdowns, "spots left") unless real. Month-end validity is the only urgency device.
## 10 · Positioning vs competitors
 
- Open, visible pricing is unusual among Iranian agencies → it is a **trust signal** for cold traffic (competitors can see it too; accepted).
- Iranian SMB owners compare Roiyan with **agencies and freelancers who charge whether or not anything works**, not with SaaS. Sell the reduced risk.
## Pointers
 
- Unit and bundle data model → `21_TECH_ARCHITECTURE.md` (`outcome_unit`, `bundle` content types).
- Contract templates (3 needed: fixed, monthly, hybrid) → `53_LEGAL_AND_COMPLIANCE.md`.
- Objection answers about price → `30_SALES_PLAYBOOK.md`.