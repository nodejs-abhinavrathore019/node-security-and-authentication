import { NextFunction, Request, Response } from 'express';
import { logger } from '../../utils/logger';
import { ApiStatusCodes, HTTPStatusCodes } from '../../constants';
import { UserSchemaType } from '../../types/api-key/UserSchemaType';
import { verifyCustomJWT } from '../../utils/jwt/verify';

const verifyCustomToken = async (req: Request, res: Response, next: NextFunction) => {
  const {
    headers,
  } = req;

  try {
    // headers
    const bearerToken: string = headers.authorization as string;
    logger.debug('bearerToken:', bearerToken);

    if (!bearerToken.startsWith('Bearer')) {
      res.status(HTTPStatusCodes.UNAUTHORIZED).send({
        status: ApiStatusCodes.FAILED,
        message: 'bearer token required',
      });
      return;
    }

    const accessToken: string = bearerToken?.slice(7, bearerToken.length) ?? '';
    logger.debug('accessToken:', accessToken);

    if (!accessToken) {
      res.status(HTTPStatusCodes.UNAUTHORIZED).send({
        status: ApiStatusCodes.FAILED,
        message: 'accessToken not found',
      });
      return;
    }

    const user: UserSchemaType = verifyCustomJWT(accessToken);

    if (!user || Object.keys(user).length === 0) {
      res.status(HTTPStatusCodes.BAD_REQUEST).send({
        status: ApiStatusCodes.FAILED,
        message: 'invalid token',
      });
      return;
    }

    (req as any).user = user;
    next();
  } catch (error: any) {
    logger.error('verify token error:', error);
    res.status(HTTPStatusCodes.UNAUTHORIZED).send({
      status: ApiStatusCodes.FAILED,
      message: error.message,
    });
  }
};

export { verifyCustomToken };
