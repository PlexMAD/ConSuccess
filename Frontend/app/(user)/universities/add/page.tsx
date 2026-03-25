"use client";

import { fetchCities } from "@/shared/api/cities";
import { City } from "@/shared/types/universities";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  cityId: number;
};

const AddUniversityPage = () => {
  const router = useRouter();
  const [cities, setCities] = useState<City[]>([]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  useEffect(() => {
    fetchCities().then(setCities).catch(console.error);
  }, []);

  const onSubmit = async (values: FormValues) => {
    try {
      await axios.post("/api/universities", {
        name: values.name,
        cityId: Number(values.cityId),
      });
      router.push("/universities");
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Что-то пошло не так";
      setError("root", { message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md flex flex-col gap-4 ml-1">
      <Link href="/universities" className="self-start text-sm text-neutral-500 hover:text-neutral-800 transition">
        ← Назад
      </Link>
      <h1 className="text-2xl font-semibold font-geist">Добавить университет</h1>

      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Название университета</label>
        <input
          {...register("name", { required: "Введите название" })}
          placeholder="Введите название..."
          className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Город</label>
        <select
          {...register("cityId", { required: "Выберите город", validate: (v) => Number(v) !== 0 || "Выберите город" })}
          defaultValue=""
          className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="" disabled>Выберите город</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        {errors.cityId && (
          <p className="text-xs text-red-500">{errors.cityId.message}</p>
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

export default AddUniversityPage;
