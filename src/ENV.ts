import { toBool } from './utils/convert.utils';
import { config } from 'dotenv';
import * as path from 'path';

config({
  path: path.join(
    process.cwd(),
    'environments',
    `${process.env.NODE_ENV || 'development'}.env`,
  ),
});

export const ENV_DEVELOPMENT = 'development';
export const ENV_PRODUCTION = 'production';
export const ENV_STAGING = 'staging';
export const ENV_QA = 'qa';

export const ENV = {
  port: process.env.PORT,
  env: process.env.NODE_ENV || ENV_DEVELOPMENT,
  isProduction: process.env.NODE_ENV === ENV_PRODUCTION,
  isStaging: process.env.NODE_ENV === ENV_STAGING,
  isTest: process.env.NODE_ENV === ENV_QA,
  isDevelopment: process.env.NODE_ENV === ENV_DEVELOPMENT,

  db: {
    name: process.env.DB_CONNECTION_NAME,
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    synchronize: toBool(process.env.DB_SYNCHRONIZE),
    logging: toBool(process.env.DB_LOGGING),
  },
};

export const ormConfig: any = {
  //   name: ENV.db.name,
  type: ENV.db.type,
  host: ENV.db.host,
  port: +ENV.db.port,
  username: ENV.db.username,
  password: ENV.db.password,
  database: ENV.db.database,
  synchronize: ENV.db.synchronize,
  logging: ENV.db.logging,
};
