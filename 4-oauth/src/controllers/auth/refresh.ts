import { Request, Response } from 'express';
import { getAccessTokenFromRefreshToken } from '../../services/auth/refresh';

const refreshTokenHandler = async (req: Request, res: Response) => {
  const {
    refreshToken,
  } = req.cookies;

  const params = {
    refreshToken,
  };

  const response = await getAccessTokenFromRefreshToken(params);

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
  refreshTokenHandler,
};
