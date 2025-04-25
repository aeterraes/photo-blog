"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const pg_connection_string_1 = require("pg-connection-string");
const parsed = (0, pg_connection_string_1.parse)(process.env.DATABASE_URL);
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: parsed.host,
    port: parseInt(parsed.port, 10),
    username: parsed.user,
    password: parsed.password,
    database: parsed.database,
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    cli: {
        migrationsDir: 'src/migrations',
    },
});
//# sourceMappingURL=db-config.service.js.map