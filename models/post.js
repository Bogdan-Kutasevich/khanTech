import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db_config.js';
import Admin from './admin.js';

const Post = sequelize.define('Post', {
  categories: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  readTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Post.belongsTo(Admin, { foreignKey: 'adminId' });
export default Post;
