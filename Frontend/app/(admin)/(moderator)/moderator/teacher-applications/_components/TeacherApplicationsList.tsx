"use client";

import { apiURL } from "@/shared/api/config";
import { TeacherApplication } from "@/shared/types/teacher-applications";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_LABELS = {
  PENDING: "На проверке",
  APPROVED: "Одобрена",
} as const;

const STATUS_COLORS = {
  PENDING: "bg-amber-50 text-amber-700",
  APPROVED: "bg-emerald-50 text-emerald-700",
} as const;

const TeacherApplicationsList = ({
  initialApplications,
}: {
  initialApplications: TeacherApplication[];
}) => {
  const router = useRouter();
  const [applications, setApplications] = useState(initialApplications);
  const [loading, setLoading] = useState<number | null>(null);

  const approveApplication = async (id: number) => {
    setLoading(id);

    try {
      const res = await fetch(`/api/teacher-applications/${id}/approve`, {
        method: "PATCH",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Не удалось одобрить заявку");
      }

      const updated = (await res.json()) as TeacherApplication;
      setApplications((prev) => prev.map((item) => (item.id === id ? updated : item)));
      toast.success("Роль преподавателя выдана");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Не удалось одобрить заявку");
    } finally {
      setLoading(null);
    }
  };

  if (applications.length === 0) {
    return <p className="text-sm text-slate-400">Заявок пока нет</p>;
  }

  return (
    <div className="grid gap-4">
      {applications.map((application) => {
        const user = application.user;
        const isPending = application.status === "PENDING";

        return (
          <article
            key={application.id}
            className="grid gap-4 rounded-2xl bg-white p-4 shadow-md md:grid-cols-[minmax(0,1fr)_280px]"
          >
            <div className="flex min-w-0 flex-col gap-4">
              <div className="flex items-start gap-3">
                {user?.avatar ? (
                  <Image
                    src={`${apiURL}${user.avatar}`}
                    alt={user.username}
                    width={40}
                    height={40}
                    unoptimized
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
                    {user?.username?.[0]?.toUpperCase() ?? "?"}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-900">
                      {application.fullName}
                    </span>
                    <span className={`rounded-lg px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[application.status]}`}>
                      {STATUS_LABELS[application.status]}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">
                    {user?.username ?? "Пользователь"} · {new Date(application.createdAt).toLocaleDateString("ru-RU")}
                  </p>
                </div>
              </div>

              <div className="grid gap-2 text-sm">
                <div>
                  <p className="text-xs text-slate-400">ФИО</p>
                  <p className="font-medium text-slate-900">{application.fullName}</p>
                </div>
                {application.reviewedAt && (
                  <p className="text-xs text-slate-400">
                    Одобрена {new Date(application.reviewedAt).toLocaleDateString("ru-RU")}
                    {application.reviewer ? ` · ${application.reviewer.username}` : ""}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`${apiURL}${application.documentUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Открыть оригинал →
                </a>
                {isPending ? (
                  <button
                    onClick={() => approveApplication(application.id)}
                    disabled={loading === application.id}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-50"
                  >
                    {loading === application.id ? "Одобрение..." : "Одобрить"}
                  </button>
                ) : (
                  <span className="text-sm text-emerald-700">Роль выдана</span>
                )}
              </div>
            </div>

            <div className="relative h-56 overflow-hidden rounded-xl bg-slate-50 md:h-full md:min-h-56">
              <Image
                src={`${apiURL}${application.documentUrl}`}
                alt={application.fullName}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default TeacherApplicationsList;
