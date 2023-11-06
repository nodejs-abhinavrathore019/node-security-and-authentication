import express from 'express';
import { catRoutes } from './cats';
import { apiKeysRoutes } from './api-keys';

const router = express.Router();

router.use('/api-keys', apiKeysRoutes);
router.use('/cats', catRoutes);

export {
  router as v1Routes,
};
