import { Sequelize } from 'sequelize';
import Post from '../models/post.js';

class PostService {
  async getPost(id) {
    try {
      return await Post.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      return false;
    }
  }

  async createPost(categories, title, postText, adminId, readTime, image) {
    try {
      return await Post.create({
        categories, title, postText, adminId, readTime, image,
      });
    } catch (error) {
      return false;
    }
  }

  async updatePost(post, updatedData) {
    try {
      return await post.update(updatedData);
    } catch (error) {
      return false;
    }
  }

  async deletePost(post) {
    try {
      return await post.destroy();
    } catch (error) {
      return false;
    }
  }

  async getUniquePosts() {
    try {
      const randomPost = await this.getRandomPost();
      const uniquePost = await Post.findOne({
        where: {
          id: { [Sequelize.Op.not]: randomPost.id },
        },
        order: Sequelize.literal('RAND()'),
      });

      return [randomPost, uniquePost];
    } catch (error) {
      return false;
    }
  }

  async getRandomPost() {
    const allPosts = await Post.findAll();
    const randomIndex = Math.floor(Math.random() * allPosts.length);
    return allPosts[randomIndex];
  }

  async getThreeLastPost() {
    try {
      return await Post.findAll({
        limit: 3,
        order: [['createdAt', 'DESC']],
      });
    } catch (error) {
      return false;
    }
  }

  async getAllPosts(page) {
    try {
      const perPage = 6;
      const posts = await Post.findAll({
        limit: perPage,
        offset: (page - 1) * perPage,
        order: [['createdAt', 'DESC']],
      });
      const count = await Post.findAll();
      return { posts, count: count.length };
    } catch (error) {
      return false;
    }
  }
}

export const postService = new PostService();
