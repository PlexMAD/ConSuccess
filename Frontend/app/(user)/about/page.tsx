import { Heading } from "@/app/_components/typography/Heading";
import Link from "next/link";

const features = [
  {
    title: "Материалы по предметам",
    desc: "Конспекты, заметки и файлы по любому курсу",
    href: "/universities",
  },
  {
    title: "Знания",
    desc: "Полезные материалы, гайды и анонсы не привязанные к конкретному предмету",
    href: "/knowledge",
  },
  {
    title: "Избранное",
    desc: "Сохраняйте полезные материалы, чтобы вернуться к ним позже",
    href: null,
  },
  {
    title: "Поиск по вузам",
    desc: "Университеты из разных городов в одном каталоге",
    href: "/universities",
  },
];

const AboutPage = () => {
  return (
    <>
      <Heading title="О продукте" />
      <div className="flex flex-col gap-6 max-w-2xl">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-slate-900">
            Что такое ConSuccess?
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            ConSuccess — это платформа для студентов, где можно найти учебные
            материалы, конспекты и заметки по предметам различных университетов.
            Всё в одном месте, без лишнего шума.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-slate-900">
            Как это работает?
          </h2>
          <ul className="flex flex-col gap-2">
            {[
              "Выберите университет из списка",
              "Откройте нужный предмет",
              "Просматривайте материалы, оставленные другими студентами",
              "Делитесь своими конспектами и заметками",
            ].map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-slate-600"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-semibold">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Возможности</h2>
          <div className="grid grid-cols-2 gap-3">
            {features.map((item) => {
              const card = (
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-slate-800">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                  {item.href && (
                    <span className="mt-1 text-xs font-medium text-primary">
                      Перейти →
                    </span>
                  )}
                </div>
              );

              return item.href ? (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-xl border border-neutral-200 bg-white p-4 hover:border-primary hover:shadow-sm transition"
                >
                  {card}
                </Link>
              ) : (
                <div
                  key={item.title}
                  className="rounded-xl border border-neutral-200 bg-white p-4"
                >
                  {card}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-slate-900">Для кого?</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Для студентов, которые хотят учиться эффективнее — делясь
            материалами друг с другом и находя нужное за секунды, а не часы.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
