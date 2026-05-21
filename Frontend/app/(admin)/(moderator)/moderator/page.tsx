import { Heading } from "@/app/_components/typography/Heading";
import Link from "next/link";

const moderatorSections = [
  {
    title: "Все посты",
    href: "/moderator/posts",
    description: "Список всех постов с возможностью скрытия и восстановления",
  },
  {
    title: "Заявки преподавателей",
    href: "/moderator/teacher-applications",
    description: "Проверка документов и выдача роли преподавателя",
  },
];

const ModeratorGatewayPage = () => {
  return (
    <div className="flex flex-col gap-1 max-w-2xl">
      <Link
        href="/"
        className="self-start text-sm text-neutral-500 hover:text-neutral-800 transition"
      >
        ← Назад
      </Link>
      <Heading title="Панель модератора" />
      <p className="text-sm text-slate-500 -mt-3 mb-6">Выберите раздел для проверки</p>

      <div className="grid gap-4">
        {moderatorSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="flex flex-col gap-1.5 rounded-2xl bg-white p-5 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="font-semibold text-slate-900">
              {section.title} →
            </span>
            <span className="text-sm text-slate-500">{section.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ModeratorGatewayPage;
