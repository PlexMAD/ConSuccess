"use client";

import { apiURL } from "@/shared/api/config";
import { TeacherApplication } from "@/shared/types/teacher-applications";
import { Role } from "@/shared/types/users";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  fullName: string;
};

const STATUS_LABELS = {
  PENDING: "На проверке",
  APPROVED: "Одобрена",
} as const;

const TeacherApplicationForm = ({
  currentRole,
  initialApplication,
}: {
  currentRole: Role;
  initialApplication: TeacherApplication | null;
}) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [application, setApplication] = useState(initialApplication);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentPreview, setDocumentPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setDocumentFile(file);
    setDocumentPreview(file ? URL.createObjectURL(file) : null);
  };

  const onSubmit = async (values: FormValues) => {
    if (!documentFile) {
      setError("root", { message: "Загрузите подтверждающий документ" });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("document", documentFile);

      const { data } = await axios.post<TeacherApplication>(
        "/api/teacher-applications",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      setApplication(data);
      setDocumentFile(null);
      setDocumentPreview(null);
      toast.success("Заявка отправлена");
      router.refresh();
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Не удалось отправить заявку";
      setError("root", { message });
    }
  };

  if (currentRole === "TEACHER") {
    return (
      <div className="max-w-xl flex flex-col gap-4">
        <Link href="/" className="self-start text-sm text-neutral-500 hover:text-neutral-800 transition">
          ← Назад
        </Link>
        <h1 className="text-2xl font-semibold font-geist">Заявка преподавателя</h1>
        <div className="rounded-2xl bg-white p-5 shadow-md">
          <p className="text-sm text-slate-600">
            Роль преподавателя уже активна в вашем профиле.
          </p>
        </div>
      </div>
    );
  }

  if (currentRole !== "USER") {
    return (
      <div className="max-w-xl flex flex-col gap-4">
        <Link href="/" className="self-start text-sm text-neutral-500 hover:text-neutral-800 transition">
          ← Назад
        </Link>
        <h1 className="text-2xl font-semibold font-geist">Заявка преподавателя</h1>
        <div className="rounded-2xl bg-white p-5 shadow-md">
          <p className="text-sm text-slate-600">
            Для вашей роли заявка на преподавателя не требуется.
          </p>
        </div>
      </div>
    );
  }

  if (application) {
    return (
      <div className="max-w-xl flex flex-col gap-4">
        <Link href="/" className="self-start text-sm text-neutral-500 hover:text-neutral-800 transition">
          ← Назад
        </Link>
        <h1 className="text-2xl font-semibold font-geist">Заявка преподавателя</h1>
        <div className="rounded-2xl bg-white p-5 shadow-md flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-primary">
              {STATUS_LABELS[application.status]}
            </span>
            <span className="text-xs text-slate-400">
              {new Date(application.createdAt).toLocaleDateString("ru-RU")}
            </span>
          </div>
          <div>
            <p className="text-xs text-slate-400">ФИО</p>
            <p className="font-semibold text-slate-900">{application.fullName}</p>
          </div>
          <div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-50">
            <Image
              src={`${apiURL}${application.documentUrl}`}
              alt={application.fullName}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          {application.reviewedAt && (
            <p className="text-xs text-slate-400">
              Рассмотрена {new Date(application.reviewedAt).toLocaleDateString("ru-RU")}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full flex flex-col gap-4">
      <Link href="/" className="self-start text-sm text-neutral-500 hover:text-neutral-800 transition">
        ← Назад
      </Link>
      <h1 className="text-2xl font-semibold font-geist">Заявка преподавателя</h1>

      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">ФИО</label>
        <input
          {...register("fullName", {
            required: "Введите ФИО",
            minLength: { value: 5, message: "Введите ФИО полностью" },
            maxLength: { value: 160, message: "Не более 160 символов" },
          })}
          placeholder="Иванов Иван Иванович"
          className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.fullName && (
          <p className="text-xs text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Подтверждающий документ</label>
        <div className="flex items-center gap-4">
          {documentPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={documentPreview}
              alt="Предпросмотр документа"
              className="h-20 w-20 rounded-xl object-contain bg-slate-100"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-400">
              Фото
            </div>
          )}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-slate-50 transition"
            >
              {documentPreview ? "Изменить" : "Загрузить"}
            </button>
            {documentPreview && (
              <button
                type="button"
                onClick={() => {
                  setDocumentFile(null);
                  setDocumentPreview(null);
                }}
                className="self-start text-sm text-red-500 hover:underline"
              >
                Удалить
              </button>
            )}
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleDocumentChange}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition disabled:opacity-50"
      >
        {isSubmitting ? "Отправка..." : "Отправить заявку"}
      </button>
    </form>
  );
};

export default TeacherApplicationForm;
