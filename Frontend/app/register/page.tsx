"use client";

import { registerUser } from "@/shared/api/auth";
import axios from "axios";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type RegisterFields = {
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>({
    defaultValues: { username: "", password: "", confirmPassword: "" },
  });

  const onSubmit: SubmitHandler<RegisterFields> = async ({ username, password }) => {
    try {
      const result = await registerUser({ username, password });

      if (result.ok) {
        window.location.assign("/");
      } else {
        setError("root", { message: (result as { message: string }).message });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setError("username", {
          message: error.response.data?.message ?? "Пользователь с таким логином уже существует",
        });
      } else {
        setError("root", { message: "Произошла ошибка. Попробуйте ещё раз." });
      }
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-md items-center justify-center px-4 py-10">
      <div className="w-full rounded-3xl bg-white p-8 shadow-md">
        <Link
          href="/login"
          className="mb-6 inline-block text-sm text-neutral-500 hover:text-neutral-800 transition"
        >
          ← Назад
        </Link>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Регистрация</h1>
          <p className="mt-2 text-sm text-slate-500">Создайте аккаунт ConSuccess</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {errors.root && (
            <p className="text-sm text-red-500">{errors.root.message}</p>
          )}

          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-slate-700">
              Логин
            </label>
            <input
              id="username"
              type="text"
              placeholder="Придумайте логин"
              {...register("username", { required: "Введите логин" })}
              className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              placeholder="Придумайте пароль"
              {...register("password", { required: "Введите пароль" })}
              className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
              Подтвердите пароль
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Повторите пароль"
              {...register("confirmPassword", {
                required: "Подтвердите пароль",
                validate: (v) => v === getValues("password") || "Пароли не совпадают",
              })}
              className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-2xl cursor-pointer bg-sky-600 text-sm font-semibold text-white transition hover:bg-sky-700 active:scale-[0.99] disabled:opacity-60"
          >
            {isSubmitting ? "Создание..." : "Создать аккаунт"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
