import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { toFarsiDigits } from "@/lib/farsiNumerals";
import { formatJalaliLong } from "@/lib/jalali";
import { formatToman, formatTomanWithUnit } from "@/lib/money";
import { PhoneFrame, TodoBar } from "../_parts/PhoneFrame";

// Grey-box wireframe of the plan page /plan/[code] (guide 24 step 3).
// Copy: content/plan.md only. Sample prices: ONLY the worked example in
// docs/11_PRICING AND OUTCOME MODEL.md §6 (Tehran dental clinic), always marked «نمونه».
// Components: DESIGN.md §5 and §7. Totals are computed from the sample rows below with lib/money.ts.
// Throw-away page: not indexed, delete once the real plan page exists.

export const metadata = {
  title: "وایرفریم صفحهٔ پلن",
  robots: { index: false },
};

// ── sample data: file 11 §6 worked example (amounts in toman) ───────────────

const M = 1_000_000;

/** Share of one-time work paid up front. The worked example uses half (26.5 of 53); file 11 §7. */
const DEPOSIT_SHARE = 0.5;
/** Display rule for ranges: never wider than ±20 % (file 11 §6). */
const RANGE = 0.2;

// Persian service names are working translations: the catalog (file 10) has English names only.
type OneTime = { code: string; name: string; price: number; locked?: { for: string } };
const oneTime: OneTime[] = [
  { code: "DS4", name: "سیستم نوبت‌دهی اینترنتی", price: 40 * M },
  { code: "AU2", name: "یادآوری پیامکی", price: 10 * M, locked: { for: "سیستم نوبت‌دهی اینترنتی" } },
  { code: "VB5", name: "ثبت روی نقشه", price: 3 * M },
];
const monthly = [{ code: "DS10", name: "پلن نگهداری سایت", price: 4 * M }];
const outcome = {
  code: "PM3 · U2",
  name: "برنامهٔ جذب نوبت",
  unit: "نوبت تأییدشده",
  base: 10 * M,
  fee: 300_000,
  exampleCount: 30, // «≈19 at 30 bookings» in the worked example
  minMonths: 3,
};
const yourCosts = [
  { name: "بودجهٔ تبلیغات", min: 15 * M, max: 15 * M }, // «≈15» — a single estimate in the example, not a band
  { name: "اعتبار پیامک", min: 1 * M, max: 2 * M },
];

// ── totals (file 11 §6): computed, never typed ───────────────────────────────

function totals(offCodes: string[] = []) {
  const oneTimeSum = oneTime.filter((i) => !offCodes.includes(i.code)).reduce((s, i) => s + i.price, 0);
  const monthlySum = monthly.filter((i) => !offCodes.includes(i.code)).reduce((s, i) => s + i.price, 0);
  const outcomeOn = !offCodes.includes(outcome.code);
  const base = outcomeOn ? outcome.base : 0;
  const exampleResults = outcomeOn ? outcome.fee * outcome.exampleCount : 0;
  return {
    toStart: oneTimeSum * DEPOSIT_SHARE + monthlySum + base, // deposit + first month of monthly + base fees
    typicalMonth: monthlySum + base + exampleResults, // monthly + base + example results (your costs excluded)
  };
}

const full = totals();
// Acceptance check against file 11 §6: to start 40.5M, typical month ≈23M. Fails the build if the sample drifts.
if (full.toStart !== 40.5 * M || full.typicalMonth !== 23 * M) {
  throw new Error(`plan-wire totals drifted from file 11 §6: ${full.toStart} / ${full.typicalMonth}`);
}

const range = (x: number) => ({ min: x * (1 - RANGE), max: x * (1 + RANGE) });
const rangeText = (x: number, perMonth = false) => {
  const r = range(x);
  return `${formatToman(r.min)} تا ${formatToman(r.max)} تومان${perMonth ? " در ماه" : ""}`;
};

// Fixed sample dates (no clock reads in a prerendered page).
const SAMPLE_CREATED = "2026-10-19T09:00:00+03:30";
const SAMPLE_V2 = "2026-10-21T15:00:00+03:30";
const SAMPLE_MONTH = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { month: "long", timeZone: "Asia/Tehran" }).format(
  new Date(SAMPLE_CREATED),
);
const SAMPLE_CODE = "7KQ2M9";

// Score sample (same as the wizard wireframe), «نمونه». Index 2 is the weakest pillar.
const pillars = ["تحلیل رشد", "سیستم‌سازی", "اتوماسیون و هوش مصنوعی", "راهکارهای دیجیتال", "مارکتینگ نتیجه‌محور", "دیده‌شدن و برند"];
const pillarScores = [70, 58, 31, 72, 64, 76];
const WEAKEST = 2;

// ── copy (content/plan.md) ──────────────────────────────────────────────────

const copy = {
  title: "پلن شما",
  validity: `قیمت‌ها تا پایان ${SAMPLE_MONTH} معتبر است.`,
  snapshot: "این پلن با قیمت‌های روزی که ساخته شد ذخیره شده است. اگر قیمت‌ها بعداً عوض شود، این پلن تغییر نمی‌کند.",
  weakestTitle: "ضعیف‌ترین بخش شما",
  blocks: {
    oneTime: { title: "کار یک‌باره", helper: "کار پس از پیش‌پرداخت شروع می‌شود." },
    monthly: { title: "پلن ماهانه", helper: "اول هر ماه پرداخت می‌شود. اگر موردی حداقل مدت دارد، کنارش نوشته شده است." },
    outcome: { title: "پرداخت برای نتیجه", helper: "یک هزینهٔ پایهٔ ماهانه، به‌علاوهٔ مبلغ جدا برای هر نتیجهٔ تأییدشده." },
    costs: { title: "هزینه‌های شما" },
  },
  outcomeExplainer: "هزینهٔ پایه کار ما را پوشش می‌دهد. در ماهی که هیچ نتیجه‌ای ثبت نشود، فقط همین پایه را می‌پردازید.",
  outcomeRules: [
    "مبلغ نتیجه‌ها در هر ماه حداکثر سه برابر هزینهٔ پایه می‌شود.",
    "به هر نتیجه تا ۷۲ ساعت می‌توانید اعتراض کنید؛ بعد از آن شمرده می‌شود.",
    `پیش از شروع، می‌نویسیم یک «${outcome.unit}» دقیقاً یعنی چه.`,
  ],
  exampleLabel: "مثال",
  exampleNote: "این فقط مثالی از روش محاسبه است، نه پیش‌بینی نتیجه.",
  costsLine:
    "هزینه‌هایی مثل بودجهٔ تبلیغات و اعتبار پیامک را مستقیم به ارائه‌دهنده‌ها می‌پردازید و در فاکتور ما نمی‌آید. عددها برآورد است.",
  scopedNote: "قیمت دقیق بعد از تشخیص تعیین می‌شود.",
  toggleOn: "در پلن",
  toggleOff: "بیرون از پلن",
  toStart: "برای شروع",
  toStartHelper: "پیش‌پرداخت کارهای یک‌باره، به‌علاوهٔ ماه اول پلن‌های ماهانه و هزینهٔ پایه",
  typical: "ماه معمول بعد از آن",
  typicalHelper: "پلن‌های ماهانه، هزینهٔ پایه و مبلغ نتیجه‌ها در مثال",
  totalsNote: "هزینه‌های شما در این مجموع‌ها نیست.",
  book: "رزرو تماس",
  download: "دانلود پلن",
  orgContract: "قرارداد رسمی بعد از تشخیص تنظیم می‌شود.",
  orgPrices: "جز خودِ تشخیص، قیمت‌ها پس از آن و به‌صورت بازه تعیین می‌شود.",
  scoreNote: "این امتیاز فقط از روی پاسخ‌های شما حساب شده است. برای تشخیص کامل‌تر، کسب‌وکار شما را دقیق‌تر بررسی می‌کنیم.",
};

const versionLine = (n: number, iso: string, afterCall = false) =>
  afterCall
    ? `نسخهٔ ${toFarsiDigits(n)} — به‌روزشده پس از تماس، ${formatJalaliLong(iso)}`
    : `نسخهٔ ${toFarsiDigits(n)} — ${formatJalaliLong(iso)}`;

// ── drawing parts ────────────────────────────────────────────────────────────

const TOTALS_BAR_H = 144;

function SampleTag() {
  return <span className="inline-flex rounded-full border border-neutral-500 px-2 text-xs leading-6 text-neutral-700">نمونه</span>;
}

function Header({ version }: { version?: ReactNode }) {
  return (
    <header className="flex flex-col gap-1 border-b border-neutral-300 px-4 py-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold leading-10">{copy.title}</h1>
        <SampleTag />
      </div>
      <p dir="ltr" className="text-end font-mono text-xs text-neutral-600">
        roiyan.com/plan/{SAMPLE_CODE}
      </p>
      {version && <div className="text-sm leading-7 text-neutral-700">{version}</div>}
      <p className="text-sm font-medium leading-7">{copy.validity}</p>
    </header>
  );
}

function ScoreCard({ label, score, sentence }: { label: string; score: ReactNode; sentence: string }) {
  return (
    <section className="mx-4 mt-6 flex flex-col gap-4 rounded-[12px] border border-neutral-400 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
        <SampleTag />
      </div>
      <p className="text-5xl font-black leading-[1.3]">{score}</p>
      <div className="flex flex-col gap-2">
        {pillars.map((p, i) => {
          const weak = i === WEAKEST;
          return (
            <div key={p} className={`flex flex-col gap-1 rounded-[8px] px-2 py-1 ${weak ? "border-2 border-neutral-900 bg-neutral-100" : ""}`}>
              <span className={`text-sm leading-6 ${weak ? "font-bold" : ""}`}>
                {p} — {toFarsiDigits(pillarScores[i])} از ۱۰۰
              </span>
              <span className="h-2 rounded-full bg-neutral-200">
                <span className={`block h-full rounded-full ${weak ? "bg-neutral-900" : "bg-neutral-500"}`} style={{ width: `${pillarScores[i]}%` }} />
              </span>
            </div>
          );
        })}
      </div>
      <div>
        <h2 className="text-base font-bold leading-8">{copy.weakestTitle}</h2>
        <p className="text-sm leading-7">{sentence}</p>
      </div>
    </section>
  );
}

function Block({ title, helper, children }: { title: string; helper?: string; children: ReactNode }) {
  return (
    <section className="mx-4 mt-8 flex flex-col gap-3">
      <div>
        <h2 className="text-lg font-bold leading-8">{title}</h2>
        {helper && <p className="text-sm leading-7 text-neutral-600">{helper}</p>}
      </div>
      <div className="flex flex-col divide-y divide-neutral-300 rounded-[12px] border border-neutral-400">{children}</div>
    </section>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span className="flex min-h-11 shrink-0 items-center gap-2 text-xs">
      <span
        aria-hidden
        className={`relative h-6 w-11 rounded-full border-2 border-neutral-800 ${on ? "bg-neutral-800" : "bg-white"}`}
      >
        <span className={`absolute top-0.5 size-4 rounded-full ${on ? "start-0.5 bg-white" : "end-0.5 bg-neutral-800"}`} />
      </span>
      {on ? copy.toggleOn : copy.toggleOff}
    </span>
  );
}

/** Outcome line: from the catalog via the API; not written yet, so a grey bar (content/plan.md §5). */
function OutcomeLine() {
  return <TodoBar className="w-44" />;
}

function ItemRow({
  name,
  price,
  sub,
  on = true,
  right,
}: {
  name: string;
  price: ReactNode;
  sub?: string;
  on?: boolean;
  right?: ReactNode;
}) {
  return (
    <div className={`flex items-start justify-between gap-3 p-4 ${on ? "" : "text-neutral-400"}`}>
      <div className="flex min-w-0 flex-col gap-1.5">
        <span className={`text-base font-bold leading-7 ${on ? "" : "line-through"}`}>{name}</span>
        <OutcomeLine />
        <span className="text-sm font-medium leading-7">{price}</span>
        {sub && <span className="text-xs leading-6 text-neutral-600">{sub}</span>}
      </div>
      {right ?? <Toggle on={on} />}
    </div>
  );
}

/** Locked complement: lock + reason. The reason opens on tap (details/summary), never on hover. */
function LockedRow({ item, price, open = false }: { item: OneTime; price: ReactNode; open?: boolean }) {
  const parent = item.locked!.for;
  return (
    <div className="flex flex-col gap-1.5 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="text-base font-bold leading-7">{item.name}</span>
          <OutcomeLine />
          <span className="text-sm font-medium leading-7">{price}</span>
        </div>
      </div>
      <details open={open} className="group">
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-[10px] border border-dashed border-neutral-600 px-3 text-sm font-medium">
          <Lock aria-hidden className="size-4 shrink-0" strokeWidth={2.25} />
          لازم برای {parent}
        </summary>
        <p className="mt-2 rounded-[10px] bg-neutral-100 p-3 text-sm leading-7">
          {parent} بدون این خدمت کار نمی‌کند. اگر {parent} را از پلن بردارید، این یکی را هم می‌توانید بردارید.
        </p>
      </details>
    </div>
  );
}

function OneTimeBlock({ off = [], lockOpen = false, ranged = false }: { off?: string[]; lockOpen?: boolean; ranged?: boolean }) {
  const priceOf = (i: OneTime) => (ranged ? rangeText(i.price) : formatTomanWithUnit(i.price));
  return (
    <Block {...copy.blocks.oneTime}>
      {ranged && (
        <ItemRow
          name="تشخیص کامل کسب‌وکار"
          price={
            <>
              <TodoBar className="w-24" /> تومان
            </>
          }
          right={<span />}
        />
      )}
      {oneTime.map((i) =>
        i.locked ? (
          <LockedRow key={i.code} item={i} price={priceOf(i)} open={lockOpen} />
        ) : (
          <ItemRow key={i.code} name={i.name} price={priceOf(i)} sub={ranged ? copy.scopedNote : undefined} on={!off.includes(i.code)} />
        ),
      )}
    </Block>
  );
}

function MonthlyBlock({ ranged = false }: { ranged?: boolean }) {
  return (
    <Block {...copy.blocks.monthly}>
      {monthly.map((i) => (
        <ItemRow key={i.code} name={i.name} price={ranged ? rangeText(i.price, true) : `${formatTomanWithUnit(i.price)} در ماه`} />
      ))}
    </Block>
  );
}

function OutcomeBlock() {
  const results = outcome.fee * outcome.exampleCount;
  const total = outcome.base + results;
  return (
    <Block {...copy.blocks.outcome}>
      <div className="flex flex-col gap-2 bg-neutral-100 p-4">
        <p className="text-sm font-medium leading-7">{copy.outcomeExplainer}</p>
        <ul className="flex list-disc flex-col gap-1 ps-5 text-xs leading-6 text-neutral-700">
          {copy.outcomeRules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
      <ItemRow
        name={outcome.name}
        price={
          <span className="flex flex-col">
            <span>پایهٔ ماهانه: {formatTomanWithUnit(outcome.base)}</span>
            <span>
              هر {outcome.unit}: {formatTomanWithUnit(outcome.fee)}
            </span>
          </span>
        }
        sub={`حداقل ${toFarsiDigits(outcome.minMonths)} ماه`}
      />
      <div className="flex flex-col gap-1 p-4">
        <span className="w-fit rounded-[6px] border border-neutral-700 px-2 text-xs font-bold leading-6">{copy.exampleLabel}</span>
        <p className="text-sm leading-7">
          اگر در یک ماه {toFarsiDigits(outcome.exampleCount)} {outcome.unit} ثبت شود: {formatToman(outcome.base)} پایه +{" "}
          {formatToman(results)} برای نتیجه‌ها = {formatTomanWithUnit(total)}.
        </p>
        <p className="text-xs leading-6 text-neutral-600">{copy.exampleNote}</p>
      </div>
    </Block>
  );
}

function CostsBlock() {
  return (
    <Block title={copy.blocks.costs.title} helper={copy.costsLine}>
      {yourCosts.map((c) => (
        <div key={c.name} className="flex flex-col gap-1 p-4">
          <span className="text-base font-bold leading-7">{c.name}</span>
          <span className="text-sm leading-7">
            {c.min === c.max
              ? `حدود ${formatTomanWithUnit(c.min)} در ماه`
              : `حدود ${formatToman(c.min)} تا ${formatToman(c.max)} تومان در ماه`}
          </span>
        </div>
      ))}
    </Block>
  );
}

function Amount({ value, ranged }: { value: number; ranged?: boolean }) {
  if (!ranged) return <>{formatTomanWithUnit(value)}</>;
  const r = range(value);
  return (
    <>
      {formatToman(r.min)} تا {formatToman(r.max)} تومان
    </>
  );
}

/** Totals bar content: «برای شروع» + «ماه معمول بعد از آن» + the primary «رزرو تماس». */
function TotalsBar({
  t,
  startFirst = false,
  ranged = false,
}: {
  t: { toStart: number; typicalMonth: number };
  startFirst?: boolean;
  ranged?: boolean;
}) {
  return (
    <div className="flex h-full flex-col justify-between gap-2">
      {startFirst ? (
        <div className="flex items-end justify-between gap-3">
          <span className="flex flex-col">
            <span className="text-xs text-neutral-600">{copy.toStart}</span>
            <span className="text-xl font-black leading-8">
              <Amount value={t.toStart} ranged={ranged} />
            </span>
          </span>
          <span className="flex flex-col text-end">
            <span className="text-[11px] text-neutral-500">{copy.typical}</span>
            <span className="text-xs font-medium leading-6 text-neutral-600">
              <Amount value={t.typicalMonth} ranged={ranged} />
            </span>
          </span>
        </div>
      ) : ranged ? (
        <div className="flex flex-col gap-1">
          {[
            [copy.toStart, t.toStart],
            [copy.typical, t.typicalMonth],
          ].map(([label, value]) => (
            <span key={label as string} className="flex items-baseline justify-between gap-2">
              <span className="text-xs text-neutral-600">{label}</span>
              <span className="text-sm font-bold leading-6">
                <Amount value={value as number} ranged />
              </span>
            </span>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {[
            [copy.toStart, t.toStart],
            [copy.typical, t.typicalMonth],
          ].map(([label, value]) => (
            <span key={label as string} className="flex flex-col">
              <span className="text-xs text-neutral-600">{label}</span>
              <span className="text-base font-bold leading-7">
                <Amount value={value as number} />
              </span>
            </span>
          ))}
        </div>
      )}
      <button type="button" className="h-12 w-full rounded-[10px] bg-neutral-800 text-base font-bold text-white">
        {copy.book}
      </button>
    </div>
  );
}

function TotalsSection({ t }: { t: { toStart: number; typicalMonth: number } }) {
  return (
    <section className="mx-4 mt-8 flex flex-col gap-3 rounded-[12px] border-2 border-neutral-800 p-4">
      {[
        [copy.toStart, copy.toStartHelper, t.toStart],
        [copy.typical, copy.typicalHelper, t.typicalMonth],
      ].map(([label, helper, value]) => (
        <div key={label as string} className="flex flex-col">
          <span className="text-sm font-bold">{label}</span>
          <span className="text-2xl font-black leading-10">{formatTomanWithUnit(value as number)}</span>
          <span className="text-xs leading-6 text-neutral-600">{helper}</span>
        </div>
      ))}
      <p className="border-t border-neutral-300 pt-2 text-xs leading-6">{copy.totalsNote}</p>
    </section>
  );
}

function Exits() {
  return (
    <section className="mx-4 mt-8 flex flex-col gap-3">
      <button type="button" className="h-12 w-full rounded-[10px] bg-neutral-800 text-base font-bold text-white">
        {copy.book}
      </button>
      <button type="button" className="h-12 w-full rounded-[10px] border-2 border-neutral-800 text-base font-bold">
        {copy.download}
      </button>
      <p className="text-xs leading-6 text-neutral-600">{copy.snapshot}</p>
    </section>
  );
}

function Label({ title, note }: { title: string; note?: string }) {
  return (
    <p dir="ltr" lang="en" className="w-[375px] font-mono text-xs leading-5 text-neutral-700">
      <span className="font-bold text-neutral-900">{title}</span>
      {note && <span className="block text-neutral-600">{note}</span>}
    </p>
  );
}

// ── page ─────────────────────────────────────────────────────────────────────

export default function PlanWireframe() {
  const vb5Off = totals(["VB5"]);
  const g1Score = <>۶۲ <span className="text-xl font-medium">از ۱۰۰</span></>;
  const g1Weakest = `بر پایهٔ پاسخ‌های شما، ضعیف‌ترین بخش کسب‌وکارتان «${pillars[WEAKEST]}» است.`;

  return (
    <main className="min-h-screen bg-neutral-200 px-4 py-10">
      <div className="mx-auto flex w-fit flex-col gap-12">
        {/* ── Main view: one 375 px column, full length, real sticky totals bar ── */}
        <div className="flex flex-col gap-2">
          <Label
            title="Main view · G1 owner · full page (scrolls) · sticky totals bar"
            note="Sample = file 11 §6 Tehran dental clinic only; deposit = half of one-time work, as in that example. Service names are working Persian translations (catalog is English). Outcome lines are [TODO] grey bars. Score ۶۲ reuses the wizard wireframe sample."
          />
          <div dir="rtl" lang="fa" className="relative w-[375px] border border-neutral-500 bg-white text-neutral-900">
            <Header version={versionLine(1, SAMPLE_CREATED)} />
            <ScoreCard label="امتیاز سلامت کسب‌وکار" score={g1Score} sentence={g1Weakest} />
            <p className="mx-4 mt-2 text-xs leading-6 text-neutral-600">{copy.scoreNote}</p>
            <OneTimeBlock />
            <MonthlyBlock />
            <OutcomeBlock />
            <CostsBlock />
            <TotalsSection t={full} />
            <Exits />
            {/* spacer so the sticky bar never covers the last item */}
            <div aria-hidden className="h-6" />
            <div className="sticky bottom-0 z-10 border-t border-neutral-400 bg-white p-4" style={{ height: TOTALS_BAR_H }}>
              <TotalsBar t={full} />
            </div>
          </div>
        </div>

        <h2 dir="ltr" lang="en" className="border-t border-neutral-400 pt-6 font-mono text-sm font-bold text-neutral-800">
          States · 375 × 667 frames
        </h2>

        {/* 1 · optional item off, totals changed */}
        <PhoneFrame
          label="1 · G1 · optional item toggled off"
          note={`«ثبت روی نقشه» off → to start ${vb5Off.toStart / M}M (was ${full.toStart / M}M); typical month unchanged.`}
          bar={<TotalsBar t={vb5Off} />}
          barHeight={TOTALS_BAR_H}
        >
          <OneTimeBlock off={["VB5"]} />
        </PhoneFrame>

        {/* 2 · locked complement reason open */}
        <PhoneFrame
          label="2 · G1 · locked complement, reason open"
          note="Opened by tapping the lock row (details/summary); nothing on hover."
          bar={<TotalsBar t={full} />}
          barHeight={TOTALS_BAR_H}
        >
          <OneTimeBlock lockOpen />
        </PhoneFrame>

        {/* 3 · organization */}
        <PhoneFrame
          label="3 · G2 organization"
          note="Maturity instead of health score; firm price only for the diagnostic (its price is not in the worked example: grey bar, not in totals); everything else ±20 % ranges; «دانلود پلن» moved up. Same clinic sample, for layout only."
          bar={<TotalsBar t={full} ranged />}
          barHeight={TOTALS_BAR_H}
        >
          <Header version={versionLine(1, SAMPLE_CREATED)} />
          <section className="mx-4 mt-6 flex flex-col gap-2 rounded-[12px] border border-neutral-400 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-700">سطح بلوغ سازمان</span>
              <SampleTag />
            </div>
            <p className="text-3xl font-black leading-[1.5]">سطح ۳ از ۵ — تعریف‌شده</p>
            <p className="text-sm leading-7">سطح بلوغ سازمانتان ۳ از ۵ است (تعریف‌شده).</p>
          </section>
          <section className="mx-4 mt-4 flex flex-col gap-2 rounded-[12px] bg-neutral-100 p-4 text-sm leading-7">
            <p className="font-bold">{copy.orgContract}</p>
            <p>{copy.orgPrices}</p>
          </section>
          <div className="mx-4 mt-4">
            <button type="button" className="h-12 w-full rounded-[10px] border-2 border-neutral-800 text-base font-bold">
              {copy.download}
            </button>
          </div>
          <OneTimeBlock ranged />
          <MonthlyBlock ranged />
        </PhoneFrame>

        {/* 4 · G3/G4 */}
        <PhoneFrame
          label="4 · G4 solo professional (G3 alike)"
          note="«برای شروع» first and larger, typical month small. G3 would show «امتیاز آمادگی» and no pay-for-results block (spec §5.6). A smaller phase-1 number needs engine phasing: not in the sample."
          bar={<TotalsBar t={full} startFirst />}
          barHeight={TOTALS_BAR_H}
        >
          <Header version={versionLine(1, SAMPLE_CREATED)} />
          <ScoreCard label="امتیاز سلامت کسب‌وکار" score={g1Score} sentence={`بر پایهٔ پاسخ‌های شما، ضعیف‌ترین بخش کارتان «${pillars[WEAKEST]}» است.`} />
        </PhoneFrame>

        {/* 5 · version 2 after the call */}
        <PhoneFrame
          label="5 · G1 · plan version 2 after the call"
          note="Same link; version banner on top. Sample date. The SMS that announces v2 is not part of this page."
          bar={<TotalsBar t={full} />}
          barHeight={TOTALS_BAR_H}
        >
          <div className="border-b-2 border-neutral-800 bg-neutral-100 px-4 py-3 text-sm font-bold leading-7">
            {versionLine(2, SAMPLE_V2, true)}
          </div>
          <Header />
          <p className="mx-4 mt-4 text-xs leading-6 text-neutral-600">{copy.snapshot}</p>
          <OneTimeBlock />
        </PhoneFrame>
      </div>
    </main>
  );
}
