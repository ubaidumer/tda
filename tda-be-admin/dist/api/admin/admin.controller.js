"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const authHeader_decorator_1 = require("../../decorators/comman/authHeader.decorator");
const keycloakCreateUser_dto_1 = require("../../dto/comman/keycloakCreateUser.dto");
const userAccessTokenWithCredentials_dto_1 = require("../../dto/comman/userAccessTokenWithCredentials.dto");
const userAccessTokenWithoutCredentials_dto_1 = require("../../dto/comman/userAccessTokenWithoutCredentials.dto");
const admin_service_1 = require("./admin.service");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    loginWithCredentials(body) {
        return this.adminService.accessToken(body);
    }
    loginWithoutCredentials(body) {
        return this.adminService.accessToken(body);
    }
    Registration(token, body) {
        return this.adminService.createUserWithKeycloak(body, token);
    }
    refreshToken(body) {
        const userData = {
            refresh_token: `${body.refreshToken}`,
            grant_type: `refresh_token`,
            client_id: `${process.env.KEYCLOAK_CLIENT_ID}`,
            client_secret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
        };
        return this.adminService.refreshToken(userData);
    }
};
__decorate([
    (0, common_1.Post)('/loginWithCred'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userAccessTokenWithCredentials_dto_1.UserAccessTokenWithCredentials]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "loginWithCredentials", null);
__decorate([
    (0, common_1.Post)('/loginWithoutCred'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userAccessTokenWithoutCredentials_dto_1.UserAccessTokenWithoutCredentials]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "loginWithoutCredentials", null);
__decorate([
    (0, common_1.Post)('/register'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, authHeader_decorator_1.AuthHeader)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, keycloakCreateUser_dto_1.KeycloakCreateuser]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "Registration", null);
__decorate([
    (0, common_1.Post)('/refreshToken'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "refreshToken", null);
AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map