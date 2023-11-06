import jwt from 'jsonwebtoken';
import { createHmac } from 'node:crypto';
import { UserSchemaType } from '../../types/api-key/UserSchemaType';
import { logger } from '../logger';
import { jwtConfig } from '../../configs/jwt';

const createCustomJWT = (user: UserSchemaType) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const payload = {
    sub: user.id,
    name: user.userName,
    iat: 1698699240,
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');

  const signature = createHmac('sha256', jwtConfig.jwtAccessTokenSecret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  const token: string = `${encodedHeader}.${encodedPayload}.${signature}`;
  logger.debug('created jwt token: ', token);
  return token;
};

const createLibJWT = (user: UserSchemaType) => {
  const payload = {
    sub: user.id,
    name: user.userName,
    iat: 1698699240,
  };

  const token = jwt.sign(payload, jwtConfig.jwtAccessTokenSecret, {
    algorithm: 'HS256',
    // expiresIn: '1800s',
  });

  logger.debug('created jwt token: ', token);
  return token;
};

const createRefreshToken = () => {
  const randomString = crypto.randomUUID();

  const refreshToken = createHmac('sha256', jwtConfig.jwtRefreshTokenSecret)
    .update(randomString)
    .digest('base64url');

  logger.debug('refreshToken: ', refreshToken);
  return refreshToken;
};

export {
  createCustomJWT,
  createLibJWT,
  createRefreshToken,
};
