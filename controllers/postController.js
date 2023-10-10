import { postService } from '../services/postService.js';

class PostController {
  async getPost(req, res) {
    try {
      const postId = req.params.id;
      if (!postId) {
        res.status(400).json('can not read post');
        return;
      }
      const post = await postService.getPost(postId);
      if (!post) {
        res.status(400).json('can not read post');
        return;
      }
      res.status(201).json({ status: 'ok', message: 'successfully', post });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async createPost(req, res) {
    try {
      const {
        categories, title, postText, readTime, image,
      } = req.body;
      const { id: adminId } = req.admin;
      const createdPost = await postService.createPost(
        categories,
        title,
        postText,
        adminId,
        readTime,
        image,
      );
      if (!createdPost) {
        res.status(400).json('can not create post');
        return;
      }
      res.status(201).json({ status: 'ok', message: 'post create successfully', createdPost });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async updatePost(req, res) {
    try {
      const postId = req.params.id;
      if (!postId) {
        res.status(400).json('no id');
        return;
      }

      const updatedData = req.body;
      if (!updatedData) {
        res.status(400).json('nothing to update');
      }

      const post = await postService.getPost(postId);
      if (!post) {
        res.status(400).json('can not find post');
        return;
      }

      const updatedPost = await postService.updatePost(post, updatedData);
      if (!updatedPost) {
        res.status(400).json('can not update post');
        return;
      }

      res.status(200).json({ status: 'ok', message: 'update successfully', updatedPost });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async deletePost(req, res) {
    try {
      const postId = req.params.id;
      if (!postId) {
        res.status(400).json('can not find post');
        return;
      }
      const post = await postService.getPost(postId);
      if (!post) {
        res.status(400).json('can not find post');
        return;
      }
      const deletedPost = await postService.deletePost(post);
      if (!deletedPost) {
        res.status(400).json('can not delete post');
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getUniquesPosts(req, res) {
    try {
      const uniquePosts = await postService.getUniquePosts();
      if (uniquePosts.length === 0) {
        res.status(400).json('posts does not exist');
        return;
      }
      res.status(200).json({ status: 'ok', message: 'successfully', uniquePosts });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getThreeLastPost(req, res) {
    try {
      const threeLastPosts = await postService.getThreeLastPost();
      if (threeLastPosts.length === 0) {
        res.status(400).json('posts does not exist');
        return;
      }
      res.status(200).json({ status: 'ok', message: 'successfully', threeLastPosts });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAllPosts(req, res) {
    try {
      const page = req.query.page || 1;
      const allPosts = await postService.getAllPosts(page);
      if (allPosts.count === 0) {
        res.status(400).json('posts does not exist');
        return;
      }
      res.status(200).json({ status: 'ok', message: 'successfully', allPosts });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export const postController = new PostController();
