// in memory database.
// crud operations

import { UserSchemaType } from '../types/api-key/UserSchemaType';
import { logger } from '../utils/logger';

const tableRefreshTokens = new Map<string, UserSchemaType>();

const invalidateOldRefreshToken = (user: UserSchemaType) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of tableRefreshTokens.entries()) {
    if ((value.id === user.id)) {
      tableRefreshTokens.delete(key);
      break;
    }
  }
};

const create = (refreshToken: string, user: UserSchemaType) => {
  invalidateOldRefreshToken(user);
  tableRefreshTokens.set(refreshToken, user);
};

const find = (refreshToken: string) => {
  logger.debug('tableRefreshTokens', tableRefreshTokens);
  const result : UserSchemaType | null = tableRefreshTokens.get(refreshToken) ?? null;
  return result;
};

export {
  create,
  find,
};
