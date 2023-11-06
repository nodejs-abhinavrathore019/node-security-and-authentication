// in memory database.
// crud operations

import { logger } from '../utils/logger';

const tableSessions = new Map<string, string>();

const create = (sessionId: string, userId: string) => {
  tableSessions.set(sessionId, userId);
};

const find = (sessionId: string) => {
  logger.debug('tableSessions', tableSessions);
  const userId : string | null = tableSessions.get(sessionId) ?? null;
  return userId;
};

const remove = (sessionId: string) => {
  tableSessions.delete(sessionId);
};

export {
  create,
  find,
  remove,
};
