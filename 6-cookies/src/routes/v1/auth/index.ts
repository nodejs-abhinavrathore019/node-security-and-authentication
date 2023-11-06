import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
  validateBody,
} from '../../../middlewares';

import {
  signInCustomCookieSessionHandler,
  signInLibCookieSessionHandler,
} from '../../../controllers/auth/sign-in';
import { signInSchema } from '../../../validation/sign-in';

const router = express.Router();

router.post(
  '/custom_cookie_session',
  validateBody(signInSchema),
  expressAsyncHandler(signInCustomCookieSessionHandler),
);

router.post(
  '/lib_cookie_session',
  validateBody(signInSchema),
  expressAsyncHandler(signInLibCookieSessionHandler),
);

export {
  router as userRoutes,
};
