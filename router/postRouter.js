import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { postController } from '../controllers/postController.js';

export const postRouter = new Router();
postRouter.get('/getUniques', postController.getUniquesPosts);
postRouter.get('/getThreeLast', postController.getThreeLastPost);
postRouter.get('/getAllPosts', postController.getAllPosts);

postRouter.get('/:id', authMiddleware, postController.getPost);
postRouter.post('/', authMiddleware, postController.createPost);
postRouter.patch('/:id', authMiddleware, postController.updatePost);
postRouter.delete('/:id', authMiddleware, postController.deletePost);
