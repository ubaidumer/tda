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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const config_1 = require("../../config/config");
const axios_1 = require("@nestjs/axios");
const jwt_decode_1 = require("jwt-decode");
const qs = require('querystring');
let KeycloakService = class KeycloakService {
    constructor(httpService) {
        this.httpService = httpService;
        this.KeycloakUrl = `${config_1.default.KEYCLOAK_URL}/realms/${config_1.default.KEYCLOAK_REALM}/protocol/openid-connect/token`;
    }
    async accessToken(loginData) {
        try {
            console.log("login data", loginData);
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService
                .post(this.KeycloakUrl, qs.stringify(loginData), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }));
            console.log('response data', response.data);
            return response.data;
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException('Error', err);
        }
    }
    async refreshToken(UserData) {
        var _a, _b;
        console.log("user data", UserData);
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService
                .post(this.KeycloakUrl, qs.stringify(UserData), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }));
            return response.data;
        }
        catch (err) {
            console.log("errorssss", err);
            if (((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status) === 400) {
                throw new common_1.BadRequestException("BAD REQUEST");
            }
            if (((_b = err === null || err === void 0 ? void 0 : err.response) === null || _b === void 0 ? void 0 : _b.status) === 401) {
                throw new common_1.BadRequestException("Unauthorized");
            }
            throw new common_1.BadRequestException('Error', err);
        }
    }
    async createUserWithKeycloak(UserData, token) {
        const role = UserData.role;
        delete UserData.role;
        console.log(role.toLocaleLowerCase());
        const decodeTokenData = (0, jwt_decode_1.default)(token);
        if (!decodeTokenData.realm_access.roles.includes('admin')) {
            throw new common_1.BadRequestException("Forbidden");
        }
        const keycloakAllUser = `${config_1.default.KEYCLOAK_URL}/admin/realms/${config_1.default.KEYCLOAK_REALM}/users`;
        const data = JSON.stringify(UserData);
        console.log(data, keycloakAllUser);
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService
                .post(keycloakAllUser, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
            }));
            console.log('response data ', response);
            if (response.status === 201) {
                const findRealmRole = `${config_1.default.KEYCLOAK_URL}/admin/realms/${config_1.default.KEYCLOAK_REALM}/roles`;
                const resp = await (0, rxjs_1.lastValueFrom)(this.httpService
                    .get(findRealmRole, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`,
                    },
                }));
                var kRealmRole = resp.data.find((roles, index) => {
                    console.log("roles", roles);
                    return JSON.stringify(roles.name.toLowerCase()) === JSON.stringify(role.toLowerCase());
                });
                const findClient = `${config_1.default.KEYCLOAK_URL}/admin/realms/${config_1.default.KEYCLOAK_REALM}/clients`;
                const respo = await (0, rxjs_1.lastValueFrom)(this.httpService
                    .get(findClient, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`,
                    },
                }));
                var cl;
                if (role.toLocaleLowerCase() == 'admin') {
                    cl = 'realm-management';
                }
                else {
                    cl = `${process.env.KEYCLOAK_CLIENT_ID}`;
                }
                var kClient = respo.data.find((clients, index) => clients.clientId === cl);
                var cr;
                if (role.toLocaleLowerCase() == 'admin') {
                    cr = 'realm-admin';
                }
                else {
                    cr = `${role.toLocaleLowerCase()}`;
                }
                const findClientRoles = `${config_1.default.KEYCLOAK_URL}/admin/realms/${config_1.default.KEYCLOAK_REALM}/clients/${kClient.id}/roles`;
                const respon = await (0, rxjs_1.lastValueFrom)(this.httpService
                    .get(findClientRoles, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`,
                    },
                }));
                console.log("cr2", cr.toLowerCase());
                var kClientRoles = respon.data.find((roles, index) => {
                    return roles.name.toLowerCase() === cr;
                });
                const loginData = {
                    username: UserData.username,
                    password: UserData.credentials[0].value,
                    grant_type: "password",
                    client_id: `${process.env.KEYCLOAK_CLIENT_ID}`,
                    client_secret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
                };
                const loginUser = await this.accessToken(loginData);
                let decodeToken;
                if (loginUser.access_token) {
                    decodeToken = (0, jwt_decode_1.default)(loginUser.access_token);
                }
                const SetRealmRole = `${config_1.default.KEYCLOAK_URL}/admin/realms/${config_1.default.KEYCLOAK_REALM}/users/${decodeToken.sub}/role-mappings/realm`;
                let str1 = `[{
              "id":"${kRealmRole.id}",
              "name":"${kRealmRole.name}"
              }]`;
                const reaction = await (0, rxjs_1.lastValueFrom)(this.httpService
                    .post(SetRealmRole, str1, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`,
                    },
                }));
                if ((reaction === null || reaction === void 0 ? void 0 : reaction.status) == 204) {
                    console.log("Realm Role Set!");
                }
                var scr;
                if (role.toLocaleLowerCase() == 'admin') {
                    scr = "realm-admin";
                }
                else {
                    scr = kClientRoles.name;
                }
                const SetClientRole = `${config_1.default.KEYCLOAK_URL}/admin/realms/${config_1.default.KEYCLOAK_REALM}/users/${decodeToken.sub}/role-mappings/clients/${kClient.id}`;
                let str2 = `[{
            "id":"${kClientRoles.id}",
            "name":"${scr}",
            "clientRole":"true"
            }]`;
                const react = await (0, rxjs_1.lastValueFrom)(this.httpService
                    .post(SetClientRole, str2, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`,
                    },
                }));
                if ((react === null || react === void 0 ? void 0 : react.status) == 204) {
                    return { message: 'SUCCESSFULLY CREATED USER WITH ROLES', keycloak_id: decodeToken.sub };
                }
                return { message: 'SUCCESSFULLY CREATED USER WITH ROLES', keycloak_id: decodeToken.sub };
            }
        }
        catch (error) {
            console.log("errors 1", error);
            if (error) {
                throw new common_1.BadRequestException(error);
            }
            else {
                throw new common_1.BadRequestException('error', error);
            }
        }
    }
    async getUserWithEmailKeycloak(email, token) {
        const keycloakGetUser = `${config_1.default.KEYCLOAK_URL}/admin/realms/${config_1.default.KEYCLOAK_REALM}/users/?email=${email}`;
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService
            .get(keycloakGetUser, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            },
        }));
        return response;
    }
    async updateUserWithKeycloak(id, body, token) {
        const keycloakUpdateUser = `${config_1.default.KEYCLOAK_URL}/admin/realms/${config_1.default.KEYCLOAK_REALM}/users/${id}`;
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService
            .put(keycloakUpdateUser, body, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            },
        }));
        return { message: "Keycloak user has been updated successfully", keycloak_id: id };
    }
    async updateUserStatusWithKeycloak(id, status, token) {
        const keycloakUpdateUser = `${config_1.default.KEYCLOAK_URL}/admin/realms/${config_1.default.KEYCLOAK_REALM}/users/${id}`;
        const body = `{"enabled":${status}}`;
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService
            .put(keycloakUpdateUser, body, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            },
        }));
        return { message: "Keycloak user has been updated successfully", keycloak_id: id };
    }
    async updateBulkUserStatusWithKeycloak(ids, status, token) {
        for (let i = 0; i < ids.length; i++) {
            const response = await this.updateUserStatusWithKeycloak(ids[i].keycloak_id, status, token);
            if (!response.keycloak_id) {
                throw new common_1.HttpException(`Found an incorrect keycloak id:${ids[i]}!`, 400);
            }
        }
        return { message: "Keycloak user has been updated successfully", keycloak_ids: ids };
    }
};
KeycloakService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], KeycloakService);
exports.KeycloakService = KeycloakService;
//# sourceMappingURL=keycloak.service.js.map