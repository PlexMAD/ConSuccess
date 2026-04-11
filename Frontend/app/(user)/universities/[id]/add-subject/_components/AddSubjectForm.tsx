"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  name: string;
};

const AddSubjectForm = ({
  universityId,
  universityName,
}: {
  universityId: string;
  universityName: string;
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    try {
      await axios.post(`/api/universities/${universityId}/subjects`, { name: values.name });
      toast.success("Предмет добавлен");
      router.push(`/universities/${universityId}`);
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Что-то пошло не так";
      setError("root", { message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full flex flex-col gap-4">
      <Link
        href={`/universities/${universityId}`}
        className="self-start text-sm text-neutral-500 hover:text-neutral-800 transition"
      >
        ← Назад
      </Link>

      <div>
        <h1 className="text-2xl font-semibold font-geist">Добавить предмет</h1>
        <p className="text-sm text-neutral-500">{universityName}</p>
      </div>

      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Название предмета</label>
        <input
          {...register("name", { required: "Введите название", maxLength: { value: 100, message: "Не более 100 символов" } })}
          placeholder="Введите название..."
          className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition disabled:opacity-50"
      >
        {isSubmitting ? "Добавление..." : "Добавить"}
      </button>
    </form>
  );
};

export default AddSubjectForm;
