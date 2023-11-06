import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
  validateBody,
} from '../../../middlewares';

import {
  signInCustomTokenHandler,
  signInLibTokenHandler,
} from '../../../controllers/auth/sign-in';
import { signInSchema } from '../../../validation/sign-in';
import { refreshTokenHandler } from '../../../controllers/auth/refresh';

const router = express.Router();

router.post(
  '/custom_token',
  validateBody(signInSchema),
  expressAsyncHandler(signInCustomTokenHandler),
);

router.post(
  '/lib_token',
  validateBody(signInSchema),
  expressAsyncHandler(signInLibTokenHandler),
);

router.post(
  '/refresh_token',
  expressAsyncHandler(refreshTokenHandler),
);

export {
  router as userRoutes,
};
