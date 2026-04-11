"use client";

import { ConSuccessLogo } from "@/app/_icons";
import { FavoritePost } from "@/shared/types/favorites";
import axios from "axios";
import { Menu, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const NAV_LINKS = [
  { href: "/", title: "Главная" },
  { href: "/universities", title: "Вузы" },
  { href: "/knowledge", title: "Знания" },
  { href: "/about", title: "О продукте" },
] as const;

const PAGE_SIZE = 5;

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const [favorites, setFavorites] = useState<FavoritePost[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<FavoritePost[]>("/api/favorites");
      setFavorites(data);
    } catch {
      // not logged in — no favorites
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      setVisibleCount(PAGE_SIZE);
      loadFavorites();
    }
  }, [open, loadFavorites]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCount < favorites.length) {
          setVisibleCount((prev) => prev + PAGE_SIZE);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleCount, favorites.length]);

  const removeFavorite = async (postId: number) => {
    setFavorites((prev) => prev.filter((f) => f.postId !== postId));
    try {
      await axios.delete(`/api/favorites/${postId}`);
      toast.success("Убрано из избранного");
      router.refresh();
    } catch {
      loadFavorites();
      toast.error("Не удалось убрать из избранного");
    }
  };

  const visibleFavorites = favorites.slice(0, visibleCount);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden cursor-pointer p-1"
        aria-label="Открыть меню"
      >
        <Menu size={28} className="text-primary" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b shrink-0">
          <Image alt="logo" src={ConSuccessLogo} className="shrink-0" />
          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer p-1"
            aria-label="Закрыть меню"
          >
            <X size={24} className="text-neutral-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-4">
            <ul className="flex flex-col gap-1 font-geist uppercase">
              {NAV_LINKS.map(({ href, title }) => {
                const isActive =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`block px-4 py-3 rounded-xl text-lg font-semibold transition-colors duration-150 ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-primary hover:bg-primary/10"
                      }`}
                    >
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t mx-4" />

          <div className="px-4 py-4">
            <div className="flex items-center gap-2 mb-3">
              <Star size={20} className="text-orange-400 fill-orange-400" />
              <span className="font-bold text-orange-400 text-base text-left">Избранное</span>
            </div>

            {loading ? (
              <p className="text-xs text-neutral-400 text-center py-4">Загрузка...</p>
            ) : favorites.length === 0 ? (
              <p className="text-xs text-neutral-400 text-center py-4">Нет избранных</p>
            ) : (
              <div className="flex flex-col gap-2">
                {visibleFavorites.map((fav) => {
                  const href = fav.post.subject
                    ? `/universities/${fav.post.subject.universityId}/subjects/${fav.post.subjectId}/posts/${fav.post.id}`
                    : `/knowledge/posts/${fav.post.id}`;

                  return (
                    <div
                      key={fav.postId}
                      className="group relative flex flex-col gap-1.5 rounded-2xl bg-white shadow-md p-3"
                    >
                      <button
                        onClick={() => removeFavorite(fav.postId)}
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
                })}

                <div ref={sentinelRef} className="h-2" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
