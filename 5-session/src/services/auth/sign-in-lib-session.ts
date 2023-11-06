import { ResponseWithPageType } from '../../types/response/ResponseWithPage';
import {
  ApiStatusCodes,
  HTTPStatusCodes,
} from '../../constants';
import { UserSchemaType } from '../../types/api-key/UserSchemaType';
import { find } from '../../database/sign-in';
import { createSessionId } from '../../utils/session/create';
import { create } from '../../database/sessions';

type SignInParamsType = {
  userName: string;
  password: string;
};

type CreateAPIKeyResultType = ResponseWithPageType & {
  data: {
    sessionId?: string;
  },
};

const signInForLibSession = async (params: SignInParamsType) => {
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

  const sessionId = createSessionId();
  create(sessionId, user.id);

  res.data.sessionId = sessionId;

  return res;
};

export {
  signInForLibSession,
};
