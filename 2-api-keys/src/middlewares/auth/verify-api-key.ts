import { NextFunction, Request, Response } from 'express';
import { logger } from '../../utils/logger';
import { ApiStatusCodes, HTTPStatusCodes } from '../../constants';
import { APIKeysSchemaType } from '../../types/api-key/APIKeysSchemaType';
import { read } from '../../database/api-keys';

const verifyApiKey = async (req: Request, res: Response, next: NextFunction) => {
  const {
    headers,
  } = req;

  try {
    // headers
    const apiKey: any = headers['x-api-key'];

    if (!apiKey) {
      res.status(HTTPStatusCodes.UNAUTHORIZED).send({
        status: ApiStatusCodes.FAILED,
        message: 'api key missing',
      });
      return;
    }

    const apiKeyData: APIKeysSchemaType = read(apiKey);

    if (!apiKeyData || Object.keys(apiKeyData).length === 0) {
      res.status(HTTPStatusCodes.BAD_REQUEST).send({
        status: ApiStatusCodes.FAILED,
        message: 'api key not found',
      });
      return;
    }

    if (apiKeyData.status === 'revoked') {
      res.status(HTTPStatusCodes.UNAUTHORIZED).send({
        status: ApiStatusCodes.FAILED,
        message: 'api key has been revoked',
      });
      return;
    }

    (req as any).apiKeyId = apiKeyData.id;
    next();
  } catch (error: any) {
    logger.error('verify api key error:', error);
    res.status(HTTPStatusCodes.UNAUTHORIZED).send({
      status: ApiStatusCodes.FAILED,
      message: error.message,
    });
  }
};

export { verifyApiKey };
