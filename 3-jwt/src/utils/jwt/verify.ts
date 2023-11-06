import { createHmac } from 'node:crypto';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../configs/jwt';
import { logger } from '../logger';
import { UserSchemaType } from '../../types/api-key/UserSchemaType';

const verifyCustomJWT = (accessToken: string) => {
  const tokenParts = accessToken.split('.');
  const encodedHeader = tokenParts[0];
  const encodedPayload = tokenParts[1];
  const verifySignature = tokenParts[2];

  const signature = createHmac('sha256', jwtConfig.jwtAccessTokenSecret)
    .update(`${encodedHeader}.${encodedPayload}`)
    // .setEncoding('base64')
    .digest('base64url');

  logger.debug('verifySignature: ', verifySignature);
  logger.debug('signature: ', signature);

  if (verifySignature === signature) {
    // decode
    const buffer = Buffer.from(encodedPayload, 'base64url');
    let user = buffer.toString('utf-8');
    user = JSON.parse(user);
    logger.debug('user: ', user);

    return user as any;
  }
  return {} as UserSchemaType;
};

const verifyLibJWT = (accessToken: string) => {
  const user = jwt.verify(accessToken, jwtConfig.jwtAccessTokenSecret);
  logger.debug('user: ', user);
  return user as UserSchemaType;
};

export {
  verifyCustomJWT,
  verifyLibJWT,
};
