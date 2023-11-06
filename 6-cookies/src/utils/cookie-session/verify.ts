import { logger } from '../logger';
import { UserSchemaType } from '../../types/api-key/UserSchemaType';

const verifyCustomCookieSession = (signedCookie: string) => {
  const cookiePayload = signedCookie.slice(signedCookie.indexOf(':'), signedCookie.lastIndexOf('.'));

  logger.debug('cookie-payload: ', cookiePayload);

  const buffer = Buffer.from(cookiePayload, 'base64url');
  let user: any = buffer.toString('utf-8');
  user = JSON.parse(user);
  logger.debug('decoded user: ', user);

  return user as UserSchemaType;
};

const verifyLibCookieSession = (encodedPayload: string) => {
  // decode
  const buffer = Buffer.from(encodedPayload, 'base64url');
  let user: any = buffer.toString('utf-8');
  user = JSON.parse(user);
  logger.debug('decoded user: ', user);

  return user as UserSchemaType;
};

export {
  verifyCustomCookieSession,
  verifyLibCookieSession,
};
