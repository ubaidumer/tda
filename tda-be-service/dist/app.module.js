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
const config_1 = require("./config/config");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const config_2 = require("@nestjs/config");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const keycloakMiddleware_1 = require("./middlewares/keycloakMiddleware");
const booking_module_1 = require("./api/booking/booking.module");
const booking_controller_1 = require("./api/booking/booking.controller");
const services_module_1 = require("./api/services/services.module");
const services_controller_1 = require("./api/services/services.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(keycloakMiddleware_1.KeycloakMiddleware)
            .forRoutes(booking_controller_1.BookingController, services_controller_1.ServicesController);
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
            booking_module_1.BookingModule,
            services_module_1.ServicesModule,
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