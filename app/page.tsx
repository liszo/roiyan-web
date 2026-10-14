import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-6 px-4 py-16">
      <h1 className="text-3xl font-bold leading-relaxed text-brand">
        رشد کسب‌وکار شما، با تشخیص دقیق
      </h1>
      <p className="max-w-prose text-lg leading-9 text-muted-foreground">
        برنامه رشد شخصی‌سازی‌شده شما از ۱۲۳٬۴۵۶ تومان در ماه شروع می‌شود.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button>مشاهده نمونه</Button>
        <Button variant="action">شروع تشخیص رایگان</Button>
      </div>
    </main>
  );
}
