import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(`.env.${process.env.NODE_ENV}`),
});

const jwtAccessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET || '';
const jwtRefreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET || '';

const jwtConfig = {
  jwtAccessTokenSecret,
  jwtRefreshTokenSecret,
};

export {
  jwtConfig,
};
