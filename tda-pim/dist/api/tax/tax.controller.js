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
exports.TaxController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const idsBulkValidation_decorator_copy_1 = require("../../decorators/comman/idsBulkValidation.decorator copy");
const idValidation_decorator_1 = require("../../decorators/comman/idValidation.decorator");
const paginationValidation_decorator_1 = require("../../decorators/comman/paginationValidation.decorator");
const toggleStatusValidation_decorator_1 = require("../../decorators/comman/toggleStatusValidation.decorator");
const createTaxValidation_decorator_1 = require("../../decorators/tax/createTaxValidation.decorator");
const getAllTaxValidation_decorator_1 = require("../../decorators/tax/getAllTaxValidation.decorator");
const updateTaxActivateValidation_decorator_1 = require("../../decorators/tax/updateTaxActivateValidation.decorator");
const updateTaxValidation_decorator_1 = require("../../decorators/tax/updateTaxValidation.decorator");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const createTax_dto_1 = require("../../dto/tax/createTax.dto");
const getAllTax_dto_1 = require("../../dto/tax/getAllTax.dto");
const updateTax_dto_1 = require("../../dto/tax/updateTax.dto");
const updateTaxActivate_dto_1 = require("../../dto/tax/updateTaxActivate.dto");
const tax_service_1 = require("./tax.service");
let TaxController = class TaxController {
    constructor(taxService) {
        this.taxService = taxService;
    }
    async getTaxList(query, body) {
        return await this.taxService.findTaxList(query, body);
    }
    async getActiveTaxList(query, body) {
        body.is_activated = 1;
        return await this.taxService.findTaxList(query, body);
    }
    async getTaxById(param) {
        return await this.taxService.findTaxById(param);
    }
    async postTax(body) {
        return await this.taxService.createTax(body);
    }
    async putTaxById(param, body) {
        return await this.taxService.updatedTax(param, body);
    }
    async putTaxStatusById(param, body) {
        return await this.taxService.updateTaxStatus(param, body);
    }
    async putTaxBulkStatusByIds(body1, body2) {
        return await this.taxService.updateTaxBulkStatus(body1, body2);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllTaxValidation_decorator_1.GetAllTaxValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto,
        getAllTax_dto_1.GetAllTaxDto]),
    __metadata("design:returntype", Promise)
], TaxController.prototype, "getTaxList", null);
__decorate([
    (0, common_1.Get)('Active'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllTaxValidation_decorator_1.GetAllTaxValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto,
        getAllTax_dto_1.GetAllTaxDto]),
    __metadata("design:returntype", Promise)
], TaxController.prototype, "getActiveTaxList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaxController.prototype, "getTaxById", null);
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, createTaxValidation_decorator_1.CreateTaxValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTax_dto_1.CreateTaxDto]),
    __metadata("design:returntype", Promise)
], TaxController.prototype, "postTax", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateTaxValidation_decorator_1.UpdateTaxValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateTax_dto_1.UpdateTaxDto]),
    __metadata("design:returntype", Promise)
], TaxController.prototype, "putTaxById", null);
__decorate([
    (0, common_1.Patch)('Activate/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateTaxActivateValidation_decorator_1.UpdateTaxActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateTaxActivate_dto_1.UpdateTaxActivateDto]),
    __metadata("design:returntype", Promise)
], TaxController.prototype, "putTaxStatusById", null);
__decorate([
    (0, common_1.Patch)('BulkActivate'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idsBulkValidation_decorator_copy_1.IDSBulkValidationDecorator)()),
    __param(1, (0, updateTaxActivateValidation_decorator_1.UpdateTaxActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateTaxActivate_dto_1.UpdateTaxActivateDto]),
    __metadata("design:returntype", Promise)
], TaxController.prototype, "putTaxBulkStatusByIds", null);
TaxController = __decorate([
    (0, common_1.Controller)('tax'),
    __metadata("design:paramtypes", [tax_service_1.TaxService])
], TaxController);
exports.TaxController = TaxController;
//# sourceMappingURL=tax.controller.js.map