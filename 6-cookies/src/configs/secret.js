import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(`.env.${process.env.NODE_ENV}`),
});

const cookieSecret = process.env.COOKIE_SECRET || '';

const secretConfig = {
  cookieSecret,
};

export {
  secretConfig,
};
