import { createHmac } from 'node:crypto';
import { logger } from '../logger';
import { secretConfig } from '../../configs/secret';

const createSessionId = () => {
  const randomString = crypto.randomUUID();

  const sessionId = createHmac('sha256', secretConfig.sessionSecret)
    .update(randomString)
    .digest('base64url');

  logger.debug('sessionId: ', sessionId);
  return sessionId;
};

export {
  createSessionId,
};
