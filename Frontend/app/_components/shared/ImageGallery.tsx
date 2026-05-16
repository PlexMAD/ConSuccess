"use client";

import { apiURL } from "@/shared/api/config";
import { Attachment } from "@/shared/types/posts";
import {
  getAttachmentKind,
  getAttachmentName,
} from "@/shared/lib/attachments";
import Image from "next/image";
import { useState } from "react";
import AttachmentTile from "./AttachmentTile";

const ImageGallery = ({
  attachments,
  title,
}: {
  attachments: Attachment[];
  title: string;
}) => {
  const [selected, setSelected] = useState<Attachment | null>(null);
  const selectedUrl = selected ? `${apiURL}${selected.url}` : null;
  const selectedKind = selected ? getAttachmentKind(selected.url) : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {attachments.map((attachment) => {
          const kind = getAttachmentKind(attachment.url);
          const href = `${apiURL}${attachment.url}`;
          const content = (
            <>
              <AttachmentTile
                src={href}
                url={attachment.url}
                alt={title}
                imageClassName="object-cover transition group-hover:brightness-75"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
                <span className="text-sm font-medium text-white drop-shadow">
                  Открыть
                </span>
              </span>
            </>
          );

          if (kind === "pdf") {
            return (
              <a
                key={attachment.id}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group relative h-32 w-full overflow-hidden rounded-xl border border-neutral-200 ring-1 ring-neutral-100 transition hover:border-primary hover:ring-primary focus:outline-none sm:h-40"
              >
                {content}
              </a>
            );
          }

          return (
            <button
              key={attachment.id}
              type="button"
              onClick={() => setSelected(attachment)}
              className="group relative h-32 w-full overflow-hidden rounded-xl border border-neutral-200 ring-1 ring-neutral-100 transition hover:border-primary hover:ring-primary focus:outline-none sm:h-40"
            >
              {content}
            </button>
          );
        })}
      </div>

      {selected && selectedUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            aria-label="Закрыть"
            className="absolute right-4 top-4 text-3xl leading-none text-white"
            onClick={() => setSelected(null)}
          >
            ×
          </button>
          <div
            className="w-[90vw] sm:w-[60vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedKind === "video" ? (
              <video
                src={selectedUrl}
                controls
                className="max-h-[85vh] w-full rounded-xl bg-black"
              />
            ) : (
              <Image
                src={selectedUrl}
                alt={getAttachmentName(selected.url)}
                width={0}
                height={0}
                sizes="60vw"
                unoptimized
                className="h-auto w-full rounded-xl"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
