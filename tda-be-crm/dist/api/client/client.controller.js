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
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const createClientValidation_decorator_1 = require("../../decorators/client/createClientValidation.decorator");
const getAllClientValidation_decorator_1 = require("../../decorators/client/getAllClientValidation.decorator");
const updateClientActivateValidation_decorator_1 = require("../../decorators/client/updateClientActivateValidation.decorator");
const updateClientValidation_decorator_1 = require("../../decorators/client/updateClientValidation.decorator");
const idsBulkValidation_decorator_copy_1 = require("../../decorators/comman/idsBulkValidation.decorator copy");
const idValidation_decorator_1 = require("../../decorators/comman/idValidation.decorator");
const paginationValidation_decorator_1 = require("../../decorators/comman/paginationValidation.decorator");
const toggleStatusValidation_decorator_1 = require("../../decorators/comman/toggleStatusValidation.decorator");
const createClient_dto_1 = require("../../dto/client/createClient.dto");
const getAllClient_dto_1 = require("../../dto/client/getAllClient.dto");
const updateClient_dto_1 = require("../../dto/client/updateClient.dto");
const updateClientActivate_dto_1 = require("../../dto/client/updateClientActivate.dto");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const client_service_1 = require("./client.service");
let ClientController = class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    async getClientList(query, body) {
        return await this.clientService.findClientList(query, body);
    }
    async getActiveClientList(query, body) {
        body.is_activated = 1;
        return await this.clientService.findClientList(query, body);
    }
    async getClientById(param) {
        return await this.clientService.findClientById(param);
    }
    async postClient(body) {
        return await this.clientService.createClient(body);
    }
    async putClientStatusById(param, body) {
        return await this.clientService.updateClientStatus(param, body);
    }
    async putClientBulkStatusByIds(body1, body2) {
        return await this.clientService.updateClientBulkStatus(body1, body2);
    }
    async putClientById(param, body) {
        return await this.clientService.updatedClient(param, body);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllClientValidation_decorator_1.GetAllClientValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto,
        getAllClient_dto_1.GetAllClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClientList", null);
__decorate([
    (0, common_1.Get)('Active'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllClientValidation_decorator_1.GetAllClientValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto,
        getAllClient_dto_1.GetAllClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getActiveClientList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClientById", null);
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, createClientValidation_decorator_1.CreateClientValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createClient_dto_1.CreateClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "postClient", null);
__decorate([
    (0, common_1.Patch)('Activate/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateClientActivateValidation_decorator_1.UpdateClientActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateClientActivate_dto_1.UpdateClientActivateDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "putClientStatusById", null);
__decorate([
    (0, common_1.Patch)('BulkActivate'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idsBulkValidation_decorator_copy_1.IDSBulkValidationDecorator)()),
    __param(1, (0, updateClientActivateValidation_decorator_1.UpdateClientActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateClientActivate_dto_1.UpdateClientActivateDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "putClientBulkStatusByIds", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateClientValidation_decorator_1.UpdateClientValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateClient_dto_1.UpdateClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "putClientById", null);
ClientController = __decorate([
    (0, common_1.Controller)('client'),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map