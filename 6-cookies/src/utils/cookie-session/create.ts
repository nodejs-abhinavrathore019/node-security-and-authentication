import { createHmac } from 'node:crypto';
import { logger } from '../logger';
import { secretConfig } from '../../configs/secret';
import { UserSchemaType } from '../../types/api-key/UserSchemaType';

const createCustomCookieSession = (user: UserSchemaType) => {
  const encodedPayload = Buffer.from(JSON.stringify(user)).toString('base64url');

  const signature = createHmac('sha256', secretConfig.cookieSecret)
    .update(`${encodedPayload}`)
    .digest('base64url');

  logger.debug('cookie-signature: ', signature);

  const signedCookie = `sign:${encodedPayload}.${signature}`;
  logger.debug('custom-signed-cookie: ', signedCookie);
  return signedCookie;
};

const createLibCookieSession = (user: UserSchemaType) => {
  const encodedPayload = Buffer.from(JSON.stringify(user)).toString('base64url');

  logger.debug('lib-cookie-payload: ', encodedPayload);
  return encodedPayload;
};

export {
  createCustomCookieSession,
  createLibCookieSession,
};
