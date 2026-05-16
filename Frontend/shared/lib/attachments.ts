export type AttachmentKind = "image" | "video" | "pdf" | "file";

type AttachmentLike = {
  type?: string;
  name?: string;
  url?: string;
};

export const MAX_POST_ATTACHMENTS = 5;
export const POST_ATTACHMENT_ACCEPT =
  "image/*,video/mp4,application/pdf,.mp4,.pdf";

const imageExtensions = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
]);

const getExtension = (value: string) => {
  const cleanValue = value.split("?")[0].split("#")[0].toLowerCase();
  const dotIndex = cleanValue.lastIndexOf(".");

  return dotIndex >= 0 ? cleanValue.slice(dotIndex) : "";
};

export const getAttachmentKind = (
  attachment: string | AttachmentLike,
): AttachmentKind => {
  const mimeType =
    typeof attachment === "string" ? "" : attachment.type?.toLowerCase() ?? "";
  const fileName =
    typeof attachment === "string"
      ? attachment
      : attachment.name ?? attachment.url ?? "";
  const extension = getExtension(fileName);

  if (mimeType.startsWith("image/") || imageExtensions.has(extension)) {
    return "image";
  }

  if (mimeType === "video/mp4" || extension === ".mp4") {
    return "video";
  }

  if (mimeType === "application/pdf" || extension === ".pdf") {
    return "pdf";
  }

  return "file";
};

export const getAttachmentName = (url: string) => {
  const name = url.split("/").pop() ?? "attachment";

  try {
    return decodeURIComponent(name);
  } catch {
    return name;
  }
};

export const getPreviewAttachment = <T extends AttachmentLike>(
  attachments: T[] = [],
) => {
  return (
    attachments.find((attachment) => getAttachmentKind(attachment) === "image") ??
    attachments[0]
  );
};
