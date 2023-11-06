// import https from 'https';
// import fs from 'fs';
import express = require('express');
import cookieParser = require('cookie-parser');
import { logger } from './utils/logger';
import appConfiguration = require('./configs/app');
import { connectMongo } from './database/mongodb';
import { rootRouter } from './routes';
import { ExpressErrorHandler } from './middlewares/error-handler/express-error-handler';
import { logRequest } from './middlewares/request-logger/log-request';

const { appConfig } = appConfiguration;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(logRequest);

app.use('/api', rootRouter);

// setting middleware for error handling.
// In case if the error is not handled in some routes, it will get captured here.
// eslint-disable-next-line no-unused-vars
app.use(ExpressErrorHandler);

// const dirPath = `${__dirname}/../../assets`;

// const server = https.createServer(
//   {
//     key: fs.readFileSync(`${dirPath}/private-key.pem`),
//     cert: fs.readFileSync(`${dirPath}/public-cert.pem`),
//   },
//   app,
// );

const server = app.listen(appConfig.port, async () => {
  try {
    await connectMongo();
    logger.info(`Listening at http://localhost:${appConfig.port}`);
  } catch (error) {
    logger.error('Cannot start application, error: ', error);
    throw error;
  }
});

export { app, server };
