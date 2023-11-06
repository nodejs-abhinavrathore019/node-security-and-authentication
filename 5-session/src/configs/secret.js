import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(`.env.${process.env.NODE_ENV}`),
});

const sessionSecret = process.env.SESSION_SECRET || '';

const secretConfig = {
  sessionSecret,
};

export {
  secretConfig,
};
