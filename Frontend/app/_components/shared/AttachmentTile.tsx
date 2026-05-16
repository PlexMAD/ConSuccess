import {
  getAttachmentKind,
  getAttachmentName,
} from "@/shared/lib/attachments";
import { FileText, Paperclip, Play } from "lucide-react";
import Image from "next/image";

type AttachmentTileProps = {
  src: string;
  alt: string;
  name?: string;
  mimeType?: string;
  url?: string;
  imageClassName?: string;
  videoControls?: boolean;
};

const AttachmentTile = ({
  src,
  alt,
  name,
  mimeType,
  url,
  imageClassName = "object-contain",
  videoControls = false,
}: AttachmentTileProps) => {
  const kind = getAttachmentKind({
    type: mimeType,
    name,
    url: url ?? src,
  });
  const label = name ?? getAttachmentName(url ?? src);

  if (kind === "image") {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        className={imageClassName}
      />
    );
  }

  if (kind === "video") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-neutral-950">
        <video
          src={src}
          controls={videoControls}
          muted={!videoControls}
          preload="metadata"
          className="h-full w-full object-contain"
        />
        {!videoControls && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Play
              aria-hidden="true"
              className="h-8 w-8 fill-white text-white drop-shadow"
            />
          </span>
        )}
      </div>
    );
  }

  const Icon = kind === "pdf" ? FileText : Paperclip;
  const labelText = kind === "pdf" ? "PDF" : label;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-neutral-50 p-3 text-center text-neutral-600">
      <Icon aria-hidden="true" className="h-8 w-8 text-primary" />
      <span className="max-w-full truncate text-xs font-medium">
        {labelText}
      </span>
    </div>
  );
};

export default AttachmentTile;
