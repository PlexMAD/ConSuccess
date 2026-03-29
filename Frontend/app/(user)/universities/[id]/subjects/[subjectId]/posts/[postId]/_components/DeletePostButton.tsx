"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeletePostButton = ({
  postId,
  subjectId,
  backHref,
}: {
  postId: number;
  subjectId: string;
  backHref: string;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      await axios.delete(`/api/subjects/${subjectId}/posts/${postId}`);
      toast.success("Пост удалён");
      router.push(backHref);
    } catch {
      toast.error("Не удалось удалить пост");
      setDeleting(false);
      setOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-red-500 hover:text-red-700 transition"
      >
        Удалить
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => !deleting && setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-semibold">Удалить пост?</h2>
              <p className="text-sm text-neutral-500">
                Это действие нельзя отменить.
              </p>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setOpen(false)}
                disabled={deleting}
                className="px-4 py-2 rounded-lg border border-neutral-200 text-sm hover:bg-neutral-50 transition disabled:opacity-50"
              >
                Отмена
              </button>
              <button
                onClick={handleConfirm}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition disabled:opacity-50"
              >
                {deleting ? "Удаление..." : "Удалить"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePostButton;
