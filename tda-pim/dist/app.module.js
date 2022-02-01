"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const category_module_1 = require("./api/category/category.module");
const config_1 = require("./config/config");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const config_2 = require("@nestjs/config");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const catalog_module_1 = require("./api/catalog/catalog.module");
const location_module_1 = require("./api/location/location.module");
const tax_module_1 = require("./api/tax/tax.module");
const measurement_module_1 = require("./api/measurement/measurement.module");
const supplier_module_1 = require("./api/supplier/supplier.module");
const keycloakMiddleware_1 = require("./middlewares/keycloakMiddleware");
const catalog_controller_1 = require("./api/catalog/catalog.controller");
const category_controller_1 = require("./api/category/category.controller");
const location_controller_1 = require("./api/location/location.controller");
const measurement_controller_1 = require("./api/measurement/measurement.controller");
const supplier_controller_1 = require("./api/supplier/supplier.controller");
const tax_controller_1 = require("./api/tax/tax.controller");
const stock_module_1 = require("./api/stock/stock.module");
const product_module_1 = require("./api/product/product.module");
const product_attributes_module_1 = require("./api/product-attributes/product-attributes.module");
const product_attributes_controller_1 = require("./api/product-attributes/product-attributes.controller");
const stock_controller_1 = require("./api/stock/stock.controller");
const product_controller_1 = require("./api/product/product.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(keycloakMiddleware_1.KeycloakMiddleware)
            .forRoutes(catalog_controller_1.CatalogController, category_controller_1.CategoryController, location_controller_1.LocationController, measurement_controller_1.MeasurementController, supplier_controller_1.SupplierController, tax_controller_1.TaxController, product_attributes_controller_1.ProductAttributesController, stock_controller_1.StockController, product_controller_1.ProductController);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_2.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: config_1.default.DATABASE_TYPE,
                    host: config_1.default.DATABASE_HOST,
                    port: config_1.default.DATABASE_PORT,
                    username: config_1.default.DATABASE_USERNAME,
                    password: config_1.default.DATABASE_PASSWORD,
                    database: config_1.default.DATABASE_NAME,
                    entities: config_1.default.DATABASE_ENTITIES,
                    synchronize: config_1.default.DATABASE_SYNCHRONIZE,
                    multipleStatements: config_1.default.DATABASE_MULTI_STATEMENT,
                }),
            }),
            nest_keycloak_connect_1.KeycloakConnectModule.register({
                authServerUrl: config_1.default.KEYCLOAK_URL,
                realm: config_1.default.KEYCLOAK_REALM,
                clientId: config_1.default.KEYCLOAK_CLIENT,
                secret: config_1.default.KEYCLOAK_CLIENT_SECRET,
                cookieKey: 'KEYCLOAK_JWT',
                logLevels: ['warn'],
                useNestLogger: true,
            }),
            category_module_1.CategoryModule,
            catalog_module_1.CatalogModule,
            location_module_1.LocationModule,
            tax_module_1.TaxModule,
            measurement_module_1.MeasurementModule,
            supplier_module_1.SupplierModule,
            stock_module_1.StockModule,
            product_module_1.ProductModule,
            product_attributes_module_1.ProductAttributesModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: nest_keycloak_connect_1.AuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: nest_keycloak_connect_1.ResourceGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: nest_keycloak_connect_1.RoleGuard,
            },],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map