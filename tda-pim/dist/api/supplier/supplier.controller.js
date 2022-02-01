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
exports.SupplierController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const idsBulkValidation_decorator_copy_1 = require("../../decorators/comman/idsBulkValidation.decorator copy");
const idValidation_decorator_1 = require("../../decorators/comman/idValidation.decorator");
const paginationValidation_decorator_1 = require("../../decorators/comman/paginationValidation.decorator");
const toggleStatusValidation_decorator_1 = require("../../decorators/comman/toggleStatusValidation.decorator");
const createSupplierValidation_decorator_1 = require("../../decorators/supplier/createSupplierValidation.decorator");
const getAllSupplierValidation_decorator_1 = require("../../decorators/supplier/getAllSupplierValidation.decorator");
const updateSupplierActivateValidation_decorator_1 = require("../../decorators/supplier/updateSupplierActivateValidation.decorator");
const updateSupplierValidation_decorator_1 = require("../../decorators/supplier/updateSupplierValidation.decorator");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const createSupplier_dto_1 = require("../../dto/supplier/createSupplier.dto");
const getAllSupplier_dto_1 = require("../../dto/supplier/getAllSupplier.dto");
const updateSupplier_dto_1 = require("../../dto/supplier/updateSupplier.dto");
const updateSupplierActivate_dto_1 = require("../../dto/supplier/updateSupplierActivate.dto");
const supplier_service_1 = require("./supplier.service");
let SupplierController = class SupplierController {
    constructor(supplierService) {
        this.supplierService = supplierService;
    }
    async getSupplierList(query, body) {
        return await this.supplierService.findSupplierList(query, body);
    }
    async getActiveSupplierList(query, body) {
        body.is_activated = 1;
        return await this.supplierService.findSupplierList(query, body);
    }
    async getSupplierById(param) {
        return await this.supplierService.findSupplierById(param);
    }
    async postSupplier(body) {
        return await this.supplierService.createSupplier(body);
    }
    async putSupplierById(param, body) {
        return await this.supplierService.updatedSupplier(param, body);
    }
    async putSupplierStatusById(param, body) {
        return await this.supplierService.updateSupplierStatus(param, body);
    }
    async putSupplierBulkStatusByIds(body1, body2) {
        return await this.supplierService.updateSupplierBulkStatus(body1, body2);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllSupplierValidation_decorator_1.GetAllSupplierValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto,
        getAllSupplier_dto_1.GetAllSupplierDto]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "getSupplierList", null);
__decorate([
    (0, common_1.Get)('Active'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllSupplierValidation_decorator_1.GetAllSupplierValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto,
        getAllSupplier_dto_1.GetAllSupplierDto]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "getActiveSupplierList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "getSupplierById", null);
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, createSupplierValidation_decorator_1.CreateSupplierValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createSupplier_dto_1.CreateSupplierDto]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "postSupplier", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateSupplierValidation_decorator_1.UpdateSupplierValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateSupplier_dto_1.UpdateSupplierDto]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "putSupplierById", null);
__decorate([
    (0, common_1.Patch)('Activate/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateSupplierActivateValidation_decorator_1.UpdateSupplierActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateSupplierActivate_dto_1.UpdateSupplierActivateDto]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "putSupplierStatusById", null);
__decorate([
    (0, common_1.Patch)('BulkActivate'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idsBulkValidation_decorator_copy_1.IDSBulkValidationDecorator)()),
    __param(1, (0, updateSupplierActivateValidation_decorator_1.UpdateSupplierActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateSupplierActivate_dto_1.UpdateSupplierActivateDto]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "putSupplierBulkStatusByIds", null);
SupplierController = __decorate([
    (0, common_1.Controller)('supplier'),
    __metadata("design:paramtypes", [supplier_service_1.SupplierService])
], SupplierController);
exports.SupplierController = SupplierController;
//# sourceMappingURL=supplier.controller.js.map