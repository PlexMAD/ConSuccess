import { Heading } from "@/app/_components/typography/Heading";

const AboutPage = () => {
  return (
    <>
      <Heading title="О продукте" />
      <div className="flex flex-col gap-9 max-w-2xl">
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
            {[
              {
                title: "Материалы по предметам",
                desc: "Конспекты, заметки и файлы по любому курсу",
              },
              {
                title: "Фотографии и файлы",
                desc: "Прикрепляйте до 5 изображений к каждому материалу",
              },
              {
                title: "Избранное",
                desc: "Сохраняйте полезные материалы, чтобы вернуться к ним позже",
              },
              {
                title: "Поиск по вузам",
                desc: "Университеты из разных городов в одном каталоге",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-neutral-200 bg-white p-4 flex flex-col gap-1"
              >
                <p className="text-sm font-semibold text-slate-800">
                  {item.title}
                </p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            ))}
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
