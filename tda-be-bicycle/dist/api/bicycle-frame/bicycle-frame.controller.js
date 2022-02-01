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
exports.BicycleFrameController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const createBicycleFrameValidation_decorator_1 = require("../../decorator/bicycleFrame/createBicycleFrameValidation.decorator");
const getAllBicycleFrameValidation_decorator_1 = require("../../decorator/bicycleFrame/getAllBicycleFrameValidation.decorator");
const updateBicycleFrameActivateValidation_decorator_1 = require("../../decorator/bicycleFrame/updateBicycleFrameActivateValidation.decorator");
const updateBicycleFrameValidation_decorator_1 = require("../../decorator/bicycleFrame/updateBicycleFrameValidation.decorator");
const idsBulkValidation_decorator_1 = require("../../decorator/comman/idsBulkValidation.decorator");
const idValidation_decorator_1 = require("../../decorator/comman/idValidation.decorator");
const paginationValidation_decorator_1 = require("../../decorator/comman/paginationValidation.decorator");
const createBicycleFrame_dto_1 = require("../../dto/bicycleFrame/createBicycleFrame.dto");
const getAllBicycleFrame_dto_1 = require("../../dto/bicycleFrame/getAllBicycleFrame.dto");
const updateBicycleFrame_dto_1 = require("../../dto/bicycleFrame/updateBicycleFrame.dto");
const updateBicycleFrameActivate_dto_1 = require("../../dto/bicycleFrame/updateBicycleFrameActivate.dto");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const bicycle_frame_service_1 = require("./bicycle-frame.service");
const multer_1 = require("multer");
const helper_1 = require("../../config/helper");
let BicycleFrameController = class BicycleFrameController {
    constructor(bicycleFrameService) {
        this.bicycleFrameService = bicycleFrameService;
    }
    async postBicycleFrame(body, file) {
        return await this.bicycleFrameService.createBicycleFrame(body, file);
    }
    async getBicycleFrameList(query, body) {
        return await this.bicycleFrameService.findBicycleFrameList(query, body);
    }
    async getActiveBicycleFrameList(query, body) {
        body.is_activated = 1;
        return await this.bicycleFrameService.findBicycleFrameList(query, body);
    }
    async getBicycleFrameById(param) {
        return await this.bicycleFrameService.findBicycleFrameById(param);
    }
    async patchBicycleFrameActivateById(param, body) {
        return await this.bicycleFrameService.updatedBicycleFrameActivate(param, body);
    }
    async patchBicycleFrameBulkActivateById(body1, body2) {
        return await this.bicycleFrameService.updatedBulkBicycleFrameActivate(body1, body2);
    }
    async putBicycleFrameById(param, body, file) {
        return await this.bicycleFrameService.updatedBicycleFrame(param, body, file);
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
    __param(0, (0, createBicycleFrameValidation_decorator_1.CreateBicycleFrameValidationDecorator)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBicycleFrame_dto_1.CreateBicycleFrameDto, Object]),
    __metadata("design:returntype", Promise)
], BicycleFrameController.prototype, "postBicycleFrame", null);
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllBicycleFrameValidation_decorator_1.GetAllBicycleFrameValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, getAllBicycleFrame_dto_1.GetAllBicycleFrameDto]),
    __metadata("design:returntype", Promise)
], BicycleFrameController.prototype, "getBicycleFrameList", null);
__decorate([
    (0, common_1.Get)('Active'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllBicycleFrameValidation_decorator_1.GetAllBicycleFrameValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, getAllBicycleFrame_dto_1.GetAllBicycleFrameDto]),
    __metadata("design:returntype", Promise)
], BicycleFrameController.prototype, "getActiveBicycleFrameList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BicycleFrameController.prototype, "getBicycleFrameById", null);
__decorate([
    (0, common_1.Patch)('Activate/:id'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateBicycleFrameActivateValidation_decorator_1.UpdateBicycleFrameActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateBicycleFrameActivate_dto_1.UpdateBicycleFrameActivateDto]),
    __metadata("design:returntype", Promise)
], BicycleFrameController.prototype, "patchBicycleFrameActivateById", null);
__decorate([
    (0, common_1.Patch)('BulkActivate'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __param(0, (0, idsBulkValidation_decorator_1.IDSBulkValidationDecorator)()),
    __param(1, (0, updateBicycleFrameActivateValidation_decorator_1.UpdateBicycleFrameActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateBicycleFrameActivate_dto_1.UpdateBicycleFrameActivateDto]),
    __metadata("design:returntype", Promise)
], BicycleFrameController.prototype, "patchBicycleFrameBulkActivateById", null);
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
    __param(1, (0, updateBicycleFrameValidation_decorator_1.UpdateBicycleFrameValidationDecorator)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateBicycleFrame_dto_1.UpdateBicycleFrameDto, Object]),
    __metadata("design:returntype", Promise)
], BicycleFrameController.prototype, "putBicycleFrameById", null);
BicycleFrameController = __decorate([
    (0, common_1.Controller)('bicycle-frame'),
    __metadata("design:paramtypes", [bicycle_frame_service_1.BicycleFrameService])
], BicycleFrameController);
exports.BicycleFrameController = BicycleFrameController;
//# sourceMappingURL=bicycle-frame.controller.js.map