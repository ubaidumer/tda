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
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const tag_module_1 = require("./api/tag/tag.module");
const orgtype_module_1 = require("./api/orgtype/orgtype.module");
const client_module_1 = require("./api/client/client.module");
const employee_module_1 = require("./api/employee/employee.module");
const config_2 = require("./config/config");
const tag_controller_1 = require("./api/tag/tag.controller");
const keycloakMiddleware_1 = require("./middlewares/keycloakMiddleware");
const org_module_1 = require("./api/org/org.module");
const core_1 = require("@nestjs/core");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const org_controller_1 = require("./api/org/org.controller");
const orgtype_controller_1 = require("./api/orgtype/orgtype.controller");
const client_controller_1 = require("./api/client/client.controller");
const employee_controller_1 = require("./api/employee/employee.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(keycloakMiddleware_1.KeycloakMiddleware)
            .forRoutes(tag_controller_1.TagController, org_controller_1.OrgController, orgtype_controller_1.OrgtypeController, client_controller_1.ClientController, employee_controller_1.EmployeeController);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: config_2.default.DATABASE_TYPE,
                    host: config_2.default.DATABASE_HOST,
                    port: config_2.default.DATABASE_PORT,
                    username: config_2.default.DATABASE_USERNAME,
                    password: config_2.default.DATABASE_PASSWORD,
                    database: config_2.default.DATABASE_NAME,
                    entities: config_2.default.DATABASE_ENTITIES,
                    synchronize: config_2.default.DATABASE_SYNCHRONIZE,
                    multipleStatements: config_2.default.DATABASE_MULTI_STATEMENT,
                }),
            }),
            nest_keycloak_connect_1.KeycloakConnectModule.register({
                authServerUrl: config_2.default.KEYCLOAK_URL,
                realm: config_2.default.KEYCLOAK_REALM,
                clientId: config_2.default.KEYCLOAK_CLIENT,
                secret: config_2.default.KEYCLOAK_CLIENT_SECRET,
                cookieKey: 'KEYCLOAK_JWT',
                logLevels: ['warn'],
                useNestLogger: true,
            }),
            tag_module_1.TagModule,
            orgtype_module_1.OrgtypeModule,
            client_module_1.ClientModule,
            employee_module_1.EmployeeModule,
            org_module_1.OrgModule,
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