"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const category_entity_1 = require("../api/category/category.entity");
const catalog_entity_1 = require("../api/catalog/catalog.entity");
const location_entity_1 = require("../api/location/location.entity");
const tax_entity_1 = require("../api/tax/tax.entity");
const measurement_entity_1 = require("../api/measurement/measurement.entity");
const supplier_entity_1 = require("../api/supplier/supplier.entity");
const stock_entity_1 = require("../api/stock/stock.entity");
const product_entity_1 = require("../api/product/product.entity");
const product_attributes_entity_1 = require("../api/product-attributes/product-attributes.entity");
dotenv.config();
const CONFIG = {
    DATABASE_TYPE: String(`${process.env.MYSQL_DATABASE_TYPE}`),
    DATABASE_HOST: String(`${process.env.MYSQL_DATABASE_HOST}`),
    DATABASE_PORT: process.env.MYSQL_DATABASE_PORT,
    DATABASE_USERNAME: String(`${process.env.MYSQL_DATABASE_USERNAME}`),
    DATABASE_PASSWORD: String(`${process.env.MYSQL_DATABASE_PASSWORD}`),
    DATABASE_NAME: String(`${process.env.MYSQL_DATABASE_NAME}`),
    DATABASE_ENTITIES: [category_entity_1.Category, catalog_entity_1.Catalog, location_entity_1.Location, tax_entity_1.Tax, measurement_entity_1.Measurement, supplier_entity_1.Supplier, stock_entity_1.Stock, product_entity_1.Product, product_attributes_entity_1.Product_Attributes],
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