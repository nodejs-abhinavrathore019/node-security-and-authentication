import { NextFunction, Request, Response } from 'express';
import { logger } from '../../utils/logger';

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      url = '',
      headers = {},
      cookies = {},
      body = {},
      query = {},
      params = {},
      session = {},
    } = req;

    logger.debug(`\n-------------${new Date().toUTCString()}-------------//`);
    logger.debug(`REQUEST URL: ${url}`);
    logger.debug(`REQUEST HEADERS: ${JSON.stringify(headers)}`);
    logger.debug(`REQUEST COOKIES: ${JSON.stringify(cookies)}`);
    logger.debug(`REQUEST SESSION: ${JSON.stringify(session)}`);
    logger.debug(`REQUEST PARAMS: ${JSON.stringify(params)}`);
    logger.debug(`REQUEST QUERY: ${JSON.stringify(query)}`);
    logger.debug(`REQUEST BODY: ${JSON.stringify(body)}`);

    const { send } = res;
    res.send = (responseBody: any) => {
      logger.debug(`RESPONSE CODE: ${res.statusCode}`);
      logger.debug(`RESPONSE BODY: ${JSON.stringify(responseBody)}`);
      logger.debug('//-----------------------------------------------------');
      res.send = send;
      return res.send(responseBody);
    };

    next();
  } catch (error: any) {
    logger.error(error.message);
    next();
  }
};

export { logRequest };
