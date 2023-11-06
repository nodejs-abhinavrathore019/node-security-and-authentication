import { ResponseWithPageType } from '../../types/response/ResponseWithPage';
import {
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';
import { UserSchemaType } from '../../types/api-key/UserSchemaType';
import { find } from '../../database/sign-in';
import { createLibJWT, createRefreshToken } from '../../utils/jwt/create';
import { create } from '../../database/refresh-token';

type SignInParamsType = {
  userName: string;
  password: string;
};

type CreateAPIKeyResultType = ResponseWithPageType & {
  data: {
    accessToken?: string;
    refreshToken?: string;
  },
};

const signInForLibToken = async (params: SignInParamsType) => {
  const {
    userName,
    password,
  } = params;

  const res: CreateAPIKeyResultType = {
    httpStatus: HTTPStatusCodes.OK,
    apiStatus: ApiStatusCodes.SUCCESS,
    message: 'success',
    data: { },
  };

  const user: UserSchemaType = find(userName, password);

  if (!user || Object.keys(user).length === 0) {
    res.httpStatus = HTTPStatusCodes.UNAUTHORIZED;
    res.apiStatus = ApiStatusCodes.SUCCESS;
    res.message = 'user not found';
    return res;
  }

  const refreshToken = createRefreshToken();
  create(refreshToken, user);

  res.data.accessToken = createLibJWT(user);
  res.data.refreshToken = refreshToken;

  return res;
};

export {
  signInForLibToken,
};
