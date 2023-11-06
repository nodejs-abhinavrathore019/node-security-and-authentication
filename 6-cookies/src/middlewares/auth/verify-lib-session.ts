import { NextFunction, Request, Response } from 'express';
import { logger } from '../../utils/logger';
import { ApiStatusCodes, HTTPStatusCodes } from '../../constants';
import { UserSchemaType } from '../../types/api-key/UserSchemaType';
import { verifyLibCookieSession } from '../../utils/cookie-session/verify';

const verifyLibSession = async (req: Request, res: Response, next: NextFunction) => {
  const {
    signedCookies,
  } = req;

  try {
    // headers
    const cookieSession: string = (signedCookies as any).COOKIE_SESSION_LIB as string;
    logger.debug('cookieSession: ', cookieSession);

    if (!cookieSession) {
      res.status(HTTPStatusCodes.UNAUTHORIZED).send({
        status: ApiStatusCodes.FAILED,
        message: 'session missing, you need to sign in',
      });
      return;
    }

    const user: UserSchemaType | null = verifyLibCookieSession(cookieSession);

    if (!user) {
      res.status(HTTPStatusCodes.UNAUTHORIZED).send({
        status: ApiStatusCodes.FAILED,
        message: 'session invalid, you need to sign in',
      });
      return;
    }

    (req as any).user = user;
    next();
  } catch (error: any) {
    logger.error('verify session error:', error);
    res.status(HTTPStatusCodes.UNAUTHORIZED).send({
      status: ApiStatusCodes.FAILED,
      message: error.message,
    });
  }
};

export { verifyLibSession };
