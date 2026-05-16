"use client";

import axios from "axios";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LikeButton = ({
  postId,
  initialIsLiked,
  initialLikesCount,
}: {
  postId: number;
  initialIsLiked: boolean;
  initialLikesCount: number;
}) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLiked(initialIsLiked);
    setLikesCount(initialLikesCount);
  }, [initialIsLiked, initialLikesCount]);

  const toggle = async () => {
    setLoading(true);
    try {
      if (isLiked) {
        await axios.delete(`/api/likes/${postId}`);
        setIsLiked(false);
        setLikesCount((count) => Math.max(0, count - 1));
        toast.success("Лайк убран");
      } else {
        await axios.post(`/api/likes/${postId}`);
        setIsLiked(true);
        setLikesCount((count) => count + 1);
        toast.success("Пост понравился");
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      title={isLiked ? "Убрать лайк" : "Лайкнуть пост"}
      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition disabled:opacity-50 ${
        isLiked
          ? "border-red-200 bg-red-50 text-red-600 hover:border-neutral-200 hover:bg-white hover:text-neutral-500"
          : "border-neutral-200 bg-white text-neutral-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      }`}
    >
      <Heart
        size={16}
        className={isLiked ? "fill-current stroke-current" : "fill-none stroke-current"}
      />
      {likesCount}
    </button>
  );
};

export default LikeButton;
