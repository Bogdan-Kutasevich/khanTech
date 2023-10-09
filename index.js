const express = require('express')
const sequelize = require('./db/db_config');
const app = express()


async function startApp() {
  try {
    await sequelize.authenticate();
    console.log('connected to db.');

    await sequelize.sync();
    console.log('Models sync.');

    const APP_PORT = process.env.PORT || 3000;
    app.listen(APP_PORT, () => {
      console.log(`Server run on ${APP_PORT}`);
    });
  } catch (error) {
    console.error('Error when init app', error);
  }
}

startApp();