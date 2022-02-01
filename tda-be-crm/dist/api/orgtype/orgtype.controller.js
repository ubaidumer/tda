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
exports.OrgtypeController = void 0;
const common_1 = require("@nestjs/common");
const idValidation_decorator_1 = require("../../decorators/comman/idValidation.decorator");
const paginationValidation_decorator_1 = require("../../decorators/comman/paginationValidation.decorator");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const createOrgtype_dto_1 = require("../../dto/orgtype/createOrgtype.dto");
const updateOrgtype_dto_1 = require("../../dto/orgtype/updateOrgtype.dto");
const updateOrgtypeValidation_decorator_1 = require("../../decorators/orgtype/updateOrgtypeValidation.decorator");
const createOrgtypeValidation_decorator_1 = require("../../decorators/orgtype/createOrgtypeValidation.decorator");
const orgtype_service_1 = require("./orgtype.service");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const idsBulkValidation_decorator_copy_1 = require("../../decorators/comman/idsBulkValidation.decorator copy");
const getAllOrgtypeValidation_decorator_1 = require("../../decorators/orgtype/getAllOrgtypeValidation.decorator");
const getAllOrgtypedto_1 = require("../../dto/orgtype/getAllOrgtypedto");
const updateTagActivateValidation_decorator_1 = require("../../decorators/tag/updateTagActivateValidation.decorator");
const updateTagActivate_dto_1 = require("../../dto/tag/updateTagActivate.dto");
let OrgtypeController = class OrgtypeController {
    constructor(orgtypeService) {
        this.orgtypeService = orgtypeService;
    }
    async getOrgtypeList(query, body) {
        return await this.orgtypeService.findOrgtypeList(query, body);
    }
    async getActiveOrgtypeList(query, body) {
        body.is_activated = 1;
        return await this.orgtypeService.findOrgtypeList(query, body);
    }
    async getOrgtypeById(param) {
        return await this.orgtypeService.findOrgtypeById(param);
    }
    async postOrgtype(body) {
        return await this.orgtypeService.createOrgtype(body);
    }
    async putOrgTypeStatusById(param, body) {
        return await this.orgtypeService.updateOrgTypeStatus(param, body);
    }
    async putOrgtypeById(param, body) {
        return await this.orgtypeService.updatedOrgtype(param, body);
    }
    async putOrgtypeBulkStatusByIds(body1, body2) {
        return await this.orgtypeService.updateOrgtypeBulkStatus(body1, body2);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllOrgtypeValidation_decorator_1.GetAllOrgtypeValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto,
        getAllOrgtypedto_1.GetAllOrgTypeDto]),
    __metadata("design:returntype", Promise)
], OrgtypeController.prototype, "getOrgtypeList", null);
__decorate([
    (0, common_1.Get)('Active'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllOrgtypeValidation_decorator_1.GetAllOrgtypeValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto,
        getAllOrgtypedto_1.GetAllOrgTypeDto]),
    __metadata("design:returntype", Promise)
], OrgtypeController.prototype, "getActiveOrgtypeList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrgtypeController.prototype, "getOrgtypeById", null);
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, createOrgtypeValidation_decorator_1.CreateOrgtypeValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createOrgtype_dto_1.CreateOrgtypeDto]),
    __metadata("design:returntype", Promise)
], OrgtypeController.prototype, "postOrgtype", null);
__decorate([
    (0, common_1.Put)('Activate/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateTagActivateValidation_decorator_1.UpdateTagActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateTagActivate_dto_1.UpdateTagActivateDto]),
    __metadata("design:returntype", Promise)
], OrgtypeController.prototype, "putOrgTypeStatusById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateOrgtypeValidation_decorator_1.UpdateOrgtypeValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateOrgtype_dto_1.UpdateOrgtypeDto]),
    __metadata("design:returntype", Promise)
], OrgtypeController.prototype, "putOrgtypeById", null);
__decorate([
    (0, common_1.Put)('BulkActivate'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idsBulkValidation_decorator_copy_1.IDSBulkValidationDecorator)()),
    __param(1, (0, updateTagActivateValidation_decorator_1.UpdateTagActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateTagActivate_dto_1.UpdateTagActivateDto]),
    __metadata("design:returntype", Promise)
], OrgtypeController.prototype, "putOrgtypeBulkStatusByIds", null);
OrgtypeController = __decorate([
    (0, common_1.Controller)('orgtype'),
    __metadata("design:paramtypes", [orgtype_service_1.OrgtypeService])
], OrgtypeController);
exports.OrgtypeController = OrgtypeController;
//# sourceMappingURL=orgtype.controller.js.map