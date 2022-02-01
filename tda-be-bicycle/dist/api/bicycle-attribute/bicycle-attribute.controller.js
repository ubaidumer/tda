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
exports.BicycleAttributeController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const createBicycleAttributeValidation_decorator_1 = require("../../decorator/bicycleAttribute/createBicycleAttributeValidation.decorator");
const getAllBicycleAttributeValidation_decorator_1 = require("../../decorator/bicycleAttribute/getAllBicycleAttributeValidation.decorator");
const updateBicycleAttributeActivateValidation_decorator_1 = require("../../decorator/bicycleAttribute/updateBicycleAttributeActivateValidation.decorator");
const updateBicycleAttributeValidation_decorator_1 = require("../../decorator/bicycleAttribute/updateBicycleAttributeValidation.decorator");
const idsBulkValidation_decorator_1 = require("../../decorator/comman/idsBulkValidation.decorator");
const idValidation_decorator_1 = require("../../decorator/comman/idValidation.decorator");
const paginationValidation_decorator_1 = require("../../decorator/comman/paginationValidation.decorator");
const createBicycleAttribute_dto_1 = require("../../dto/bicycleAttribute/createBicycleAttribute.dto");
const getAllBicycleAttribute_dto_1 = require("../../dto/bicycleAttribute/getAllBicycleAttribute.dto");
const updateBicycleAttribute_dto_1 = require("../../dto/bicycleAttribute/updateBicycleAttribute.dto");
const updateBicycleAttributeActivate_dto_1 = require("../../dto/bicycleAttribute/updateBicycleAttributeActivate.dto");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const bicycle_attribute_service_1 = require("./bicycle-attribute.service");
let BicycleAttributeController = class BicycleAttributeController {
    constructor(bicycleAttributeService) {
        this.bicycleAttributeService = bicycleAttributeService;
    }
    async postBicycleAttribute(body) {
        return await this.bicycleAttributeService.createBicycleAttribute(body);
    }
    async getBicycleAttributeList(query, body) {
        return await this.bicycleAttributeService.findBicycleAttributeList(query, body);
    }
    async getActiveBicycleAttributeList(query, body) {
        body.is_activated = 1;
        return await this.bicycleAttributeService.findBicycleAttributeList(query, body);
    }
    async getBicycleAttributeById(param) {
        return await this.bicycleAttributeService.findBicycleAttributeById(param);
    }
    async patchBicycleAttributeActivateById(param, body) {
        return await this.bicycleAttributeService.updatedBicycleAttributeActivate(param, body);
    }
    async patchBicycleAttributeBulkActivateById(body1, body2) {
        return await this.bicycleAttributeService.updatedBulkBicycleAttributeActivate(body1, body2);
    }
    async putBicycleAttributeById(param, body) {
        return await this.bicycleAttributeService.updatedBicycleAttribute(param, body);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, createBicycleAttributeValidation_decorator_1.CreateBicycleAttributeValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBicycleAttribute_dto_1.CreateBicycleAttributeDto]),
    __metadata("design:returntype", Promise)
], BicycleAttributeController.prototype, "postBicycleAttribute", null);
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllBicycleAttributeValidation_decorator_1.GetAllBicycleAttributeValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, getAllBicycleAttribute_dto_1.GetAllBicycleAttributeDto]),
    __metadata("design:returntype", Promise)
], BicycleAttributeController.prototype, "getBicycleAttributeList", null);
__decorate([
    (0, common_1.Get)('Active'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllBicycleAttributeValidation_decorator_1.GetAllBicycleAttributeValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, getAllBicycleAttribute_dto_1.GetAllBicycleAttributeDto]),
    __metadata("design:returntype", Promise)
], BicycleAttributeController.prototype, "getActiveBicycleAttributeList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BicycleAttributeController.prototype, "getBicycleAttributeById", null);
__decorate([
    (0, common_1.Patch)('Activate/:id'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateBicycleAttributeActivateValidation_decorator_1.UpdateBicycleAttributeActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateBicycleAttributeActivate_dto_1.UpdateBicycleAttributeActivateDto]),
    __metadata("design:returntype", Promise)
], BicycleAttributeController.prototype, "patchBicycleAttributeActivateById", null);
__decorate([
    (0, common_1.Patch)('BulkActivate'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, idsBulkValidation_decorator_1.IDSBulkValidationDecorator)()),
    __param(1, (0, updateBicycleAttributeActivateValidation_decorator_1.UpdateBicycleAttributeActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateBicycleAttributeActivate_dto_1.UpdateBicycleAttributeActivateDto]),
    __metadata("design:returntype", Promise)
], BicycleAttributeController.prototype, "patchBicycleAttributeBulkActivateById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateBicycleAttributeValidation_decorator_1.UpdateBicycleAttributeValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateBicycleAttribute_dto_1.UpdateBicycleAttributeDto]),
    __metadata("design:returntype", Promise)
], BicycleAttributeController.prototype, "putBicycleAttributeById", null);
BicycleAttributeController = __decorate([
    (0, common_1.Controller)('bicycle-attribute'),
    __metadata("design:paramtypes", [bicycle_attribute_service_1.BicycleAttributeService])
], BicycleAttributeController);
exports.BicycleAttributeController = BicycleAttributeController;
//# sourceMappingURL=bicycle-attribute.controller.js.map