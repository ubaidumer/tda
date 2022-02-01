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
exports.OrgController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const idsBulkValidation_decorator_copy_1 = require("../../decorators/comman/idsBulkValidation.decorator copy");
const idValidation_decorator_1 = require("../../decorators/comman/idValidation.decorator");
const paginationValidation_decorator_1 = require("../../decorators/comman/paginationValidation.decorator");
const toggleStatusValidation_decorator_1 = require("../../decorators/comman/toggleStatusValidation.decorator");
const createOrgValidation_decorator_1 = require("../../decorators/org/createOrgValidation.decorator");
const getAllOrgValidation_decorator_1 = require("../../decorators/org/getAllOrgValidation.decorator");
const updateOrgActivateValidation_decorator_1 = require("../../decorators/org/updateOrgActivateValidation.decorator");
const updateOrgValidation_decorator_1 = require("../../decorators/org/updateOrgValidation.decorator");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const createOrg_dto_1 = require("../../dto/org/createOrg.dto");
const getAllOrgdto_1 = require("../../dto/org/getAllOrgdto");
const updateOrg_dto_1 = require("../../dto/org/updateOrg.dto");
const updateOrgActivate_dto_1 = require("../../dto/org/updateOrgActivate.dto");
const org_service_1 = require("./org.service");
let OrgController = class OrgController {
    constructor(orgService) {
        this.orgService = orgService;
    }
    async getEmployeeList(query, body) {
        return await this.orgService.findOrgList(query, body);
    }
    async getActiveOrgList(query, body) {
        body.is_activated = 1;
        return await this.orgService.findOrgList(query, body);
    }
    async getOrgById(param) {
        return await this.orgService.findOrgById(param);
    }
    async postOrg(body) {
        return await this.orgService.createOrg(body);
    }
    async putOrgStatusById(param, body) {
        return await this.orgService.updateOrgStatus(param, body);
    }
    async putOrgById(param, body) {
        return await this.orgService.updatedOrg(param, body);
    }
    async putOrgBulkStatusByIds(body1, body2) {
        return await this.orgService.updateOrgBulkStatus(body1, body2);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllOrgValidation_decorator_1.GetAllOrgValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto,
        getAllOrgdto_1.GetAllOrgDto]),
    __metadata("design:returntype", Promise)
], OrgController.prototype, "getEmployeeList", null);
__decorate([
    (0, common_1.Get)('Active'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllOrgValidation_decorator_1.GetAllOrgValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto,
        getAllOrgdto_1.GetAllOrgDto]),
    __metadata("design:returntype", Promise)
], OrgController.prototype, "getActiveOrgList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrgController.prototype, "getOrgById", null);
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, createOrgValidation_decorator_1.CreateOrgValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createOrg_dto_1.CreateOrgDto]),
    __metadata("design:returntype", Promise)
], OrgController.prototype, "postOrg", null);
__decorate([
    (0, common_1.Patch)('Activate/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateOrgActivateValidation_decorator_1.UpdateOrgActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateOrgActivate_dto_1.UpdateOrgActivateDto]),
    __metadata("design:returntype", Promise)
], OrgController.prototype, "putOrgStatusById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateOrgValidation_decorator_1.UpdateOrgValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateOrg_dto_1.UpdateOrgDto]),
    __metadata("design:returntype", Promise)
], OrgController.prototype, "putOrgById", null);
__decorate([
    (0, common_1.Patch)('BulkActivate'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idsBulkValidation_decorator_copy_1.IDSBulkValidationDecorator)()),
    __param(1, (0, updateOrgActivateValidation_decorator_1.UpdateOrgActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateOrgActivate_dto_1.UpdateOrgActivateDto]),
    __metadata("design:returntype", Promise)
], OrgController.prototype, "putOrgBulkStatusByIds", null);
OrgController = __decorate([
    (0, common_1.Controller)('org'),
    __metadata("design:paramtypes", [org_service_1.OrgService])
], OrgController);
exports.OrgController = OrgController;
//# sourceMappingURL=org.controller.js.map