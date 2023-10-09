import { Router } from 'express';
import { adminController } from '../controllers/adminController.js';

export const adminRouter = new Router();
adminRouter.post('/', adminController.createAdmin);
adminRouter.post('/log-in', adminController.logIn);
