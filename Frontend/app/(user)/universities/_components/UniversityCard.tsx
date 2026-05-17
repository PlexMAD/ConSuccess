"use client";

import { apiURL } from "@/shared/api/config";
import { University } from "@/shared/types/universities";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";

const UniversityCard = ({
  university,
  canEditAvatar,
}: {
  university: University;
  canEditAvatar: boolean;
}) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState(university.avatar);
  const [isUploading, setIsUploading] = useState(false);

  const openFilePicker = () => {
    if (!canEditAvatar || isUploading) return;
    inputRef.current?.click();
  };

  const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    setIsUploading(true);
    try {
      const { data } = await axios.patch<University>(
        `/api/universities/${university.id}/avatar`,
        formData,
      );
      setAvatar(data.avatar);
      toast.success("Логотип вуза обновлен");
      router.refresh();
    } catch (error) {
      const message =
        axios.isAxiosError<{ message?: string }>(error) &&
        error.response?.data?.message
          ? error.response.data.message
          : "Не удалось обновить логотип";
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <li className="list-none">
      <div className="flex h-full min-h-45 w-full flex-col rounded-2xl bg-white p-5 text-left shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <button
          type="button"
          onClick={openFilePicker}
          disabled={!canEditAvatar || isUploading}
          title={canEditAvatar ? "Изменить логотип" : undefined}
          className="mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-slate-100 transition hover:ring-2 hover:ring-primary/40 disabled:cursor-default disabled:hover:ring-0"
        >
          {avatar ? (
            <Image
              src={`${apiURL}${avatar}`}
              alt={university.name}
              width={56}
              height={56}
              unoptimized
              className={`h-full w-full object-contain ${isUploading ? "opacity-50" : ""}`}
            />
          ) : (
            <span className="text-sm text-slate-400">
              {isUploading ? "..." : "Лого"}
            </span>
          )}
        </button>

        {canEditAvatar && (
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={uploadAvatar}
          />
        )}

        <div className="flex flex-1 flex-col">
          <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-5 text-slate-900">
            {university.name}
          </h3>

          <p className="text-sm text-slate-500">{university.city.name}</p>
        </div>

        <Link
          className="mt-4 text-sm font-medium text-primary"
          href={`/universities/${university.id}`}
        >
          Открыть материалы →
        </Link>
      </div>
    </li>
  );
};

export default UniversityCard;
