"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
require("dotenv/config");
const path = require("node:path");
const pg_connection_string_1 = require("pg-connection-string");
const databaseUrl = process.env.DATABASE_URL;
const config = (0, pg_connection_string_1.parse)(databaseUrl, {});
exports.dataSourceOptions = {
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
//# sourceMappingURL=db-config.service.js.map