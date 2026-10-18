import Link from "next/link";

// Guide 24 · step 4.3 — three visual directions for roiyan.com, side by side.
// Each preview uses the same home copy deck (content/home.md). Nothing here touches real pages.
// Sources: refs/direction/notes.md (74 captured references).

type Direction = {
  slug: string;
  name: string;
  latin: string;
  mood: string;
  refs: string;
  swatches: { color: string; label: string; weight: number }[];
  lines: { label: string; text: string }[];
  watch: string;
};

const directions: Direction[] = [
  {
    slug: "paper-chart",
    name: "کاغذ تشخیص",
    latin: "Paper Chart",
    mood: "آرام، جادار، مثل برگهٔ آزمایش روی میز پزشک",
    refs: "۲۳ Planned · ۳۸ Interfere · ۰۵ Joyful · ۰۱ Junction",
    swatches: [
      { color: "#F7F5F0", label: "کاغذ", weight: 5 },
      { color: "#FFFFFF", label: "کارت", weight: 2 },
      { color: "#0F5C5A", label: "برند", weight: 2 },
      { color: "#E8962E", label: "اقدام", weight: 1 },
    ],
    lines: [
      {
        label: "چیدمان",
        text: "وسط‌چین و تک‌ستونه؛ دو خط باریک عمودی کنار صفحه و نقطهٔ کوچک سر هر بخش. قهرمان صفحه یک «کارت تشخیص» واقعی‌نما (با برچسب نمونه) است.",
      },
      { label: "مقیاس حروف", text: "تیتر ۳۴ (موبایل) / ۵۶ (دسکتاپ) وزن ۷۰۰ · H2 ۲۶/۳۶ · متن ۱۷/۱۸ با ارتفاع خط ۲ · عددها ۴۸–۷۲ با وزن نازک ۳۰۰." },
      { label: "تراکم", text: "خیلی جادار: فاصلهٔ بخش‌ها ۶۴ (موبایل) / ۱۱۲ (دسکتاپ)، عرض متن حدود ۶۴۰." },
      {
        label: "عدد و اثبات",
        text: "ردیف سه عدد بزرگ و نازک با برچسب ریز و خط جداکننده (۷۲ ساعت · ۳ برابر · ۳ ماه). فقط قاعده‌های امروز، نه نتیجه.",
      },
      {
        label: "حرکت",
        text: "یک خط اسکن فیروزه‌ای یک بار از روی کارت تشخیص رد می‌شود ← ردیف ضعیف حلقهٔ نارنجی می‌گیرد ← پیشنهاد پلن با تیک می‌نشیند. فقط CSS.",
      },
    ],
    watch: "عدد نازک (۳۰۰) با قاعدهٔ وزن‌ها در DESIGN.md §۳ فرق دارد؛ فونت متغیر است و دانلود اضافه ندارد، ولی باید تأیید شود. رنگ کاغذ (#F7F5F0) توکن تازه است.",
  },
  {
    slug: "leak-map",
    name: "نقشهٔ نشتی",
    latin: "Leak Map",
    mood: "روایت‌محور و تصویری؛ مسیر مشتری را می‌کشد و نشتی را نشان می‌دهد",
    refs: "۲۸ Melius · ۳۲ Flowin · ۳۷ Spherical Waves · ۲۷ Bobbin",
    swatches: [
      { color: "#FFFFFF", label: "سطح", weight: 4 },
      { color: "#E7F1F0", label: "پنل روشن", weight: 3 },
      { color: "#0F5C5A", label: "برند", weight: 3 },
      { color: "#E8962E", label: "نشتی/اقدام", weight: 1 },
    ],
    lines: [
      {
        label: "چیدمان",
        text: "دوستونه در دسکتاپ (متن + نمودار مسیر مشتری)، پنل‌های گرد فیروزه‌ای روشن، «روش کار» روی یک مسیر عمودی با ایستگاه‌های شماره‌دار، شش مشکل به‌صورت آکاردئون.",
      },
      { label: "مقیاس حروف", text: "تیتر ۳۰ / ۴۴ وزن ۷۰۰ · H2 ۲۴/۳۲ · متن ۱۶/۱۷ با ارتفاع خط ۱٫۹ · برچسب‌های قرصی ۱۴." },
      { label: "تراکم", text: "متوسط: فاصلهٔ بخش‌ها ۵۶ / ۹۶؛ گوشه‌های گردتر (۱۶–۲۸) برای پنل‌ها، دکمه‌ها همان ۱۰." },
      {
        label: "عدد و اثبات",
        text: "عدد داخل جمله، پررنگ و با زمینهٔ کم‌رنگ («۷۲ ساعت وقت اعتراض…»)؛ بخش پرداخت برای نتیجه یک پنل برند تیره است.",
      },
      {
        label: "حرکت",
        text: "خط مسیر از راست به چپ کشیده می‌شود ← گره «تماس و پیام» با حلقهٔ خط‌چین نارنجی چکه می‌کند ← حلقهٔ فیروزه‌ای و تیک جایش را می‌گیرد ← جملهٔ شمارش نتیجه می‌آید. SVG + CSS.",
      },
    ],
    watch: "بیشترین شخصیت را دارد و برای حرکت اسکرولی مرحلهٔ ۷ (GSAP) آماده است؛ ولی نمودار باید روی موبایل خوانا بماند و ساختنش کمی بیشتر کار دارد.",
  },
  {
    slug: "ledger",
    name: "دفتر گزارش",
    latin: "Ledger",
    mood: "مثل گزارش یک مشاور جدی: شماره‌دار، خط‌کشی‌شده، دقیق",
    refs: "۶۳ Ghost · ۶۴ Cartesia · ۵۹ Zapier · ۲۱ Monarch · ۵۶ Treize grammes",
    swatches: [
      { color: "#FFFFFF", label: "سطح", weight: 5 },
      { color: "#0B4846", label: "برند تیره", weight: 2 },
      { color: "#1B2626", label: "جوهر", weight: 2 },
      { color: "#E8962E", label: "اقدام", weight: 1 },
    ],
    lines: [
      {
        label: "چیدمان",
        text: "راست‌چین؛ هر بخش یک شمارهٔ «۰۲ · روش کار» در ستون کناری دارد. ردیف‌های خط‌کشی‌شده به‌جای کارت، شش مشکل به شکل جدول دوستونه. قهرمان: کارت امتیاز با شش نوار.",
      },
      { label: "مقیاس حروف", text: "تیتر ۲۸ / ۴۰ وزن ۷۰۰ · H2 ۲۲/۲۸ · متن ۱۶ با ارتفاع خط ۱٫۸۵ · امتیاز ۶۴–۸۰ و عددها با وزن ۹۰۰." },
      { label: "تراکم", text: "فشرده ولی خوانا: فاصلهٔ بخش‌ها ۴۸ / ۷۲؛ بیشترین اطلاعات در هر صفحه‌نمایش." },
      {
        label: "عدد و اثبات",
        text: "عدد بزرگ و پررنگ با برچسب ریز (مثل Wise)، نوار امتیاز با برچسب «ضعیف‌ترین بخش»، قاعده‌ها در یک نوار برند تیره. چهرهٔ بنیان‌گذاران کنار «رزرو تماس».",
      },
      {
        label: "حرکت",
        text: "نوارهای امتیاز یکی‌یکی از راست پر می‌شوند ← ضعیف‌ترین نوار علامت می‌خورد ← امتیاز از ۰ تا ۶۲ با رقم فارسی می‌شمارد. فقط CSS.",
      },
    ],
    watch: "سریع‌ترین برای ساختن و نزدیک‌ترین به صفحهٔ پلن؛ ولی کمترین «حس برند» را دارد و ممکن است کمی خشک دیده شود.",
  },
];

const criteria = [
  { name: "اعتماد", q: "یک صاحب کلینیک ۴۵ ساله با این صفحه به ما پول می‌سپارد؟" },
  { name: "وضوح", q: "در ۳ ثانیه می‌دانم کجا را بزنم؟" },
  { name: "متمایز", q: "بدون لوگو هم آن را می‌شناسم؟" },
  { name: "فارسی", q: "متن فارسی طبیعی است، نه فشرده و نه انگلیسی‌شکل؟" },
  { name: "قابل ساخت", q: "تا ۷ آبان تمامش می‌کنیم؟" },
];

export default function DirectionsIndex() {
  return (
    <main className="min-h-screen bg-bg px-4 py-10 text-ink md:px-10 md:py-16">
      <div className="mx-auto max-w-[1120px]">
        <p className="text-sm font-medium text-brand">راهنمای ۲۴ · گام ۴٫۳</p>
        <h1 className="mt-2 text-[28px] font-bold leading-[1.6] md:text-4xl">سه جهت بصری برای roiyan.com</h1>
        <p className="mt-3 max-w-[720px] text-base leading-[1.9] text-muted-foreground">
          هر سه با همان متن صفحهٔ اصلی (content/home.md) ساخته شده‌اند و رنگ‌ها و فونت ثابت DESIGN.md را عوض نمی‌کنند. روی گوشی باز کنید، با جدول
          امتیاز پایین صفحه مقایسه کنید و دو جهت برتر را به مهدی نشان دهید. هیچ صفحهٔ واقعی تغییر نکرده است.
        </p>

        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {directions.map((d, i) => (
            <li key={d.slug} className="flex flex-col rounded-[12px] border border-border bg-surface">
              <div className="flex h-14 overflow-hidden rounded-t-[12px] border-b border-border" aria-hidden>
                {d.swatches.map((sw) => (
                  <span key={sw.label} style={{ background: sw.color, flexGrow: sw.weight }} className="border-e border-black/5 last:border-e-0" />
                ))}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-sm text-muted-foreground">
                  جهت {["الف", "ب", "ج"][i]} · <span dir="ltr">{d.latin}</span>
                </p>
                <h2 className="mt-1 text-2xl font-bold leading-10 text-brand">{d.name}</h2>
                <p className="text-sm leading-7 text-muted-foreground">{d.mood}</p>
                <dl className="mt-4 flex flex-col">
                  {d.lines.map((line) => (
                    <div key={line.label} className="border-t border-border py-3">
                      <dt className="text-sm font-bold">{line.label}</dt>
                      <dd className="mt-1 text-sm leading-7 text-ink/80">{line.text}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-2 rounded-[10px] bg-[#fdf4e8] p-3 text-sm leading-7 text-ink">
                  <strong>حواستان باشد:</strong> {d.watch}
                </p>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">مرجع‌ها: {d.refs}</p>
                <Link
                  href={`/kit/directions/${d.slug}`}
                  className="mt-5 inline-flex min-h-12 items-center justify-center rounded-[10px] border-2 border-brand px-5 font-medium text-brand hover:bg-brand-tint"
                >
                  پیش‌نمایش «{d.name}»
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <section className="mt-14">
          <h2 className="text-xl font-bold leading-9">جدول امتیاز (هر معیار ۱ تا ۵)</h2>
          <p className="mt-1 text-sm leading-7 text-muted-foreground">روی گوشی امتیاز بدهید؛ بیشترین جمع برنده است.</p>
          <div className="mt-4 overflow-x-auto rounded-[12px] border border-border bg-surface">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border text-start">
                  <th className="p-3 text-start font-bold">معیار</th>
                  {directions.map((d) => (
                    <th key={d.slug} className="p-3 text-center font-bold">
                      {d.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {criteria.map((c) => (
                  <tr key={c.name} className="border-b border-border last:border-b-0">
                    <td className="p-3 leading-7">
                      <strong>{c.name}</strong> <span className="text-muted-foreground">· {c.q}</span>
                    </td>
                    {directions.map((d) => (
                      <td key={d.slug} className="p-3 text-center text-muted-foreground">
                        _ / ۵
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
