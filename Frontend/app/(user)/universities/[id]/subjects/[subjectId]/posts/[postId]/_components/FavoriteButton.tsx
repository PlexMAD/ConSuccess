"use client";

import axios from "axios";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const FavoriteButton = ({
  postId,
  initialIsFavorited,
}: {
  postId: number;
  initialIsFavorited: boolean;
}) => {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    try {
      if (isFavorited) {
        await axios.delete(`/api/favorites/${postId}`);
        toast.success("Убрано из избранного");
      } else {
        await axios.post(`/api/favorites/${postId}`);
        toast.success("Добавлено в избранное");
      }
      setIsFavorited((prev) => !prev);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      title={isFavorited ? "Убрать из избранного" : "Добавить в избранное"}
      className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition disabled:opacity-50 ${isFavorited ? "border-blue-200 bg-blue-50 text-blue-600 hover:border-red-200 hover:bg-red-50 hover:text-red-500" : "border-neutral-200 bg-white text-neutral-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"}`}
    >
      <Star
        size={16}
        className={isFavorited ? "fill-current stroke-current" : "stroke-current fill-none"}
      />
      {isFavorited ? "Убрать из избранного" : "В избранное"}
    </button>
  );
};

export default FavoriteButton;
