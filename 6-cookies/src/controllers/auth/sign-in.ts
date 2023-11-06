import { CookieOptions, Request, Response } from 'express';
import { signInForCustomCookieSession } from '../../services/auth/sign-in-custom-cookie-session';
import { signInForLibCookieSession } from '../../services/auth/sign-in-lib-cookie-session';

const signInCustomCookieSessionHandler = async (req: Request, res: Response) => {
  const {
    userName,
    password,
  } = req.body;

  const params = {
    userName,
    password,
  };

  const response = await signInForCustomCookieSession(params);

  const {
    httpStatus,
    apiStatus,
    message,
    data,
  } = response;

  if (data.cookieSessionCustom) {
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      signed: false,
      maxAge: 24 * 60 * 60 * 1000, // 24 hour
    };

    (res as any).cookie('COOKIE_SESSION_CUSTOM', data.cookieSessionCustom, cookieOptions);

    delete data.cookieSessionCustom;
  }

  res.status(httpStatus).send({
    status: apiStatus,
    message,
    data,
  });
};

const signInLibCookieSessionHandler = async (req: Request, res: Response) => {
  const {
    userName,
    password,
  } = req.body;

  const params = {
    userName,
    password,
  };

  const response = await signInForLibCookieSession(params);

  const {
    httpStatus,
    apiStatus,
    message,
    data,
  } = response;

  if (data.cookieSessionLib) {
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      signed: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hour
    };

    (res as any).cookie('COOKIE_SESSION_LIB', data.cookieSessionLib, cookieOptions);

    delete data.cookieSessionLib;
  }

  res.status(httpStatus).send({
    status: apiStatus,
    message,
    data,
  });
};

export {
  signInCustomCookieSessionHandler,
  signInLibCookieSessionHandler,
};
