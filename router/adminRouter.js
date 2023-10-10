import { Router } from 'express';
import { adminController } from '../controllers/adminController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const adminRouter = new Router();
adminRouter.post('/', adminController.createAdmin);
adminRouter.post('/log-in', adminController.logIn);
adminRouter.get('/isAuth', authMiddleware, adminController.isAuth);
