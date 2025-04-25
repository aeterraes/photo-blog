import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import * as path from 'node:path';
import { parse } from 'pg-connection-string';

const databaseUrl = process.env.DATABASE_URL;
const config = parse(databaseUrl, {});

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: config.host,
  port: parseInt(config.port, 10),
  username: config.user,
  password: config.password,
  database: config.database,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: false,
};
