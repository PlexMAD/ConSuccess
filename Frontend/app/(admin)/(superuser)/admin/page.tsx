import { Heading } from "@/app/_components/typography/Heading";
import Link from "next/link";

const adminSections = [
  {
    title: "Управление пользователями",
    href: "/admin/users",
    description: "Просмотр и изменение ролей всех зарегистрированных пользователей",
  },
  {
    title: "Все посты",
    href: "/moderator/posts",
    description: "Список всех опубликованных постов с возможностью удаления",
  },
];

const AdminGatewayPage = () => {
  return (
    <div className="flex flex-col gap-1 max-w-2xl">
      <Heading title="Панель администратора" />
      <p className="text-sm text-slate-500 -mt-3 mb-6">Выберите раздел для управления</p>

      <div className="grid gap-4">
        {adminSections.map((section) => (
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

export default AdminGatewayPage;