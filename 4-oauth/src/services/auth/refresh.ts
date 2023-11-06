import { ResponseWithPageType } from '../../types/response/ResponseWithPage';
import {
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';
import { UserSchemaType } from '../../types/api-key/UserSchemaType';
import { find, create } from '../../database/refresh-token';
import { createCustomJWT, createRefreshToken } from '../../utils/jwt/create';

type RefreshTokenParamsType = {
  refreshToken: string;
};

type CreateAPIKeyResultType = ResponseWithPageType & {
  data: {
    accessToken?: string;
    refreshToken?: string;
  },
};

const getAccessTokenFromRefreshToken = async (params: RefreshTokenParamsType) => {
  const {
    refreshToken,
  } = params;

  const res: CreateAPIKeyResultType = {
    httpStatus: HTTPStatusCodes.OK,
    apiStatus: ApiStatusCodes.SUCCESS,
    message: 'success',
    data: {},
  };

  if (!refreshToken) {
    res.httpStatus = HTTPStatusCodes.BAD_REQUEST;
    res.apiStatus = ApiStatusCodes.SUCCESS;
    res.message = 'refresh token missing';
    return res;
  }

  const user: UserSchemaType | null = find(refreshToken);

  if (!user || Object.keys(user).length === 0) {
    res.httpStatus = HTTPStatusCodes.UNAUTHORIZED;
    res.apiStatus = ApiStatusCodes.SUCCESS;
    res.message = 'refresh token invalid';
    return res;
  }

  const newRefreshToken = createRefreshToken();
  create(newRefreshToken, user);

  res.data.accessToken = createCustomJWT(user);
  res.data.refreshToken = newRefreshToken;

  return res;
};

export {
  getAccessTokenFromRefreshToken,
};
