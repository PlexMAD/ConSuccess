import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <span className="text-8xl font-bold text-primary font-geist">404</span>
        <h1 className="text-2xl font-bold text-slate-900">Страница не найдена</h1>
        <p className="text-sm text-slate-500 max-w-xs">
          Возможно, пост был удалён или ссылка устарела
        </p>
      </div>

      <Link
        href="/"
        className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
      >
        На главную
      </Link>
    </div>
  );
}