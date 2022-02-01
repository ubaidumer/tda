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
exports.BicycleTypeController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const helper_1 = require("../../config/helper");
const createBicycleTypeValidation_decorator_1 = require("../../decorator/bicycleType/createBicycleTypeValidation.decorator");
const getAllBicycleTypeValidation_decorator_1 = require("../../decorator/bicycleType/getAllBicycleTypeValidation.decorator");
const updateBicycleTypeActivateValidation_decorator_1 = require("../../decorator/bicycleType/updateBicycleTypeActivateValidation.decorator");
const updateBicycleTypeValidation_decorator_1 = require("../../decorator/bicycleType/updateBicycleTypeValidation.decorator");
const idsBulkValidation_decorator_1 = require("../../decorator/comman/idsBulkValidation.decorator");
const idValidation_decorator_1 = require("../../decorator/comman/idValidation.decorator");
const paginationValidation_decorator_1 = require("../../decorator/comman/paginationValidation.decorator");
const createBicycleType_dto_1 = require("../../dto/bicycleType/createBicycleType.dto");
const getAllBicycleType_dto_1 = require("../../dto/bicycleType/getAllBicycleType.dto");
const updateBicycleType_dto_1 = require("../../dto/bicycleType/updateBicycleType.dto");
const updateBicycleTypeActivate_dto_1 = require("../../dto/bicycleType/updateBicycleTypeActivate.dto");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const bicycle_type_service_1 = require("./bicycle-type.service");
let BicycleTypeController = class BicycleTypeController {
    constructor(bicycleTypeService) {
        this.bicycleTypeService = bicycleTypeService;
    }
    async postBicycleType(body, file) {
        return await this.bicycleTypeService.createBicycleType(body, file);
    }
    async getActiveBicycleTypeList(query, body) {
        body.is_activated = 1;
        return await this.bicycleTypeService.findBicycleTypeList(query, body);
    }
    async putBicycleTypeById(param, body, file) {
        return await this.bicycleTypeService.updatedBicycleType(param, body, file);
    }
    async getBicycleTypeList(query, body) {
        return await this.bicycleTypeService.findBicycleTypeList(query, body);
    }
    async getBicycleTypeById(param) {
        return await this.bicycleTypeService.findBicycleTypeById(param);
    }
    async patchBicycleTypeActivateById(param, body) {
        return await this.bicycleTypeService.updatedBicycleTypeActivate(param, body);
    }
    async patchBicycleTypeBulkActivateById(body1, body2) {
        return await this.bicycleTypeService.updatedBulkBicycleTypeActivate(body1, body2);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Unprotected)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: helper_1.Helper.destinationPath,
            filename: helper_1.Helper.customFileName
        }),
    })),
    __param(0, (0, createBicycleTypeValidation_decorator_1.CreateBicycleTypeValidationDecorator)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBicycleType_dto_1.CreateBicycleTypeDto, Object]),
    __metadata("design:returntype", Promise)
], BicycleTypeController.prototype, "postBicycleType", null);
__decorate([
    (0, common_1.Get)('Active'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllBicycleTypeValidation_decorator_1.GetAllBicycleTypeValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, getAllBicycleType_dto_1.GetAllBicycleTypeDto]),
    __metadata("design:returntype", Promise)
], BicycleTypeController.prototype, "getActiveBicycleTypeList", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: helper_1.Helper.destinationPath,
            filename: helper_1.Helper.customFileName
        }),
    })),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateBicycleTypeValidation_decorator_1.UpdateBicycleTypeValidationDecorator)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateBicycleType_dto_1.UpdateBicycleTypeDto, Object]),
    __metadata("design:returntype", Promise)
], BicycleTypeController.prototype, "putBicycleTypeById", null);
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllBicycleTypeValidation_decorator_1.GetAllBicycleTypeValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, getAllBicycleType_dto_1.GetAllBicycleTypeDto]),
    __metadata("design:returntype", Promise)
], BicycleTypeController.prototype, "getBicycleTypeList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BicycleTypeController.prototype, "getBicycleTypeById", null);
__decorate([
    (0, common_1.Patch)('Activate/:id'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateBicycleTypeActivateValidation_decorator_1.UpdateBicycleTypeActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateBicycleTypeActivate_dto_1.UpdateBicycleTypeActivateDto]),
    __metadata("design:returntype", Promise)
], BicycleTypeController.prototype, "patchBicycleTypeActivateById", null);
__decorate([
    (0, common_1.Patch)('BulkActivate'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, idsBulkValidation_decorator_1.IDSBulkValidationDecorator)()),
    __param(1, (0, updateBicycleTypeActivateValidation_decorator_1.UpdateBicycleTypeActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateBicycleTypeActivate_dto_1.UpdateBicycleTypeActivateDto]),
    __metadata("design:returntype", Promise)
], BicycleTypeController.prototype, "patchBicycleTypeBulkActivateById", null);
BicycleTypeController = __decorate([
    (0, common_1.Controller)('bicycle-type'),
    __metadata("design:paramtypes", [bicycle_type_service_1.BicycleTypeService])
], BicycleTypeController);
exports.BicycleTypeController = BicycleTypeController;
//# sourceMappingURL=bicycle-type.controller.js.map