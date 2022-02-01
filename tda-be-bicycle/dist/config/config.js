"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const bicycle_attribute_detail_entity_1 = require("../api/bicycle-attribute-detail/bicycle-attribute-detail.entity");
const bicycle_attribute_entity_1 = require("../api/bicycle-attribute/bicycle-attribute.entity");
const bicycle_frame_entity_1 = require("../api/bicycle-frame/bicycle-frame.entity");
const bicycle_type_entity_1 = require("../api/bicycle-type/bicycle-type.entity");
dotenv.config();
const CONFIG = {
    DATABASE_TYPE: String(`${process.env.MYSQL_DATABASE_TYPE}`),
    DATABASE_HOST: String(`${process.env.MYSQL_DATABASE_HOST}`),
    DATABASE_PORT: process.env.MYSQL_DATABASE_PORT,
    DATABASE_USERNAME: String(`${process.env.MYSQL_DATABASE_USERNAME}`),
    DATABASE_PASSWORD: String(`${process.env.MYSQL_DATABASE_PASSWORD}`),
    DATABASE_NAME: String(`${process.env.MYSQL_DATABASE_NAME}`),
    DATABASE_ENTITIES: [bicycle_type_entity_1.BicycleType, bicycle_frame_entity_1.BicycleFrame, bicycle_attribute_detail_entity_1.BicycleAttributeDetail, bicycle_attribute_entity_1.BicycleAttribute],
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