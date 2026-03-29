import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const imageUploadOptions = {
  storage: diskStorage({
    destination: join(process.cwd(), 'uploads'),
    filename: (_req, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${unique}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  },
};
