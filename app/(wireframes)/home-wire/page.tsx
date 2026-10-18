import type { ReactNode } from "react";
import { toFarsiDigits } from "@/lib/farsiNumerals";

// Grey-box wireframe of the home page at 375 px.
// Copy: content/home.md. Spacing: DESIGN.md §3 scale (Tailwind 1, 2, 3, 4, 6, 8, 12, 16, 24).
// Rule: one filled primary button per screen height (DESIGN.md §5.3). Only the hero and the
// final CTA carry the filled button; the same label elsewhere is drawn as an outline button.
// Throw-away page: not indexed, delete once the real sections exist.

export const metadata = {
  title: "وایرفریم صفحهٔ اصلی",
  robots: { index: false },
};

function Block({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`bg-neutral-300 ${className}`} />;
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-[12px] border border-neutral-400 bg-neutral-200 p-4">
      {children}
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col gap-6 border-b border-neutral-400 px-4 py-12">
      {children}
    </section>
  );
}

function Heading({ children, first = false }: { children: ReactNode; first?: boolean }) {
  const Tag = first ? "h1" : "h2";
  return <Tag className="text-2xl font-bold leading-10 text-neutral-900">{children}</Tag>;
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="text-base leading-8 text-neutral-700">{children}</p>;
}

function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="h-11 w-full rounded-[10px] bg-neutral-800 px-4 text-base font-medium text-white"
    >
      {children}
    </button>
  );
}

function OutlineButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="h-11 w-full rounded-[10px] border-2 border-neutral-800 bg-transparent px-4 text-base font-medium text-neutral-900"
    >
      {children}
    </button>
  );
}

const steps = [
  {
    title: "تشخیص",
    text: "چند سؤال دربارهٔ هدف و مشکل‌های شما می‌پرسیم و بر پایهٔ پاسخ‌ها، امتیاز و ضعیف‌ترین بخش کسب‌وکارتان را نشان می‌دهیم.",
  },
  {
    title: "پلن",
    text: "پلنی با قیمت می‌گیرید که هر خدمتش را می‌توانید روشن یا خاموش کنید؛ خدمتی که بدون خدمت دیگر کار نمی‌کند، با دلیل قفل است. پلن را می‌توانید دانلود کنید.",
  },
  {
    title: "نتیجه",
    text: "کار را شروع می‌کنیم، و جایی که نتیجه قابل شمارش است، بخشی از هزینه به نتیجه وابسته می‌شود.",
  },
];

const problems = [
  { problem: "نمی‌دانید مشکل اصلی کجاست", fix: "وضعیت کسب‌وکار را بررسی می‌کنیم و نقطه‌های ضعفش را نشان می‌دهیم." },
  { problem: "همه‌چیز به چند نفر وابسته است", fix: "روال‌ها، نقش‌ها و ابزار پیگیری مشتری را می‌نویسیم و راه می‌اندازیم." },
  { problem: "کارهای تکراری وقت می‌گیرد", fix: "کارهای تکراری، پیامک‌ها و پاسخ‌ها را خودکار می‌کنیم." },
  { problem: "سایت یا سیستم درست ندارید", fix: "صفحه، سایت، فروشگاه یا سیستم نوبت‌دهی می‌سازیم." },
  { problem: "مشتری جدید کافی نمی‌رسد", fix: "کمپین اجرا می‌کنیم و هر سرنخ و نوبتی را که می‌آید، می‌شماریم." },
  { problem: "کسی شما را در اینترنت پیدا نمی‌کند", fix: "ثبت روی نقشه، سئو، اینستاگرام و هویت برند را درست می‌کنیم." },
];

const countingRules = [
  { title: "تعریف مکتوب.", text: "پیش از شروع کمپین، می‌نویسیم «یک سرنخ معتبر» یا «یک متقاضی مناسب» یعنی چه." },
  { title: "فقط داخل سیستمی که هر دو می‌بینیم.", text: "سرنخی که شماره‌اش با پیامک تأیید شده، یا نوبتی که در سیستم نوبت‌دهی ثبت و با پیامک تأیید شده، شمرده می‌شود. فروشی که تلفنی یا حضوری بسته شود در شمارش ما نیست." },
  { title: "۷۲ ساعت وقت اعتراض.", text: "هر نتیجه را در این مدت می‌توانید به چالش بکشید؛ بعد از آن شمرده می‌شود." },
  { title: "سهمی از فروش شما نمی‌گیریم.", text: "فقط سرنخ و نوبت را قیمت می‌گذاریم." },
];

const paymentRules = [
  { title: "پایهٔ ماهانه.", text: "در ماهی که هیچ نتیجه‌ای ثبت نشود، فقط هزینهٔ پایه را می‌پردازید." },
  { title: "سقف ماهانه.", text: "مبلغ نتیجه‌ها حداکثر سه برابر هزینهٔ پایه می‌شود." },
  { title: "کمینهٔ سه ماه.", text: "قرارداد نتیجه‌محور حداقل سه ماه است." },
  { title: "تشخیص کامل اول.", text: "پیش از هر قرارداد نتیجه‌محور، تشخیص کامل انجام می‌شود تا نقطهٔ شروع روشن باشد." },
];

// {month} in the copy deck: sample value for the wireframe only.
const priceNotes = [
  "قیمت‌ها تا پایان مهر ۱۴۰۵ معتبر است و ماه بعد دوباره بازبینی می‌شود.",
  "اگر پس از ارسال پلن قیمتی عوض شود، پلن ارسال‌شده تغییر نمی‌کند.",
  "هزینهٔ تبلیغات و پیامک را مستقیم به ارائه‌دهنده می‌پردازید و در فاکتور ما نمی‌آید؛ در پلن، این‌ها زیر «هزینه‌های شما» جدا نوشته می‌شود.",
  "کار پس از پیش‌پرداخت شروع می‌شود.",
  "سازمان‌ها فقط برای تشخیص قیمت ثابت می‌بینند؛ بقیه بعد از تشخیص به‌صورت بازه می‌آید.",
];

const faq = [
  { q: "تشخیص رایگان واقعاً رایگان است؟", a: "بله. پاسخ به سؤال‌ها، امتیاز، سه نقطه‌ضعف اصلی و پیش‌نویس پلن رایگان است." },
  { q: "اگر نتیجه نگیرم چه می‌شود؟", a: "در پلن‌های نتیجه‌محور، در ماهی که هیچ نتیجهٔ تأییدشده‌ای ثبت نشود، بابت نتیجه چیزی نمی‌پردازید؛ هزینهٔ پایه همچنان لازم است. نتیجه را برایتان تضمین نمی‌کنیم." },
  { q: "چه چیزی «نتیجه» حساب می‌شود؟", a: "چیزی که در سیستم نصب‌شدهٔ ما ثبت شود و پیش از شروع، مکتوب تعریفش کرده باشیم. ۷۲ ساعت وقت دارید اعتراض کنید." },
  { q: "هزینهٔ تبلیغات را چه کسی می‌پردازد؟", a: "هزینهٔ تبلیغات و پیامک را مستقیم به ارائه‌دهنده می‌پردازید و در فاکتور ما نمی‌آید." },
  { q: "اگر بررسی متمرکز چیزی پیدا نکند؟", a: "اگر گزارش بررسی متمرکز چیزی پیدا نکند که ارزش اقدام داشته باشد، هزینهٔ آن برگردانده می‌شود." },
  { q: "قیمت‌ها را چطور بدانم درست‌اند؟", a: "هر قیمت می‌گوید شامل چیست و تا پایان کدام ماه معتبر است. پلنی که برایتان فرستاده‌ایم، با عوض‌شدن قیمت ماه بعد تغییر نمی‌کند." },
  { q: "سازمان هستیم؛ چه فرقی دارد؟", a: "روند همان است. جز تشخیص، قیمت‌ها پس از تشخیص و به‌صورت بازه تعیین می‌شود، و قرارداد رسمی بعد از تشخیص تنظیم می‌شود." },
];

export default function HomeWireframe() {
  return (
    <div className="min-h-screen bg-neutral-200">
      <main
        dir="rtl"
        lang="fa"
        className="mx-auto w-full max-w-[375px] bg-white text-neutral-900"
      >
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-neutral-400 px-4">
          <Block className="h-8 w-24" />
          <Block className="h-8 w-8" />
        </header>

        {/* 1 · Hero */}
        <Section>
          <Block className="aspect-video w-full rounded-[12px]" />
          <Heading first>اول بفهمید کجا مشتری از دست می‌دهید، بعد هزینه کنید</Heading>
          <Lead>
            با چند سؤال کوتاه ضعیف‌ترین بخش کسب‌وکارتان را می‌بینید و پلنی با قیمت روشن می‌گیرید.
          </Lead>
          <div className="flex flex-col gap-3">
            <PrimaryButton>کسب‌وکار کوچک دارم</PrimaryButton>
            <OutlineButton>در یک سازمان کار می‌کنم</OutlineButton>
            <a href="#" className="py-3 text-center text-sm leading-7 text-neutral-700 underline">
              راه‌اندازی می‌کنید یا برای خودتان کار می‌کنید؟ شروع تشخیص رایگان
            </a>
          </div>
          <p className="text-sm leading-7 text-neutral-600">
            تشخیص رایگان است و شمارهٔ موبایل را فقط در پایان می‌خواهیم.
          </p>
        </Section>

        {/* 2 · How it works */}
        <Section>
          <Heading>اول تشخیص، بعد پلن، بعد نتیجه</Heading>
          <Lead>هیچ خدمتی را بدون دانستن مشکل اصلی پیشنهاد نمی‌کنیم.</Lead>
          <div className="flex flex-col gap-4">
            {steps.map((step, i) => (
              <Card key={step.title}>
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center bg-neutral-400 text-sm font-medium">
                    {toFarsiDigits(i + 1)}
                  </div>
                  <h3 className="text-base font-bold leading-8">{step.title}</h3>
                </div>
                <p className="text-sm leading-7 text-neutral-700">{step.text}</p>
              </Card>
            ))}
          </div>
          <OutlineButton>شروع تشخیص رایگان</OutlineButton>
        </Section>

        {/* 3 · Six problems */}
        <Section>
          <Heading>مشکل شما کدام است؟</Heading>
          <Lead>هر ستون با مشکلی شروع می‌شود که کسب‌وکارها با آن روبه‌رو می‌شوند.</Lead>
          <div className="flex flex-col gap-4">
            {problems.map((item) => (
              <Card key={item.problem}>
                <div className="flex items-start gap-3">
                  <Block className="size-12 shrink-0" />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-bold leading-8">{item.problem}</h3>
                    <p className="text-sm leading-7 text-neutral-700">{item.fix}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <OutlineButton>شروع تشخیص رایگان</OutlineButton>
        </Section>

        {/* 4 · Pay for results (with how we count) */}
        <Section>
          <Heading>هزینهٔ پایه ثابت است، بقیه به نتیجه وابسته</Heading>
          <Lead>
            در پلن‌های نتیجه‌محور، هزینهٔ پایهٔ ماهانه کار ما را پوشش می‌دهد و برای هر نتیجهٔ
            تأییدشده مبلغ جدا می‌پردازید.
          </Lead>
          <h3 className="text-lg font-bold leading-8">نتیجه را چطور می‌شماریم</h3>
          <div className="flex flex-col gap-3">
            {countingRules.map((rule) => (
              <Card key={rule.title}>
                <p className="text-sm leading-7">
                  <span className="font-bold">{rule.title}</span> {rule.text}
                </p>
              </Card>
            ))}
          </div>
          <h3 className="text-lg font-bold leading-8">قاعده‌های پرداخت</h3>
          <div className="flex flex-col gap-3">
            {paymentRules.map((rule) => (
              <Card key={rule.title}>
                <p className="text-sm leading-7">
                  <span className="font-bold">{rule.title}</span> {rule.text}
                </p>
              </Card>
            ))}
          </div>
          <OutlineButton>شروع تشخیص رایگان</OutlineButton>
        </Section>

        {/* 5 · Open prices */}
        <Section>
          <Heading>قیمت‌ها را همین‌جا می‌بینید</Heading>
          <Lead>هر قیمت می‌گوید چه چیزی را شامل می‌شود و تا پایان کدام ماه معتبر است.</Lead>
          <ol className="flex flex-col gap-3">
            {priceNotes.map((note, i) => (
              <li key={note} className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center bg-neutral-300 text-sm font-medium">
                  {toFarsiDigits(i + 1)}
                </div>
                <p className="text-sm leading-7 text-neutral-700">{note}</p>
              </li>
            ))}
          </ol>
          <OutlineButton>قیمت خدمت‌ها را ببینید</OutlineButton>
        </Section>

        {/* 6 · Founders */}
        <Section>
          <Heading>کسانی که کار را انجام می‌دهند</Heading>
          <Lead>
            قیمت‌ها را هر ماه هر دو بنیان‌گذار بازبینی می‌کنند، و تماس تشخیص شما با یکی از
            بنیان‌گذاران است.
          </Lead>
          <div className="flex flex-col gap-4">
            {[0, 1].map((i) => (
              <Card key={i}>
                <div className="flex items-center gap-4">
                  <Block className="size-16 shrink-0" />
                  <div className="flex w-full flex-col gap-2">
                    <Block className="h-4 w-24" />
                    <Block className="h-4 w-16" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <OutlineButton>رزرو تماس</OutlineButton>
        </Section>

        {/* 7 · FAQ */}
        <Section>
          <Heading>پرسش‌هایی که معمولاً می‌پرسند</Heading>
          <Lead>اگر پاسخ پرسش‌تان این‌جا نیست، در تماس بپرسید.</Lead>
          <dl className="flex flex-col gap-3">
            {faq.map((item) => (
              <Card key={item.q}>
                <dt className="text-base font-bold leading-8">{item.q}</dt>
                <dd className="text-sm leading-7 text-neutral-700">{item.a}</dd>
              </Card>
            ))}
          </dl>
          <OutlineButton>رزرو تماس</OutlineButton>
        </Section>

        {/* 8 · Final CTA */}
        <section className="flex flex-col gap-6 px-4 py-12">
          <Heading>با تشخیص شروع کنید</Heading>
          <Lead>چند سؤال کوتاه جواب می‌دهید و پلن اولیه را با قیمت می‌گیرید.</Lead>
          <div className="flex flex-col gap-3">
            <PrimaryButton>شروع تشخیص رایگان</PrimaryButton>
            <OutlineButton>رزرو تماس</OutlineButton>
          </div>
        </section>
      </main>
    </div>
  );
}
