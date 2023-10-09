import express from 'express';
import { sequelize } from './db/db_config.js';
import { adminRouter } from './router/adminRouter.js';
import { postRouter } from './router/postRouter.js';

const app = express();
app.use(express.json());
app.use('/admin', adminRouter);
app.use('/posts', postRouter);
async function startApp() {
  try {
    await sequelize.authenticate();
    console.log('connected to db.');

    await sequelize.sync();
    console.log('Models sync.');

    const APP_PORT = process.env.APP_PORT || 3000;
    app.listen(APP_PORT, () => {
      console.log(`Server run on ${APP_PORT}`);
    });
  } catch (error) {
    console.error('Error when init app', error);
  }
}

startApp();
