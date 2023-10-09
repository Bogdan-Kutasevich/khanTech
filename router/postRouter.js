import { Router } from 'express';
import { adminController } from '../controllers/adminController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const postRouter = new Router();
postRouter.get('/', authMiddleware, adminController.createAdmin);
