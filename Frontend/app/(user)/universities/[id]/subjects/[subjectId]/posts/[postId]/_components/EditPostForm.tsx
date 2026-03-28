"use client";

import { apiURL } from "@/shared/api/config";
import { Attachment } from "@/shared/types/universities";
import axios from "axios";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormValues = {
  title: string;
  body: string;
};

const EditPostForm = ({
  postId,
  subjectId,
  initialTitle,
  initialBody,
  attachments,
  onCancel,
}: {
  postId: number;
  subjectId: string;
  initialTitle: string;
  initialBody: string;
  attachments: Attachment[];
  onCancel: () => void;
}) => {
  const router = useRouter();
  const [keepAttachmentIds, setKeepAttachmentIds] = useState<number[]>(
    attachments.map((a) => a.id),
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { title: initialTitle, body: initialBody },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const remaining = 5 - keepAttachmentIds.length - newImages.length;
    setNewImages((prev) => [...prev, ...files].slice(0, prev.length + remaining));
    e.target.value = "";
  };

  const removeExisting = (id: number) => {
    setKeepAttachmentIds((prev) => prev.filter((i) => i !== id));
  };

  const removeNew = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("body", values.body);
      keepAttachmentIds.forEach((id) =>
        formData.append("keepAttachmentIds", String(id)),
      );
      newImages.forEach((img) => formData.append("images", img));

      await axios.patch(
        `/api/subjects/${subjectId}/posts/${postId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      onCancel();
      router.refresh();
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Что-то пошло не так";
      setError("root", { message });
    }
  };

  const keptAttachments = attachments.filter((a) =>
    keepAttachmentIds.includes(a.id),
  );
  const totalImages = keepAttachmentIds.length + newImages.length;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onCancel}
        className="self-start text-sm text-neutral-500 hover:text-neutral-800 transition"
      >
        ← Отмена
      </button>

      <h1 className="text-2xl font-semibold">Редактировать пост</h1>

      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Заголовок</label>
        <input
          {...register("title", { required: "Введите заголовок" })}
          className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.title && (
          <p className="text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Текст</label>
        <textarea
          {...register("body", { required: "Введите текст" })}
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
          <span className="text-neutral-400 font-normal">({totalImages}/5)</span>
        </label>

        {(keptAttachments.length > 0 || newImages.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {keptAttachments.map((att) => (
              <div key={att.id} className="relative w-20 h-20">
                <Image
                  src={`${apiURL}${att.url}`}
                  alt="изображение"
                  fill
                  unoptimized
                  className="object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeExisting(att.id)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs"
                >
                  ×
                </button>
              </div>
            ))}
            {newImages.map((img, i) => (
              <div key={`new-${i}`} className="relative w-20 h-20">
                <Image
                  src={URL.createObjectURL(img)}
                  alt={img.name}
                  fill
                  unoptimized
                  className="object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeNew(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {totalImages < 5 && (
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

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {isSubmitting ? "Сохранение..." : "Сохранить"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-neutral-200 text-sm hover:bg-neutral-50 transition"
        >
          Отмена
        </button>
      </div>
    </form>
  );
};

export default EditPostForm;
