"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  title: string;
  body: string;
};

const AddKnowledgePostForm = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setImages((prev) => [...prev, ...files].slice(0, 5));
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("body", values.body);
      images.forEach((img) => formData.append("images", img));

      await axios.post("/api/knowledge-posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Материал опубликован");
      router.push("/knowledge");
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Что-то пошло не так";
      setError("root", { message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-6xl flex flex-col gap-4 ml-1"
    >
      <Link
        href="/knowledge"
        className="self-start text-sm text-neutral-500 hover:text-neutral-800 transition"
      >
        ← Назад
      </Link>

      <h1 className="text-2xl font-semibold font-geist">Добавить материал</h1>

      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Заголовок</label>
        <input
          {...register("title", {
            required: "Введите заголовок",
            maxLength: { value: 60, message: "Не более 60 символов" },
          })}
          placeholder="Введите заголовок..."
          className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.title && (
          <p className="text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Текст</label>
        <textarea
          {...register("body", {
            required: "Введите текст",
            maxLength: { value: 5000, message: "Не более 5000 символов" },
          })}
          placeholder="Введите текст..."
          rows={8}
          className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
        {errors.body && (
          <p className="text-xs text-red-500">{errors.body.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">
          Изображения{" "}
          <span className="text-neutral-400 font-normal">
            ({images.length}/5)
          </span>
        </label>

        {images.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {images.map((img, i) => (
              <div key={i} className="relative w-20 h-20">
                <Image
                  src={URL.createObjectURL(img)}
                  alt={img.name}
                  fill
                  unoptimized
                  className="object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {images.length < 5 && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="self-start px-3 py-2 rounded-lg border border-dashed border-gray-300 text-sm text-neutral-500 hover:border-primary hover:text-primary transition"
            >
              + Добавить изображения
            </button>
          </>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition disabled:opacity-50"
      >
        {isSubmitting ? "Публикация..." : "Опубликовать"}
      </button>
    </form>
  );
};

export default AddKnowledgePostForm;
