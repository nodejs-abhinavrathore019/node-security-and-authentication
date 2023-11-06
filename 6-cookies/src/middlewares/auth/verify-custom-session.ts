import { NextFunction, Request, Response } from 'express';
import { logger } from '../../utils/logger';
import { ApiStatusCodes, HTTPStatusCodes } from '../../constants';
import { verifyCustomCookieSession } from '../../utils/cookie-session/verify';

const verifyCustomSession = async (req: Request, res: Response, next: NextFunction) => {
  const {
    cookies,
  } = req;

  try {
    // headers
    const cookieSession: string = (cookies as any).COOKIE_SESSION_CUSTOM as string;
    logger.debug('cookieSession:', cookieSession);

    if (!cookieSession) {
      res.status(HTTPStatusCodes.UNAUTHORIZED).send({
        status: ApiStatusCodes.FAILED,
        message: 'cookieSession missing, you need to sign in',
      });
      return;
    }

    const user: any = verifyCustomCookieSession(cookieSession);

    if (!user || Object.keys(user).length === 0) {
      res.status(HTTPStatusCodes.BAD_REQUEST).send({
        status: ApiStatusCodes.FAILED,
        message: 'user not found, you need to sign in',
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

export { verifyCustomSession };
