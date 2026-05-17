"use client";

import axios from "axios";
import { Lock, Unlock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const PostPrivacyToggleButton = ({
  postId,
  subjectId,
  isPrivate,
  onChange,
}: {
  postId: number;
  subjectId: string;
  isPrivate: boolean;
  onChange: (isPrivate: boolean) => void;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const nextIsPrivate = !isPrivate;
  const Icon = isPrivate ? Unlock : Lock;

  const toggle = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/subjects/${subjectId}/posts/${postId}/privacy`, {
        isPrivate: nextIsPrivate,
      });
      onChange(nextIsPrivate);
      toast.success(
        nextIsPrivate ? "Пост стал личным" : "Пост стал публичным",
      );
      router.refresh();
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Не удалось изменить доступ";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-500 transition hover:border-primary hover:text-primary disabled:opacity-50"
    >
      <Icon aria-hidden="true" size={16} />
      {isPrivate ? "Сделать публичным" : "Сделать личным"}
    </button>
  );
};

export default PostPrivacyToggleButton;
