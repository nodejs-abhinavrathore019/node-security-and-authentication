import { Request, Response } from 'express';
import { signInForCustomSession } from '../../services/auth/sign-in-custom-session';
import { signInForLibSession } from '../../services/auth/sign-in-lib-session';

const signInCustomSessionHandler = async (req: Request, res: Response) => {
  const {
    userName,
    password,
  } = req.body;

  const params = {
    userName,
    password,
  };

  const response = await signInForCustomSession(params);

  const {
    httpStatus,
    apiStatus,
    message,
    data,
  } = response;

  if (data.sessionId) {
    (res as any).cookie('session', data.sessionId, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hour
    });

    delete data.sessionId;
  }

  res.status(httpStatus).send({
    status: apiStatus,
    message,
    data,
  });
};

const signInLibSessionHandler = async (req: Request, res: Response) => {
  const {
    userName,
    password,
  } = req.body;

  const params = {
    userName,
    password,
  };

  const response = await signInForLibSession(params);

  const {
    httpStatus,
    apiStatus,
    message,
    data,
  } = response;

  // no need to check for empty data.sessionId like signInCustomSessionHandler
  // because library handless it own its own
  (req.session as any).session = data.sessionId;

  delete data.sessionId;

  res.status(httpStatus).send({
    status: apiStatus,
    message,
    data,
  });
};

export {
  signInCustomSessionHandler,
  signInLibSessionHandler,
};
