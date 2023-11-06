import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
  validateBody,
} from '../../../middlewares';

import {
  signInCustomSessionHandler,
  signInLibSessionHandler,
} from '../../../controllers/auth/sign-in';
import { signInSchema } from '../../../validation/sign-in';

const router = express.Router();

router.post(
  '/custom_session',
  validateBody(signInSchema),
  expressAsyncHandler(signInCustomSessionHandler),
);

router.post(
  '/lib_session',
  validateBody(signInSchema),
  expressAsyncHandler(signInLibSessionHandler),
);

export {
  router as userRoutes,
};
