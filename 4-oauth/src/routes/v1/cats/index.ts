import express from 'express';
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
import { verifyCustomToken } from '../../../middlewares/auth/verify-custom-jwt';
import { verifyTokenWithJWT } from '../../../middlewares/auth/verify-lib-jwt';

const router = express.Router();

router.get(
  '/',
  verifyCustomToken,
  validateQueryParams(getCatsListSchema),
  expressAsyncHandler(getCatsHandler),
);

router.get(
  '/:id',
  verifyTokenWithJWT,
  validateParams(getCatByIdSchema),
  expressAsyncHandler(getCatByIdHandler),
);

export {
  router as catRoutes,
};
