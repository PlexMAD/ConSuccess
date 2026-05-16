import { diskStorage } from 'multer';
import { extname, join } from 'path';

const allowedAttachmentMimeTypes = new Set(['video/mp4', 'application/pdf']);
const allowedAttachmentExtensions = new Set(['.mp4', '.pdf']);

const uploadStorage = diskStorage({
  destination: join(process.cwd(), 'uploads'),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${extname(file.originalname)}`);
  },
});

export const imageUploadOptions = {
  storage: uploadStorage,
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  },
};

export const postAttachmentUploadOptions = {
  storage: uploadStorage,
  fileFilter: (_req, file, cb) => {
    const extension = extname(file.originalname).toLowerCase();
    const isImage = file.mimetype.startsWith('image/');
    const isAllowedAttachment =
      allowedAttachmentMimeTypes.has(file.mimetype) &&
      allowedAttachmentExtensions.has(extension);

    if (!isImage && !isAllowedAttachment) {
      return cb(
        new Error('Only image, MP4 video, and PDF files are allowed'),
        false,
      );
    }
    cb(null, true);
  },
};
