"use client";

import { FavoritePost } from "@/shared/types/favorites";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Star } from "../../_icons";

const FavoritesSidebar = ({ initialFavorites }: { initialFavorites: FavoritePost[] }) => {
  const router = useRouter();
  const [favorites, setFavorites] = useState(initialFavorites);

  useEffect(() => {
    setFavorites(initialFavorites);
  }, [initialFavorites]);

  const remove = async (postId: number) => {
    setFavorites((prev) => prev.filter((f) => f.postId !== postId));
    try {
      await axios.delete(`/api/favorites/${postId}`);
      toast.success("Убрано из избранного");
      router.refresh();
    } catch {
      setFavorites(initialFavorites);
      toast.error("Не удалось убрать из избранного");
    }
  };

  return (
    <div className="rounded-4xl h-full bg-white w-50 mr-5 flex flex-col shrink-0 overflow-hidden">
      <div className="bg-orange-400 w-full h-15 rounded-t-4xl flex items-center justify-center shrink-0">
        <span className="flex items-center gap-3 text-white text-xl font-bold">
          <Image src={Star} width={32} height={32} alt="star" />
          Избранное
        </span>
      </div>

      <div className="flex flex-col gap-2 p-3 overflow-y-auto">
        {favorites.length === 0 ? (
          <p className="text-xs text-neutral-400 text-center mt-3">
            Нет избранных
          </p>
        ) : (
          favorites.map((fav) => {
            const href = fav.post.subject
              ? `/universities/${fav.post.subject.universityId}/subjects/${fav.post.subjectId}/posts/${fav.post.id}`
              : `/knowledge/posts/${fav.post.id}`;

            return (
              <div key={fav.postId} className="group relative flex flex-col gap-1.5 rounded-2xl bg-white shadow-md p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                <button
                  onClick={() => remove(fav.postId)}
                  title="Убрать из избранного"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-neutral-300 hover:text-red-400 transition text-xs leading-none"
                >
                  ✕
                </button>
                <p className="text-xs font-semibold text-slate-900 line-clamp-2 leading-snug pr-3">
                  {fav.post.title}
                </p>
                <Link href={href} className="text-xs font-medium text-primary mt-auto">
                  Открыть →
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FavoritesSidebar;
