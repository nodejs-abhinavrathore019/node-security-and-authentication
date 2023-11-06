import { NextFunction, Request, Response } from 'express';
import { logger } from '../../utils/logger';
import { ApiStatusCodes, HTTPStatusCodes } from '../../constants';
import { UserSchemaType } from '../../types/api-key/UserSchemaType';
import { find as findSession } from '../../database/sessions';
import { findById as findUserById } from '../../database/sign-in';

const verifyLibSession = async (req: Request, res: Response, next: NextFunction) => {
  const {
    session,
  } = req;

  try {
    // headers
    const sessionId: string = (session as any).session as string;
    logger.debug('sessionId:', sessionId);

    if (!sessionId) {
      res.status(HTTPStatusCodes.UNAUTHORIZED).send({
        status: ApiStatusCodes.FAILED,
        message: 'session missing, you need to sign in',
      });
      return;
    }

    const userId: string | null = findSession(sessionId);

    if (!userId) {
      res.status(HTTPStatusCodes.UNAUTHORIZED).send({
        status: ApiStatusCodes.FAILED,
        message: 'session invalid, you need to sign in',
      });
      return;
    }

    const user: UserSchemaType | null = findUserById(userId as string);

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

export { verifyLibSession };
