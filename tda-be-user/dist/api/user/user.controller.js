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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const config_1 = require("../../config/config");
const authHeader_decorator_1 = require("../../decorator/comman/authHeader.decorator");
const idsBulkValidation_decorator_1 = require("../../decorator/comman/idsBulkValidation.decorator");
const idValidation_decorator_1 = require("../../decorator/comman/idValidation.decorator");
const paginationValidation_decorator_1 = require("../../decorator/comman/paginationValidation.decorator");
const keycloakCreateUserValidation_decorator_1 = require("../../decorator/keycloak/keycloakCreateUserValidation.decorator");
const keycloakUpdateUserValidation_decorator_1 = require("../../decorator/keycloak/keycloakUpdateUserValidation.decorator");
const createUserValidation_decorator_1 = require("../../decorator/user/createUserValidation.decorator");
const getAllUserValidation_decorator_1 = require("../../decorator/user/getAllUserValidation.decorator");
const updateUserActivateValidation_decorator_1 = require("../../decorator/user/updateUserActivateValidation.decorator");
const updateUserValidation_decorator_1 = require("../../decorator/user/updateUserValidation.decorator");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const userAccessTokenWithCredentials_dto_1 = require("../../dto/keycloak/userAccessTokenWithCredentials.dto");
const createUser_dto_1 = require("../../dto/user/createUser.dto");
const getAllUser_dto_1 = require("../../dto/user/getAllUser.dto");
const updateUser_dto_1 = require("../../dto/user/updateUser.dto");
const updateUserActivate_dto_1 = require("../../dto/user/updateUserActivate.dto");
const keycloak_service_1 = require("../keycloak/keycloak.service");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService, keycloakService) {
        this.userService = userService;
        this.keycloakService = keycloakService;
    }
    async postUser(body, keycloakUserData, token) {
        const getkeycloakuser = await this.keycloakService.getUserWithEmailKeycloak(body.email, token);
        if (getkeycloakuser.data[0] !== undefined) {
            throw new common_1.HttpException("email already exists", 400);
        }
        const keycloakuser = await this.keycloakService.createUserWithKeycloak(keycloakUserData, token);
        body.keycloak_id = keycloakuser.keycloak_id;
        const mysqluser = await this.userService.createUser(body);
        return { mysql_response: mysqluser, keycloak_response: keycloakuser };
    }
    loginWithCredentials(body) {
        return this.keycloakService.accessToken(body);
    }
    refreshToken(body) {
        const userData = {
            refresh_token: `${body.refreshToken}`,
            grant_type: `refresh_token`,
            client_id: `${config_1.default.KEYCLOAK_CLIENT}`,
            client_secret: `${config_1.default.KEYCLOAK_CLIENT_SECRET}`,
        };
        return this.keycloakService.refreshToken(userData);
    }
    async getUserList(query, body) {
        return await this.userService.findUserList(query, body);
    }
    async patchUserActivateById(param, body, token) {
        const getmysqluser = await this.userService.findUserById(param);
        if (getmysqluser.data == undefined) {
            throw new common_1.HttpException("User Not Found!", 400);
        }
        let keycloakUserEnableStatus;
        if (body.is_activated == 1) {
            keycloakUserEnableStatus = true;
        }
        else {
            keycloakUserEnableStatus = false;
        }
        const keycloakuser = await this.keycloakService.updateUserStatusWithKeycloak(getmysqluser.data.keycloak_id, keycloakUserEnableStatus, token);
        const mysqluser = await this.userService.updatedUserActivate(param, body);
        return { mysql_response: mysqluser, keycloak_response: keycloakuser };
    }
    async getUserById(param) {
        return await this.userService.findUserById(param);
    }
    async putUserById(param, body, keycloakUserData, token) {
        console.log(body, keycloakUserData);
        if (body.email !== undefined) {
            const getkeycloakuser = await this.keycloakService.getUserWithEmailKeycloak(body.email, token);
            if (getkeycloakuser.data[0] !== undefined) {
                throw new common_1.HttpException("email already exists", 400);
            }
        }
        const getmysqluser = await this.userService.findUserById(param);
        if (getmysqluser.data == undefined) {
            throw new common_1.HttpException("User Not Found!", 400);
        }
        const keycloakuser = await this.keycloakService.updateUserWithKeycloak(getmysqluser.data.keycloak_id, keycloakUserData, token);
        const mysqluser = await this.userService.updatedUser(param, body);
        return { mysql_response: mysqluser, keycloak_response: keycloakuser };
    }
    async patchUserBulkActivateById(body1, body2, token) {
        const keycloak_ids = await this.userService.getBulkKeycloakIds(body1);
        if (keycloak_ids.length !== body1.ids.length) {
            throw new common_1.HttpException("Found an incorrect id!", 400);
        }
        let keycloakUserEnableStatus;
        if (body2.is_activated == 1) {
            keycloakUserEnableStatus = true;
        }
        else {
            keycloakUserEnableStatus = false;
        }
        const keycloakuser = await this.keycloakService.updateBulkUserStatusWithKeycloak(keycloak_ids, keycloakUserEnableStatus, token);
        const mysqluser = await this.userService.updatedBulkUserActivate(body1, body2);
        return { mysql_response: mysqluser, keycloak_response: keycloakuser };
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, createUserValidation_decorator_1.CreateUserValidationDecorator)()),
    __param(1, (0, keycloakCreateUserValidation_decorator_1.KeycloakCreateUserValidationDecorator)()),
    __param(2, (0, authHeader_decorator_1.AuthHeader)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "postUser", null);
__decorate([
    (0, common_1.Post)('/loginWithCred'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userAccessTokenWithCredentials_dto_1.UserAccessTokenWithCredentials]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "loginWithCredentials", null);
__decorate([
    (0, common_1.Post)('/refreshToken'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllUserValidation_decorator_1.GetAllUserValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, getAllUser_dto_1.GetAllUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserList", null);
__decorate([
    (0, common_1.Patch)('Activate/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateUserActivateValidation_decorator_1.UpdateUserActivateValidationDecorator)()),
    __param(2, (0, authHeader_decorator_1.AuthHeader)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateUserActivate_dto_1.UpdateUserActivateDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "patchUserActivateById", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateUserValidation_decorator_1.UpdateUserValidationDecorator)()),
    __param(2, (0, keycloakUpdateUserValidation_decorator_1.KeycloakUpdateUserValidationDecorator)()),
    __param(3, (0, authHeader_decorator_1.AuthHeader)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateUser_dto_1.UpdateUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "putUserById", null);
__decorate([
    (0, common_1.Patch)('BulkActivate'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, idsBulkValidation_decorator_1.IDSBulkValidationDecorator)()),
    __param(1, (0, updateUserActivateValidation_decorator_1.UpdateUserActivateValidationDecorator)()),
    __param(2, (0, authHeader_decorator_1.AuthHeader)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateUserActivate_dto_1.UpdateUserActivateDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "patchUserBulkActivateById", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, keycloak_service_1.KeycloakService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map