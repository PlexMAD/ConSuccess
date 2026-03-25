"use client";

import { checkMe, loginUser } from "@/shared/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type UserCreds = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();

  const fetchMe = useCallback(async () => {
    const me = await checkMe();
    if (me.user) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreds>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<UserCreds> = async (data) => {
    try {
      const result = await loginUser(data);

      if (result.ok) {
        window.location.reload();
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-md items-center justify-center px-4 py-10">
      <div className="w-full rounded-3xl bg-white p-8 shadow-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Вход</h1>
          <p className="mt-2 text-sm text-slate-500">
            Войдите в аккаунт ConSuccess
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-700"
            >
              Логин
            </label>
            <input
              id="username"
              type="text"
              placeholder="Введите логин"
              {...register("username", {
                required: "Введите логин",
              })}
              className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Пароль
            </label>
            <input
              id="password"
              type="password"
              placeholder="Введите пароль"
              {...register("password", {
                required: "Введите пароль",
              })}
              className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="h-12 w-full rounded-2xl cursor-pointer bg-sky-600 text-sm font-semibold text-white transition hover:bg-sky-700 active:scale-[0.99]"
          >
            Войти
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          <span>Нет аккаунта?</span>
          <Link
            href="/register"
            className="text-sky-600 hover:underline font-medium block"
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
