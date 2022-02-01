"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const user_entity_1 = require("../api/user/user.entity");
dotenv.config();
const CONFIG = {
    DATABASE_TYPE: String(`${process.env.MYSQL_DATABASE_TYPE}`),
    DATABASE_HOST: String(`${process.env.MYSQL_DATABASE_HOST}`),
    DATABASE_PORT: process.env.MYSQL_DATABASE_PORT,
    DATABASE_USERNAME: String(`${process.env.MYSQL_DATABASE_USERNAME}`),
    DATABASE_PASSWORD: String(`${process.env.MYSQL_DATABASE_PASSWORD}`),
    DATABASE_NAME: String(`${process.env.MYSQL_DATABASE_NAME}`),
    DATABASE_ENTITIES: [user_entity_1.User],
    DATABASE_SYNCHRONIZE: true,
    DATABASE_MULTI_STATEMENT: false,
    NEST_APP_PORT: process.env.SERVER_PORT,
    KEYCLOAK_URL: String(`${process.env.KEYCLOAK_HOST}/auth`),
    KEYCLOAK_REALM: String(`${process.env.KEYCLOAK_REALM}`),
    KEYCLOAK_CLIENT: String(`${process.env.KEYCLOAK_CLIENT_ID}`),
    KEYCLOAK_CLIENT_SECRET: String(`${process.env.KEYCLOAK_CLIENT_SECRET}`),
};
exports.default = CONFIG;
//# sourceMappingURL=config.js.map