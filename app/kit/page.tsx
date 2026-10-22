import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Download, Pencil } from "lucide-react";
import { ChoiceChips } from "@/components/actions/ChoiceChips";
import { Button, type ButtonProps, type ButtonVariant } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { TextLink } from "@/components/ui/text-link";
import { toFarsiDigits } from "@/lib/farsiNumerals";
import { RunDemo } from "./_parts/RunDemo";

// /kit — every kit component with every state (guide 24 step 5). Internal, not indexed.
// Labels only from content/home.md, wizard.md and plan.md. «زنده» cells are the real component;
// the other cells draw a state on purpose (data-force) so all states can be compared side by side.

export const metadata = {
  title: "کیت اجزا",
  robots: { index: false, follow: false },
};

// ── copy (decks) ────────────────────────────────────────────────────────────
const START = "شروع تشخیص رایگان"; // home.md
const BUILD = "ساخت پلن من"; // wizard.md §1
const PLAN_READY = "پلن شما آماده است"; // wizard.md §11
const SEND_CODE = "ارسال کد تأیید"; // wizard.md §11
const CODE_SENT = "کد پیامک شد"; // shortened from wizard.md §11 «کد به شمارهٔ {phone} پیامک شد.» — to approve
const NEXT = "ادامه"; // wizard.md §1
const BOOK = "رزرو تماس"; // plan.md §11
const DOWNLOAD = "دانلود پلن"; // plan.md §11
const PRICES = "قیمت خدمت‌ها را ببینید"; // home.md §5
const SAVE_FAILED = "پاسخ شما ذخیره نشد. دوباره تلاش کنید."; // wizard.md §1
const PRIVACY_LINE = "شمارهٔ شما برای تأیید اینکه خودتان هستید و نگه‌داشتن پلن لازم است تا بعداً به آن برگردید."; // wizard.md §11
const PRIVACY = "حریم خصوصی"; // wizard.md §11

// ── layout helpers ──────────────────────────────────────────────────────────

function KitSection({ id, title, note, children }: { id: string; title: string; note: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="flex flex-col gap-8 border-t border-border py-10 md:py-14">
      <div>
        <h2 id={`${id}-title`} className="text-2xl font-bold leading-10">
          {title}
        </h2>
        <p className="mt-1 max-w-[720px] text-sm leading-7 text-muted-foreground">{note}</p>
      </div>
      {children}
    </section>
  );
}

/** A surface panel: light (--color-bg) or night (--color-night with a still brand gradient for glass to blur). */
function Surface({ night = false, children }: { night?: boolean; children: ReactNode }) {
  if (!night) return <div className="flex flex-col gap-12 rounded-[12px] border border-border bg-bg p-5 md:p-8">{children}</div>;
  return (
    <div
      className="flex flex-col gap-12 rounded-[12px] p-5 text-surface md:p-8"
      style={{
        background: [
          "radial-gradient(40% 50% at 18% 22%, var(--brand) 0%, transparent 70%)",
          "radial-gradient(36% 42% at 82% 60%, color-mix(in oklab, var(--brand) 85%, var(--brand-dark)) 0%, transparent 72%)",
          "radial-gradient(26% 30% at 56% 18%, color-mix(in oklab, var(--action) 18%, transparent) 0%, transparent 70%)",
          "radial-gradient(32% 38% at 38% 86%, var(--brand-dark) 0%, transparent 70%)",
          "var(--night)",
        ].join(","),
      }}
    >
      {children}
    </div>
  );
}

function Row({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-base font-bold leading-8">{title}</h3>
        {note && <p className="max-w-[720px] text-sm leading-7 opacity-75">{note}</p>}
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(15.5rem,1fr))] gap-x-6 gap-y-5">{children}</div>
    </div>
  );
}

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-xs opacity-70">{label}</span>
      {children}
    </div>
  );
}

function NA({ children }: { children: string }) {
  return <span className="text-xs leading-6 opacity-70">ندارد — {children}</span>;
}

const STATES: { label: string; props: Partial<ButtonProps> }[] = [
  { label: "زنده", props: {} },
  { label: "اشاره (hover)", props: { forceState: "hover" } },
  { label: "فوکوس کیبورد", props: { forceState: "focus" } },
  { label: "فشرده (لمس)", props: { forceState: "pressed" } },
  { label: "غیرفعال", props: { disabled: true } },
  { label: "در حال انجام", props: { status: "loading" } },
  { label: "انجام شد", props: { status: "success" } },
];

/** Every state of one variant. Success only where the button waits for something worth confirming. */
function variantCells(variant: ButtonVariant, label: string, success?: { label: string; burst?: boolean }, noSuccess = "به صفحهٔ بعد می‌رود") {
  return STATES.map((s) => (
    <Cell key={s.label} label={s.label}>
      {s.props.status === "success" && !success ? (
        <NA>{noSuccess}</NA>
      ) : (
        <Button
          variant={variant}
          successLabel={success?.label}
          burst={success?.burst}
          {...(s.props as Record<string, unknown>)}
        >
          {label}
        </Button>
      )}
    </Cell>
  ));
}

const ICONS = [
  { label: "بازگشت", icon: <ArrowRight /> },
  { label: "ویرایش شماره", icon: <Pencil /> },
  { label: "دانلود پلن", icon: <Download /> },
];

function iconCells(tone: "light" | "night") {
  const states = [
    ["زنده", {}],
    ["اشاره", { forceState: "hover" as const }],
    ["فوکوس کیبورد", { forceState: "focus" as const }],
    ["فشرده", { forceState: "pressed" as const }],
    ["غیرفعال", { disabled: true }],
  ] as const;
  return states.map(([label, p]) => (
    <Cell key={label} label={label}>
      <span className="flex gap-3">
        <IconButton label={ICONS[0].label} icon={ICONS[0].icon} tone={tone} {...p} />
        <IconButton label={ICONS[2].label} icon={ICONS[2].icon} shape="tile" tone={tone} {...p} />
      </span>
    </Cell>
  ));
}

function linkCells(tone: "light" | "night") {
  return [
    <Cell key="live" label="زنده">
      <TextLink href="#buttons" tone={tone}>
        {PRICES}
      </TextLink>
    </Cell>,
    <Cell key="hover" label="اشاره">
      <TextLink href="#buttons" tone={tone} forceState="hover">
        {PRICES}
      </TextLink>
    </Cell>,
    <Cell key="focus" label="فوکوس کیبورد">
      <TextLink href="#buttons" tone={tone} forceState="focus">
        {PRICES}
      </TextLink>
    </Cell>,
  ];
}

export default function KitPage() {
  return (
    <main className="min-h-screen bg-surface text-ink">
      <div className="mx-auto max-w-[1180px] px-4 py-10 md:px-8">
        <header>
          <h1 className="text-[28px] font-bold leading-[1.6] md:text-4xl">کیت اجزا</h1>
          <p className="mt-2 max-w-[720px] text-base leading-[1.9] text-muted-foreground">
            هر جزء با همهٔ حالت‌هایش، روی سطحی که برایش ساخته شده. خانه‌های «زنده» واقعی‌اند: با ماوس رویشان بروید، با Tab به آن‌ها برسید،
            رویشان بزنید.
          </p>
          <nav aria-label="اجزای کیت" className="mt-4 flex flex-wrap gap-2">
            <TextLink href="#buttons" arrow={false}>
              دکمه‌ها و لینک‌ها
            </TextLink>
            <span aria-hidden className="self-center text-muted-foreground">
              ·
            </span>
            <TextLink href="#choices" arrow={false}>
              انتخاب کوتاه
            </TextLink>
            <span aria-hidden className="self-center text-muted-foreground">
              ·
            </span>
            <TextLink href="/kit/directions" arrow={false}>
              جهت‌های بصری
            </TextLink>
          </nav>
        </header>

        <KitSection
          id="buttons"
          title="دکمه‌ها و لینک‌ها"
          note="action فقط برای تنها اقدام اصلی هر صفحه‌نمایش؛ روی بخش‌های تیره نسخهٔ hero. اثرهای کامل (نور، شیشه، پرشدن) روی سطح تیره‌اند و صفحه‌های روشن نسخهٔ آرام را می‌گیرند. با «کاهش حرکت» در سیستم، هر اثر مستقیم به حالت پایانی می‌رود."
        >
          <Surface>
            <Row title="اقدام اصلی (action)" note="دایرهٔ فلش تا انتهای دکمه پر می‌شود و دکمه در پایه‌اش فرو می‌رود. «انجام شد» با ذرات، فقط برای لحظهٔ آماده‌شدن پلن.">
              {variantCells("action", BUILD, { label: PLAN_READY, burst: true })}
            </Row>
            <Row title="برند (brand)" note="رنگ برند با عمق هم‌رنگ؛ بالا می‌آید، فلش جلو می‌رود، با فشار فرو می‌رود.">
              {variantCells("brand", NEXT, undefined, "به سؤال بعد می‌رود")}
            </Row>
            <Row title="خطی (ghost)" note="قاب برند؛ زمینهٔ روشن برند در حالت اشاره و فوکوس.">
              {variantCells("ghost", BOOK)}
            </Row>
          </Surface>

          <Surface night>
            <Row title="اقدام اصلی روی تیره (hero)" note="درخشش ملایم؛ نوری که یک بار هنگام دیده‌شدن و بعد هر ۶ ثانیه دور لبه می‌چرخد.">
              {variantCells("hero", START)}
            </Row>
            <Row title="شیشه (glass)" note="شیشهٔ مات با ته‌رنگ فیروزه‌ای؛ نوار نور از راست به چپ. در دستگاه ضعیف یا بدون پشتیبانی، نسخهٔ توپر.">
              {variantCells("glass", BOOK)}
              <Cell label="نسخهٔ توپر (جایگزین)">
                <Button variant="glass" solid>
                  {BOOK}
                </Button>
              </Cell>
            </Row>
            <Row title="خطی روی تیره (ghost-night)" note="پرشدن سفید از پایین با لبهٔ خمیده؛ متن در هر لحظه خواناست.">
              {variantCells("ghost-night", BOOK)}
            </Row>
            <Row title="لینک روی تیره">{linkCells("night")}</Row>
            <Row title="دکمهٔ آیکنی روی تیره">{iconCells("night")}</Row>
          </Surface>

          <Surface>
            <Row title="اندازه، آیکن، پهنای کامل، لینک به‌شکل دکمه">
              <Cell label="کوچک (۴۴ پیکسل) — سربرگ">
                <Button variant="ghost" size="sm" arrow={false}>
                  {START}
                </Button>
              </Cell>
              <Cell label="کوچک — اقدام اصلی">
                <Button variant="action" size="sm">
                  {START}
                </Button>
              </Cell>
              <Cell label="با آیکن">
                <Button variant="brand" icon={<Download />} arrow={false}>
                  {DOWNLOAD}
                </Button>
              </Cell>
              <Cell label="لینک با ظاهر دکمه (href)">
                <Button variant="action" href="#buttons">
                  {START}
                </Button>
              </Cell>
            </Row>
            <div className="max-w-[375px]">
              <Cell label="پهنای کامل — نوار پایین موبایل">
                <Button variant="action" block>
                  {START}
                </Button>
              </Cell>
            </div>
          </Surface>

          <Surface>
            <Row title="انتظار و نتیجه — بزنید تا اجرا شود" note="عرض ثابت می‌ماند. «ارسال کد» ذره ندارد، چون کد هنوز تأیید نشده؛ «ساخت پلن من» دارد، چون پلن آماده شده.">
              <Cell label="دروازهٔ شماره">
                <RunDemo label={SEND_CODE} successLabel={CODE_SENT} />
              </Cell>
              <Cell label="ویزارد، سؤال آخر">
                <RunDemo label={BUILD} successLabel={PLAN_READY} burst />
              </Cell>
              <Cell label="ذخیرهٔ پاسخ، بدون پیام موفقیت">
                <RunDemo variant="brand" label={NEXT} waitMs={1200} />
              </Cell>
            </Row>
            <Row title="خطا">
              <Cell label="پیام زیر دکمه، با aria-describedby">
                <div className="flex w-full flex-col gap-2">
                  <Button variant="brand" block aria-describedby="kit-save-error">
                    {NEXT}
                  </Button>
                  <p id="kit-save-error" role="alert" className="text-sm leading-7 text-danger">
                    {SAVE_FAILED}
                  </p>
                </div>
              </Cell>
              <Cell label="شمارش ارسال دوباره (رقم فارسی)">
                <Button variant="ghost" size="sm" arrow={false} disabled>
                  {`ارسال دوباره کد تا ${toFarsiDigits(120)} ثانیه دیگر`}
                </Button>
              </Cell>
            </Row>
          </Surface>

          <Surface>
            <Row title="لینک" note="خط زیر نازک همیشه هست؛ خط ۲ پیکسلی از راست رشد می‌کند و فلش کمی جلو می‌رود.">
              {linkCells("light")}
              <Cell label="داخل جمله">
                <p className="text-sm leading-7">
                  {PRIVACY_LINE} <TextLink href="#buttons" inline>{PRIVACY}</TextLink>
                </p>
              </Cell>
            </Row>
            <Row title="دکمهٔ آیکنی (۴۴ پیکسل، نام اجباری)">
              {iconCells("light")}
              <Cell label="با نام زیرش">
                <span className="flex gap-4">
                  {ICONS.map((i) => (
                    <IconButton key={i.label} label={i.label} icon={i.icon} caption />
                  ))}
                </span>
              </Cell>
            </Row>
          </Surface>
        </KitSection>

        <KitSection id="choices" title="انتخاب کوتاه" note="رادیو و چک‌باکس واقعی با ظاهر قرص. انتخاب‌شده با رنگ برند و تیک، نه رنگ اقدام.">
          <div className="grid gap-8 md:grid-cols-2">
            <ChoiceChips
              name="kit-start"
              legend="چه زمانی می‌خواهید شروع کنید؟"
              options={[
                { value: "now", label: "همین ماه" },
                { value: "3m", label: "تا ۳ ماه دیگر" },
                { value: "explore", label: "فقط بررسی می‌کنم" },
              ]}
            />
            <ChoiceChips
              name="kit-start-selected"
              legend="انتخاب‌شده، با فوکوس کیبورد"
              defaultValue="3m"
              forceFocus="3m"
              options={[
                { value: "now", label: "همین ماه" },
                { value: "3m", label: "تا ۳ ماه دیگر" },
                { value: "explore", label: "فقط بررسی می‌کنم" },
              ]}
            />
            <ChoiceChips
              name="kit-sell"
              legend="مشتری‌هایتان از چه راهی می‌خرند؟"
              hint="تا ۲ مورد"
              multiple
              max={2}
              limitMessage="به سقف رسیده‌اید. برای انتخاب مورد دیگر، یکی را بردارید."
              defaultValue={["inperson", "dm"]}
              options={[
                { value: "inperson", label: "حضوری" },
                { value: "phone", label: "تلفنی" },
                { value: "dm", label: "دایرکت اینستاگرام" },
                { value: "web", label: "وب‌سایت" },
              ]}
            />
            <ChoiceChips
              name="kit-city"
              legend="کسب‌وکار شما در کدام شهر است؟"
              error="یک گزینه را انتخاب کنید."
              options={[
                { value: "tehran", label: "تهران" },
                { value: "other", label: "شهر دیگر" },
              ]}
            />
            <ChoiceChips
              name="kit-invoice"
              legend="فاکتور رسمی لازم دارید؟ (غیرفعال)"
              disabled
              defaultValue="yes"
              options={[
                { value: "yes", label: "بله" },
                { value: "no", label: "خیر" },
              ]}
            />
            <ChoiceChips
              name="kit-budget"
              legend="یک گزینهٔ غیرفعال"
              options={[
                { value: "a", label: "کمتر از ۱۰ میلیون تومان" },
                { value: "b", label: "۱۰ تا ۳۰ میلیون تومان" },
                { value: "c", label: "۳۰ تا ۸۰ میلیون تومان", disabled: true },
              ]}
            />
          </div>
        </KitSection>

        <p className="border-t border-border pt-6 text-sm text-muted-foreground">
          <Link href="/" className="underline underline-offset-4">
            صفحهٔ اصلی
          </Link>
        </p>
      </div>
    </main>
  );
}
