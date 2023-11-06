import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
  validateBody,
} from '../../../middlewares';

import { getAPIKeysHandler } from '../../../controllers/api-keys/get-all';
import { createAPIKeyHandler } from '../../../controllers/api-keys/create';
import { deleteAPIKeyHandler } from '../../../controllers/api-keys/delete';
import { revokeAPIKeyHandler } from '../../../controllers/api-keys/revoke';
import { createAPIKeySchema } from '../../../validation/api-key';
import { verifyApiKey } from '../../../middlewares/auth/verify-api-key';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(getAPIKeysHandler),
);

router.post(
  '/',
  validateBody(createAPIKeySchema),
  expressAsyncHandler(createAPIKeyHandler),
);

router.delete(
  '/',
  verifyApiKey,
  expressAsyncHandler(deleteAPIKeyHandler),
);

router.patch(
  '/revoke',
  verifyApiKey,
  expressAsyncHandler(revokeAPIKeyHandler),
);

export {
  router as apiKeysRoutes,
};
