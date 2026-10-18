import type { ReactNode } from "react";
import { toFarsiDigits } from "@/lib/farsiNumerals";
import { BarButton, PhoneFrame, TodoBar } from "../_parts/PhoneFrame";
import { ChoiceGroup, Chip, Notice, OptionRow, WizardShell } from "../_parts/WizardShell";

// Grey-box wireframe of every wizard screen (guide 24 step 3), one 375 × 667 frame per screen.
// Copy: content/wizard.md only. Screens/limits/tracks: docs/20_WEBSITE WIZARD SPEC.md §1–§3.
// Components: DESIGN.md §5 and §7. [TODO] text = grey bars. Sample numbers carry «نمونه».
// Throw-away page: not indexed, delete once the real wizard exists.

export const metadata = {
  title: "وایرفریم ویزارد",
  robots: { index: false },
};

// ── copy (content/wizard.md) ────────────────────────────────────────────────

const LIMIT_REACHED = "به سقف رسیده‌اید. برای انتخاب مورد دیگر، یکی را بردارید.";
const BUILD_PLAN = "ساخت پلن من";

const groups = [
  { label: "صاحب کسب‌وکار کوچک هستم", hint: "۱ تا ۱۹ نفر کارکنان" },
  { label: "مدیر یا کارمند سازمان هستم", hint: "۲۰ تا ۲۰۰ نفر کارکنان" },
  { label: "در حال راه‌اندازی کسب‌وکارم", hint: "ایده دارم یا تازه شروع کرده‌ام" },
  { label: "برای خودم کار می‌کنم", hint: "پزشک، مشاور، طراح، فریلنسر" },
];

const rolesSB = ["صاحب کسب‌وکار هستم", "برای صاحب کسب‌وکار کار می‌کنم", "همسر یا شریک صاحب کسب‌وکار هستم"];
const rolesOrg = [
  "مالک یا مدیرعامل",
  "مدیر عملیات",
  "مدیر فروش یا بازاریابی",
  "مدیر منابع انسانی",
  "مدیر فناوری یا دیجیتال",
  "مدیر مالی",
];

const industries: { label: string; hint?: string }[] = [
  { label: "پزشکی و دندانپزشکی" },
  { label: "زیبایی و آرایشگاه" },
  { label: "رستوران و کافه" },
  { label: "فروشگاه" },
  { label: "فروشگاه اینترنتی" },
  { label: "مدرسه و آموزشگاه" },
  { label: "املاک" },
  { label: "خدمات حرفه‌ای", hint: "حقوقی، حسابداری، مشاوره" },
  { label: "تولید و پخش" },
  { label: "گردشگری و هتل" },
  { label: "خدمات خودرو" },
  { label: "ساختمان و خدمات ساختمانی" },
  { label: "سایر" },
];

const professions = ["پزشکی و درمان", "حقوقی", "مشاوره", "طراحی", "آموزش", "سایر"];

const goalsSB: { label: string; hint?: string }[] = [
  { label: "مشتری جدید بیشتر" },
  { label: "مشتری تکراری بیشتر" },
  { label: "فروش اینترنتی" },
  { label: "صرفه‌جویی در زمان" },
  { label: "حرفه‌ای‌تر دیده شدن" },
  { label: "شناخت اعداد کسب‌وکار", hint: "عددهای کسب‌وکارم را بدانم" },
];
const goalsOrg = ["رشد فروش", "نظم بیشتر، آشفتگی کمتر", "داده برای تصمیم‌گیری", "استخدام بهتر", "کار دستی کمتر"];
const PREFILL_NOTE = "بر اساس نقش شما، یک مورد را از قبل انتخاب کرده‌ایم. می‌توانید عوضش کنید.";
const ROLE_ORDER_NOTE = "مشکل‌هایی که برای نقش شما رایج‌ترند، اول آمده‌اند.";

// Problems, already in G1-owner order: role's first problems, then the rest, «نمی‌دانم…» last.
const problemsSB_G1owner: { label: string; hint?: string }[] = [
  { label: "مشتری جدید کافی نیست" },
  { label: "سرنخ‌ها در پیگیری گم می‌شوند" },
  { label: "نوبت خالی یا غیبت مشتری" },
  { label: "در اینترنت پیدا نمی‌شوم" },
  { label: "اینستاگرام فروش نمی‌آورد" },
  { label: "مشتری‌ها برنمی‌گردند" },
  { label: "بازدید هست، سفارش کم است", hint: "برای فروشگاه اینترنتی" },
  { label: "کار دستی خیلی زیاد است" },
  { label: "اعداد کسب‌وکار را نمی‌دانم" },
  { label: "پاسخ به سؤال‌های تکراری وقت می‌گیرد" },
  { label: "حرفه‌ای دیده نمی‌شوم" },
  { label: "نمی‌دانم از کجا شروع کنم" },
];

// Org problems in R-CEO order (بی‌نظمی · نبود داده first).
const problemsOrg_CEO: { label: string; hint?: string }[] = [
  { label: "کارها بی‌نظم است" },
  { label: "برای تصمیم‌گیری عدد نداریم" },
  { label: "کار به چند نفر وابسته است" },
  { label: "استخدام کند یا ضعیف است" },
  { label: "سیستم‌ها به هم وصل نیستند" },
  { label: "فروش و حسابداری جدا هستند", hint: "سپیدار، هلو، همکاران‌سیستم" },
  { label: "کار دستی خیلی زیاد است" },
  { label: "پشتیبانی شلوغ است" },
  { label: "سرنخ فروش کافی نیست" },
  { label: "سرنخ‌ها در پیگیری گم می‌شوند" },
  { label: "نمی‌دانم از کجا شروع کنم" },
];

const haveSB: { label: string; hint?: string }[] = [
  { label: "وب‌سایت" },
  { label: "فروشگاه اینترنتی" },
  { label: "سیستم نوبت‌دهی" },
  { label: "صفحهٔ اینستاگرام" },
  { label: "ثبت روی نقشه", hint: "نشان، بلد، گوگل‌مپ" },
  { label: "فهرست مشتریان یا CRM" },
];
const readyG3 = ["نام کسب‌وکار", "لوگو", "مکان کار", "محصولات یا خدمات"];
const systemsOrg = ["CRM", "اکسل", "پیام‌رسان‌ها"];

const sellSB: { label: string; hint?: string }[] = [
  { label: "حضوری" },
  { label: "تلفنی" },
  { label: "دایرکت اینستاگرام" },
  { label: "وب‌سایت" },
  { label: "بازارچه‌های اینترنتی", hint: "دیوار، ترب، دیجی‌کالا، باسلام" },
];

const BUDGET_Q = "برای شروع، چه بودجه‌ای در نظر دارید؟";
const BUDGET_HINT =
  "این عدد فقط برای تقسیم پلن به فاز است. اگر پلن از بودجه بیشتر شد، فاز ۱ را در حد بودجه می‌نویسیم و بقیه را به فاز ۲ می‌بریم.";
const budgetG1 = ["کمتر از ۱۰ میلیون تومان", "۱۰ تا ۳۰ میلیون تومان", "۳۰ تا ۸۰ میلیون تومان", "بیشتر از ۸۰ میلیون تومان"];
const budgetG3G4 = ["کمتر از ۵ میلیون تومان", "۵ تا ۱۵ میلیون تومان", "۱۵ تا ۴۰ میلیون تومان", "بیشتر از ۴۰ میلیون تومان"];
const budgetOrg = ["کمتر از ۵۰ میلیون تومان", "۵۰ تا ۱۵۰ میلیون تومان", "۱۵۰ تا ۴۰۰ میلیون تومان", "بیشتر از ۴۰۰ میلیون تومان"];
const START_Q = "چه زمانی می‌خواهید شروع کنید؟";
const startOptions = ["همین ماه", "تا ۳ ماه دیگر", "فقط بررسی می‌کنم"];
const CITY_Q = "کسب‌وکار شما در کدام شهر است؟";
const cityOptions = ["تهران", "شهر دیگر"];

const pillars = [
  "تحلیل رشد",
  "سیستم‌سازی",
  "اتوماسیون و هوش مصنوعی",
  "راهکارهای دیجیتال",
  "مارکتینگ نتیجه‌محور",
  "دیده‌شدن و برند",
];
// Sample sub-scores for the wireframe only (shown with «نمونه»); index 2 is the weakest.
const samplePillarScores = [70, 58, 31, 72, 64, 76];

const SAMPLE_PHONE = "۰۹۱۲۳۴۵۶۷۸۹";

// ── small drawing helpers ────────────────────────────────────────────────────

function Stack({ children, gap = "gap-3" }: { children: ReactNode; gap?: string }) {
  return <div className={`flex flex-col ${gap}`}>{children}</div>;
}

function SampleTag() {
  return (
    <span className="inline-flex rounded-full border border-neutral-500 px-2 text-xs leading-6 text-neutral-700">نمونه</span>
  );
}

function InsightCard({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 rounded-[12px] border border-neutral-400 bg-neutral-100 p-6">
      <p className="text-lg font-medium leading-9">{children}</p>
    </div>
  );
}

function Field({ label, placeholder, value, focused = false }: { label: string; placeholder?: string; value?: string; focused?: boolean }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium">{label}</span>
      <span
        className={`flex h-12 items-center rounded-[10px] bg-white px-3 text-base ${
          focused ? "border-2 border-neutral-900" : "border border-neutral-500"
        }`}
      >
        {value ? (
          <span dir="ltr" className="w-full text-end">
            {value}
          </span>
        ) : (
          <span className="text-neutral-400">{placeholder}</span>
        )}
      </span>
    </label>
  );
}

/** Blurred, unreadable score preview behind the phone gate (DESIGN.md §7). */
function BlurredPreview() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-4 top-24 blur-[3px]">
      <div className="flex flex-col gap-3 rounded-[12px] border border-neutral-300 p-4 opacity-70">
        <div className="h-12 w-24 rounded bg-neutral-300" />
        {[80, 60, 35, 70, 55, 75].map((w, i) => (
          <div key={i} className="h-2.5 rounded-full bg-neutral-300" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

function PhoneGate({ org = false, keyboard = false }: { org?: boolean; keyboard?: boolean }) {
  return (
    <div className="relative">
      <BlurredPreview />
      <div className="relative flex flex-col gap-4 rounded-[12px] border border-neutral-400 bg-white/90 p-4">
        <h2 className="text-xl font-bold leading-9">پلن شما آماده است</h2>
        <p className="-mt-2 text-sm leading-7 text-neutral-700">برای دیدن امتیاز و پلن، نام و شمارهٔ موبایل‌تان را وارد کنید.</p>
        <Field label="نام" />
        {org && <Field label="نام شرکت یا سازمان" />}
        <Field label="شمارهٔ موبایل" placeholder={SAMPLE_PHONE} value={keyboard ? "۰۹۱۲" : undefined} focused={keyboard} />
        <p className="text-xs leading-6 text-neutral-600">
          شمارهٔ شما برای تأیید اینکه خودتان هستید و نگه‌داشتن پلن لازم است تا بعداً به آن برگردید. همکار ما برای توضیح پلن با شما تماس
          می‌گیرد و لینک پلن را پیامک می‌کنیم.{" "}
          <a href="/harim" className="inline-flex min-h-11 items-center font-medium text-neutral-900 underline underline-offset-4">
            حریم خصوصی
          </a>
        </p>
      </div>
    </div>
  );
}

function OtpBoxes({ error = false }: { error?: boolean }) {
  return (
    <div dir="ltr" className="flex justify-between gap-2">
      {Array.from({ length: 6 }, (_, i) => (
        <span
          key={i}
          className={`flex h-14 w-12 items-center justify-center rounded-[10px] text-xl font-bold ${
            error ? "border-2 border-dashed border-neutral-900" : "border border-neutral-500"
          }`}
        >
          {error ? toFarsiDigits([4, 8, 1, 5, 2, 9][i]) : ""}
        </span>
      ))}
    </div>
  );
}

function OtpScreen({ error = false }: { error?: boolean }) {
  return (
    <Stack gap="gap-4">
      <h2 className="text-xl font-bold leading-9">کد تأیید را وارد کنید</h2>
      <p className="-mt-2 text-sm leading-7 text-neutral-700">
        کد به شمارهٔ <bdi dir="ltr">{SAMPLE_PHONE}</bdi> پیامک شد.
      </p>
      <OtpBoxes error={error} />
      {error && (
        <Notice>
          <span className="block text-xs text-neutral-600">پیام خطای کد اشتباه از API (به فارسی):</span>
          <TodoBar className="mt-1 w-56" />
        </Notice>
      )}
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-neutral-600">ارسال دوباره کد تا {toFarsiDigits(120)} ثانیه دیگر</span>
        <a href="#" className="inline-flex min-h-11 items-center font-medium underline underline-offset-4">
          ویرایش شماره
        </a>
      </div>
    </Stack>
  );
}

function PillarBars({ weakest = 2 }: { weakest?: number }) {
  return (
    <Stack gap="gap-2.5">
      {pillars.map((p, i) => {
        const weak = i === weakest;
        return (
          <div
            key={p}
            className={`flex flex-col gap-1 rounded-[8px] px-2 py-1.5 ${weak ? "border-2 border-neutral-900 bg-neutral-100" : ""}`}
          >
            <span className={`text-sm leading-6 ${weak ? "font-bold" : ""}`}>
              {p} — {toFarsiDigits(samplePillarScores[i])} از ۱۰۰
            </span>
            <span className="h-2 rounded-full bg-neutral-200">
              <span
                className={`block h-full rounded-full ${weak ? "bg-neutral-900" : "bg-neutral-500"}`}
                style={{ width: `${samplePillarScores[i]}%` }}
              />
            </span>
          </div>
        );
      })}
    </Stack>
  );
}

function ResultScreen({ label, score, children }: { label: string; score: ReactNode; children?: ReactNode }) {
  return (
    <Stack gap="gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
        <SampleTag />
      </div>
      <p className="text-5xl font-black leading-[1.3]">{score}</p>
      {children}
      <p className="text-sm leading-7 text-neutral-700">
        این امتیاز فقط از روی پاسخ‌های شما حساب شده است. برای تشخیص کامل‌تر، کسب‌وکار شما را دقیق‌تر بررسی می‌کنیم.
      </p>
      <div>
        <h3 className="text-base font-bold leading-8">ضعیف‌ترین بخش شما</h3>
        <p className="text-sm leading-7 text-neutral-600">اول از اینجا شروع می‌کنیم.</p>
      </div>
      <PillarBars />
    </Stack>
  );
}

/** Results and loading frames have no wizard top bar (they come after the gate). */
function ResultFrame({ label, note, children, button = true }: { label: string; note?: string; children: ReactNode; button?: boolean }) {
  return (
    <PhoneFrame
      label={label}
      note={note}
      bar={
        button ? (
          <BarButton enabled>
            <TodoBar className="w-32" dark />
          </BarButton>
        ) : undefined
      }
    >
      <div className="px-4 pt-6">{children}</div>
    </PhoneFrame>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 dir="ltr" lang="en" className="mt-8 border-t border-neutral-400 pt-6 font-mono text-sm font-bold text-neutral-800 first:mt-0 first:border-0 first:pt-0">
      {children}
    </h2>
  );
}

// ── page ─────────────────────────────────────────────────────────────────────

export default function WizardWireframe() {
  return (
    <main className="min-h-screen bg-neutral-200 px-4 py-10">
      <div className="mx-auto flex w-fit flex-col gap-12">
        <header dir="ltr" lang="en" className="max-w-[375px] font-mono text-xs leading-5 text-neutral-700">
          <p className="font-bold text-neutral-900">Wizard wireframe · every screen · 375 × 667</p>
          <p>Dashed line = the phone viewport. Anything below it needs scrolling. Copy: content/wizard.md. Grey bars = [TODO] text.</p>
        </header>

        {/* ── A · Shared ── */}
        <SectionTitle>A · Shared screens</SectionTitle>

        <WizardShell
          label="1 · shared · all groups"
          note="Group not known yet: total shown as ۹ (G3/G4 switch to ۸ from the next screen)."
          step={1}
          total={9}
          question="کدام توصیف به شما نزدیک‌تر است؟"
          hint="این پاسخ فقط برای تنظیم سؤال‌های بعدی است."
          enabled={false}
        >
          <Stack>
            {groups.map((g) => (
              <OptionRow key={g.label} label={g.label} hint={g.hint} />
            ))}
          </Stack>
        </WizardShell>

        <WizardShell label="2 · SB track · G1 role" step={2} total={9} question="نقش شما در این کسب‌وکار چیست؟" enabled>
          <Stack>
            {rolesSB.map((r, i) => (
              <OptionRow key={r} label={r} state={i === 0 ? "selected" : "idle"} />
            ))}
          </Stack>
        </WizardShell>

        <WizardShell
          label="2 · Org track · G2 role"
          step={2}
          total={9}
          question="نقش شما در سازمان چیست؟"
          hint="نقش شما فقط جمله‌بندی و ترتیب سؤال‌ها را تغییر می‌دهد. قیمت برای همهٔ همکاران شما یکی است."
          enabled={false}
        >
          <Stack>
            {rolesOrg.map((r) => (
              <OptionRow key={r} label={r} />
            ))}
          </Stack>
        </WizardShell>

        <WizardShell
          label="3 · SB track · G1 owner — industry"
          note="13 options as 2-column chips. {biz} = «کسب‌وکارتان» (G2 «سازمانتان», G3 «کسب‌وکار تازه‌تان»; G3 sees «مرحله ۲ از ۸»)."
          step={3}
          total={9}
          question="حوزهٔ فعالیت کسب‌وکارتان کدام است؟"
          enabled
        >
          <div className="grid grid-cols-2 gap-2">
            {industries.map((ind, i) => (
              <Chip key={ind.label} label={ind.label} hint={ind.hint} selected={i === 0} />
            ))}
          </div>
        </WizardShell>

        <WizardShell label="3 · SB track · G4 — professions"
          note="G4 skips screen 2, so this shows «مرحله ۲ از ۸»." step={2} total={8} question="حرفهٔ شما کدام است؟" enabled={false}>
          <Stack>
            {professions.map((p) => (
              <OptionRow key={p} label={p} />
            ))}
          </Stack>
        </WizardShell>

        {/* ── B · Small-business track ── */}
        <SectionTitle>B · Small-business track (G1 owner unless noted)</SectionTitle>

        <WizardShell
          label="4 · SB track · G1 owner — goals, role default"
          step={4}
          total={9}
          question="مهم‌ترین هدف شما برای کسب‌وکارتان چیست؟"
          hint={`تا ۲ مورد. ${PREFILL_NOTE}`}
          enabled
        >
          <Stack>
            {goalsSB.map((g, i) => (
              <OptionRow key={g.label} label={g.label} hint={g.hint} multi state={i === 0 ? "selected" : "idle"} />
            ))}
          </Stack>
        </WizardShell>

        <WizardShell
          label="4 · SB track · G1 owner — goals, limit reached"
          note="2 selected; a third tap is blocked and the limit message shows under it."
          step={4}
          total={9}
          question="مهم‌ترین هدف شما برای کسب‌وکارتان چیست؟"
          hint={`تا ۲ مورد. ${PREFILL_NOTE}`}
          enabled
        >
          <Stack>
            {goalsSB.map((g, i) => (
              <div key={g.label} className="flex flex-col gap-2">
                <OptionRow label={g.label} hint={g.hint} multi state={i === 0 || i === 2 ? "selected" : i === 3 ? "blocked" : "idle"} />
                {i === 3 && <Notice>{LIMIT_REACHED}</Notice>}
              </div>
            ))}
          </Stack>
        </WizardShell>

        <WizardShell
          label="5 · SB track · G1 owner — problems"
          note="Full SB list (goal → problem table is [TODO]); owner's first problems on top, «نمی‌دانم…» always last."
          step={5}
          total={9}
          question="بزرگ‌ترین مشکل‌های کسب‌وکارتان کدام‌اند؟"
          hint={`تا ۳ مورد. ${ROLE_ORDER_NOTE}`}
          enabled
        >
          <Stack>
            {problemsSB_G1owner.map((p, i) => (
              <OptionRow key={p.label} label={p.label} hint={p.hint} multi state={i === 0 ? "selected" : "idle"} />
            ))}
          </Stack>
        </WizardShell>

        <WizardShell label="Insight · SB track · G1 owner (between 5 and 6)" note="One sentence from the user's own answers; no button of its own." step={5} total={9} enabled>
          <InsightCard>
            شما «مشتری جدید کافی نیست» را بزرگ‌ترین مشکل کسب‌وکارتان دانستید. چند سؤال کوتاه مانده تا پلن را بر همین پایه بسازیم.
          </InsightCard>
        </WizardShell>

        <WizardShell
          label="6 · SB track · G1 owner — what you have"
          step={6}
          total={9}
          question="از این‌ها چه چیزی دارید؟"
          hint="هر چه دارید را علامت بزنید. اگر چیزی ندارید، ادامه دهید."
          enabled
        >
          <Stack>
            {haveSB.map((h, i) => (
              <OptionRow key={h.label} label={h.label} hint={h.hint} multi state={i === 3 ? "selected" : "idle"} />
            ))}
          </Stack>
        </WizardShell>

        <WizardShell label="6 · SB track · G3 founder — what is ready" step={5} total={8} question="از این‌ها چه چیزی آماده است؟" enabled>
          <Stack>
            {readyG3.map((r, i) => (
              <OptionRow key={r} label={r} multi state={i === 0 ? "selected" : "idle"} />
            ))}
          </Stack>
        </WizardShell>

        <WizardShell label="7 · SB track · G1 owner — where you sell" step={7} total={9} question="مشتری‌هایتان از چه راهی می‌خرند؟" enabled>
          <Stack>
            {sellSB.map((s, i) => (
              <OptionRow key={s.label} label={s.label} hint={s.hint} multi state={i === 0 || i === 2 ? "selected" : "idle"} />
            ))}
          </Stack>
        </WizardShell>

        <WizardShell
          label="8 · SB track · G1 owner — budget, start, city"
          note="Nothing chosen yet, so «ساخت پلن من» is disabled."
          step={8}
          total={9}
          next={BUILD_PLAN}
          enabled={false}
        >
          <Stack gap="gap-6">
            <ChoiceGroup question={BUDGET_Q} hint={BUDGET_HINT} options={budgetG1} />
            <ChoiceGroup question={START_Q} options={startOptions} />
            <ChoiceGroup question={CITY_Q} options={cityOptions} />
          </Stack>
        </WizardShell>

        <WizardShell
          label="8 · SB track · G3/G4 — budget, start, city"
          note="G3/G4 bands; all three answered, so the button is enabled."
          step={7}
          total={8}
          next={BUILD_PLAN}
          enabled
        >
          <Stack gap="gap-6">
            <ChoiceGroup question={BUDGET_Q} hint={BUDGET_HINT} options={budgetG3G4} selected={budgetG3G4[1]} />
            <ChoiceGroup question={START_Q} options={startOptions} selected={startOptions[1]} />
            <ChoiceGroup question={CITY_Q} options={cityOptions} selected={cityOptions[0]} />
          </Stack>
        </WizardShell>

        {/* ── C · Organization track ── */}
        <SectionTitle>C · Organization track (G2, R-CEO)</SectionTitle>

        <WizardShell
          label="4 · Org track · G2 R-CEO — goals"
          note="R-CEO defaults: «رشد فروش» + «نظم بیشتر» pre-selected (fills the limit of 2)."
          step={4}
          total={9}
          question="مهم‌ترین هدف‌های سازمانتان کدام‌اند؟"
          hint={`تا ۲ مورد. ${PREFILL_NOTE}`}
          enabled
        >
          <Stack>
            {goalsOrg.map((g, i) => (
              <OptionRow key={g} label={g} multi state={i < 2 ? "selected" : "idle"} />
            ))}
          </Stack>
        </WizardShell>

        <WizardShell
          label="5 · Org track · G2 R-CEO — problems"
          note="Full Org list in R-CEO order; nothing chosen yet."
          step={5}
          total={9}
          question="بزرگ‌ترین مشکل‌های سازمانتان کدام‌اند؟"
          hint={`تا ۳ مورد. ${ROLE_ORDER_NOTE}`}
          enabled={false}
        >
          <Stack>
            {problemsOrg_CEO.map((p) => (
              <OptionRow key={p.label} label={p.label} hint={p.hint} multi />
            ))}
          </Stack>
        </WizardShell>

        <WizardShell label="Insight · Org track · G2 R-CEO (between 5 and 6)" step={5} total={9} enabled>
          <InsightCard>«کارها بی‌نظم است» مهم‌ترین موضوع شما در سازمانتان است. چند سؤال کوتاه دیگر برای ساخت پلن لازم است.</InsightCard>
        </WizardShell>

        <WizardShell
          label="6 · Org track · G2 R-CEO — current systems"
          note="Accounting is NOT here: content/wizard.md §8–§9 moved it to screen 7 as a single choice. «پیام‌رسان‌ها» one option or a list is [TODO]."
          step={6}
          total={9}
          question="سازمان شما اکنون از چه سیستم‌هایی استفاده می‌کند؟"
          enabled
        >
          <Stack>
            {systemsOrg.map((s, i) => (
              <OptionRow key={s} label={s} multi state={i === 1 ? "selected" : "idle"} />
            ))}
          </Stack>
        </WizardShell>

        <WizardShell
          label="7 · Org track · G2 R-CEO — decision, invoice, timeline, accounting"
          note="Four single choices on one screen (deck §9); R-CEO sees the invoice question first."
          step={7}
          total={9}
          enabled={false}
        >
          <Stack gap="gap-6">
            <ChoiceGroup
              question="فاکتور رسمی لازم دارید؟"
              hint="اگر فاکتور رسمی لازم است، در پلن یادداشتی برای آن می‌گذاریم."
              options={["بله", "خیر"]}
            />
            <ChoiceGroup question="چند نفر در تصمیم‌گیری نقش دارند؟" options={["فقط خودم", "۲ تا ۳ نفر", "بیش از ۳ نفر"]} />
            <ChoiceGroup question="زمان‌بندی شما چیست؟" options={["همین فصل", "تا ۶ ماه آینده", "فقط بررسی می‌کنیم"]} />
            <ChoiceGroup question="نرم‌افزار حسابداری شما کدام است؟" options={["سپیدار", "هلو", "همکاران‌سیستم", "نرم‌افزار دیگر", "ندارم"]} />
          </Stack>
        </WizardShell>

        <WizardShell label="8 · Org track · G2 R-CEO — budget" step={8} total={9} next={BUILD_PLAN} enabled>
          <ChoiceGroup question={BUDGET_Q} hint={BUDGET_HINT} options={budgetOrg} selected={budgetOrg[1]} />
        </WizardShell>

        {/* ── D · Phone gate ── */}
        <SectionTitle>D · Phone gate and OTP</SectionTitle>

        <WizardShell label="9 · Phone gate · G1/G3/G4 — empty" note="Blurred score preview behind the form; nothing readable." step={9} total={9} next="ارسال کد تأیید" enabled={false}>
          <PhoneGate />
        </WizardShell>

        <WizardShell
          label="9 · Phone gate · G2 — empty"
          note="+ company name. The optional «who decides with you» phone is [SPRINT-2], not drawn."
          step={9}
          total={9}
          next="ارسال کد تأیید"
          enabled={false}
        >
          <PhoneGate org />
        </WizardShell>

        <WizardShell
          label="9 · Phone gate · keyboard open"
          note="Numeric keyboard over the bottom 260 px. The button sits right on top of it and stays visible. Page drawn scrolled up 220 px so the focused mobile field is above the button (the browser does this on focus)."
          step={9}
          total={9}
          next="ارسال کد تأیید"
          enabled={false}
          keyboard
          scrolledBy={220}
        >
          <PhoneGate keyboard />
        </WizardShell>

        <WizardShell label="9 · OTP entry" note="6 boxes, inputmode numeric, autocomplete one-time-code; resend counts down from ۱۲۰." step={9} total={9} next="تأیید و دیدن پلن" enabled={false}>
          <OtpScreen />
        </WizardShell>

        <WizardShell
          label="9 · OTP wrong code"
          note="The error text comes from the API in Persian (deck §1); drawn as a grey bar."
          step={9}
          total={9}
          next="تأیید و دیدن پلن"
          enabled
        >
          <OtpScreen error />
        </WizardShell>

        {/* ── E · Results ── */}
        <SectionTitle>E · Results</SectionTitle>

        <ResultFrame
          label="Result · SB track · G1 health score"
          note="Primary button text to the plan is not in the deck yet: grey bar. No wizard top bar after the gate."
        >
          <ResultScreen label="امتیاز سلامت کسب‌وکار" score={<>۶۲ <span className="text-xl font-medium">از ۱۰۰</span></>} />
        </ResultFrame>

        <ResultFrame label="Result · Org track · G2 maturity" note="Level names are [Draft]; the one-line level description is [TODO]: grey bar.">
          <ResultScreen label="سطح بلوغ سازمان" score={<span className="text-4xl">سطح ۳ از ۵ — تعریف‌شده</span>}>
            <TodoBar className="w-56" />
          </ResultScreen>
        </ResultFrame>

        <ResultFrame label="Result · SB track · G3 readiness" note="Readiness scale is [TODO]; «از ۱۰۰» assumed (deck §13).">
          <ResultScreen label="امتیاز آمادگی" score={<>۴۸ <span className="text-xl font-medium">از ۱۰۰</span></>} />
        </ResultFrame>

        <ResultFrame label="Loading · building your plan" note="No loading text in the deck yet: grey bars. No animation in the wireframe." button={false}>
          <div className="flex flex-col items-center gap-4 pt-40">
            <span aria-hidden className="size-14 rounded-full border-4 border-neutral-400" />
            <TodoBar className="w-48" />
            <TodoBar className="w-32" />
          </div>
        </ResultFrame>
      </div>
    </main>
  );
}
