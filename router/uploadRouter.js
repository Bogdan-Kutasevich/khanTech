import { Router } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (request, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
export const uploadRouter = new Router();
uploadRouter.post('/', upload.single('image'), (req, res) => {
  res.status(200).json({ message: 'Изображение загружено успешно' });
});
