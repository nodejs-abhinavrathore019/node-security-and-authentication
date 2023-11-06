import brcypt from 'bcrypt';
import { logger } from '../logger';

const saltRounds = 10;

const createUniqueAPIKey = () => {
  const token = crypto.randomUUID();
  logger.debug('token: ', token);
  const hashedToken = brcypt.hashSync(token, saltRounds);
  logger.debug('hashedToken: ', hashedToken);
  return hashedToken;
};

export {
  createUniqueAPIKey,
};
