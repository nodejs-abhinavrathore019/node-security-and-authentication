import { Request, Response } from 'express';
import { signInForCustomToken } from '../../services/auth/sign-in-custom-token';
import { signInForLibToken } from '../../services/auth/sign-in-lib-token';

const signInCustomTokenHandler = async (req: Request, res: Response) => {
  const {
    userName,
    password,
  } = req.body;

  const params = {
    userName,
    password,
  };

  const response = await signInForCustomToken(params);

  const {
    httpStatus,
    apiStatus,
    message,
    data,
  } = response;

  (res as any).cookie('refreshToken', data.refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hour
  });

  res.status(httpStatus).send({
    status: apiStatus,
    message,
    data,
  });
};

const signInLibTokenHandler = async (req: Request, res: Response) => {
  const {
    userName,
    password,
  } = req.body;

  const params = {
    userName,
    password,
  };

  const response = await signInForLibToken(params);

  const {
    httpStatus,
    apiStatus,
    message,
    data,
  } = response;

  (res as any).cookie('refreshToken', data.refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hour
  });

  res.status(httpStatus).send({
    status: apiStatus,
    message,
    data,
  });
};

export {
  signInCustomTokenHandler,
  signInLibTokenHandler,
};
