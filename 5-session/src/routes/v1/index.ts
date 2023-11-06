import express from 'express';
import { catRoutes } from './cats';
import { userRoutes } from './auth';

const router = express.Router();

router.use('/auth', userRoutes);
router.use('/cats', catRoutes);

export {
  router as v1Routes,
};
