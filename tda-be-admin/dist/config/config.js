"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const CONFIG = {
    NEST_APP_PORT: process.env.SERVER_PORT,
    KEYCLOAK_URL: String(`${process.env.KEYCLOAK_HOST}/auth`),
    KEYCLOAK_REALM: String(`${process.env.KEYCLOAK_REALM}`),
    KEYCLOAK_CLIENT: String(`${process.env.KEYCLOAK_CLIENT_ID}`),
    KEYCLOAK_CLIENT_SECRET: String(`${process.env.KEYCLOAK_CLIENT_SECRET}`),
};
exports.default = CONFIG;
//# sourceMappingURL=config.js.map