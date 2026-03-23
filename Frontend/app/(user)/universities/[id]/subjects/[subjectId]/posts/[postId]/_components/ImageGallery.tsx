"use client";

import { apiURL } from "@/shared/api/config";
import { Attachment } from "@/shared/types/universities";
import Image from "next/image";
import { useState } from "react";

const ImageGallery = ({ attachments, title }: { attachments: Attachment[]; title: string }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-5 gap-3">
        {attachments.map((attachment) => (
          <button
            key={attachment.id}
            type="button"
            onClick={() => setSelected(`${apiURL}${attachment.url}`)}
            className="group relative w-full h-40 overflow-hidden rounded-xl border border-neutral-200 ring-1 ring-neutral-100 focus:outline-none hover:ring-primary hover:border-primary transition"
          >
            <Image
              src={`${apiURL}${attachment.url}`}
              alt={title}
              fill
              unoptimized
              className="object-cover transition group-hover:brightness-75"
            />
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <span className="text-white text-sm font-medium drop-shadow">
                Открыть
              </span>
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white text-3xl leading-none"
            onClick={() => setSelected(null)}
          >
            ×
          </button>
          <div
            className="w-[60vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected}
              alt={title}
              width={0}
              height={0}
              sizes="60vw"
              unoptimized
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
