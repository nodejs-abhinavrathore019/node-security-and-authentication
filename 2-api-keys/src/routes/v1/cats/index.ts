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
import { verifyApiKey } from '../../../middlewares/auth/verify-api-key';

const router = express.Router();

router.get(
  '/',
  verifyApiKey,
  validateQueryParams(getCatsListSchema),
  expressAsyncHandler(getCatsHandler),
);

router.get(
  '/:id',
  verifyApiKey,
  validateParams(getCatByIdSchema),
  expressAsyncHandler(getCatByIdHandler),
);

export {
  router as catRoutes,
};
