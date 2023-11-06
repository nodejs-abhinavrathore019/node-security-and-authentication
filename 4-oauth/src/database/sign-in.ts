// in memory database.
// crud operations

import { UserSchemaType } from '../types/api-key/UserSchemaType';
import { logger } from '../utils/logger';

const tableUsers = new Map<string, UserSchemaType>();

const create = () => {
  const userId = crypto.randomUUID();

  const userParams:UserSchemaType = {
    id: userId,
    userName: 'catslover',
    password: 'catslover@123',
  };

  tableUsers.set(userId, userParams);
};
create();

const find = (userName: string, password:string) => {
  logger.debug('tableRefreshTokens', tableUsers);

  let result = {} as UserSchemaType;
  // eslint-disable-next-line no-restricted-syntax
  for (const [, value] of tableUsers.entries()) {
    if ((value.userName === `${userName}`) && (value.password === `${password}`)) {
      result = value;
      break;
    }
  }
  const user: any = {
    ...result,
  };
  delete user.password;

  return user as UserSchemaType;
};

export {
  find,
};
