import express from 'express';
// import expressSession = require('express-session');
import expressAsyncHandler from 'express-async-handler';
import {
  validateQueryParams,
  validateParams,
} from '../../../middlewares';
import {
  getCatByIdSchema,
  getCatsListSchema,
} from '../../../validation/cat';
import { getCatsHandler } from '../../../controllers/cat/get-cats';
import { getCatByIdHandler } from '../../../controllers/cat/get-cat-by-id';
import { verifyCustomSession } from '../../../middlewares/auth/verify-custom-session';
import { verifyLibSession } from '../../../middlewares/auth/verify-lib-session';
// import { secretConfig } from '../../../configs/secret';

const router = express.Router();

router.get(
  '/',
  verifyCustomSession,
  validateQueryParams(getCatsListSchema),
  expressAsyncHandler(getCatsHandler),
);

// router.use(expressSession({
//   secret: secretConfig.sessionSecret,
//   resave: false,
//   saveUninitialized: false,
// }));

router.get(
  '/:id',
  verifyLibSession,
  validateParams(getCatByIdSchema),
  expressAsyncHandler(getCatByIdHandler),
);

export {
  router as catRoutes,
};
