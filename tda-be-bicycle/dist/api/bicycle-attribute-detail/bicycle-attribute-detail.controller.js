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
exports.BicycleAttributeDetailController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const helper_1 = require("../../config/helper");
const createBicycleAttributeDetailValidation_decorator_1 = require("../../decorator/bicycleAttributeDetail/createBicycleAttributeDetailValidation.decorator");
const updateBicycleAttributeDetailValidation_decorator_1 = require("../../decorator/bicycleAttributeDetail/updateBicycleAttributeDetailValidation.decorator");
const idValidation_decorator_1 = require("../../decorator/comman/idValidation.decorator");
const createBicycleAttributeDetail_dto_1 = require("../../dto/bicycleAttributeDetail/createBicycleAttributeDetail.dto");
const updateBicycleAttributeDetail_dto_1 = require("../../dto/bicycleAttributeDetail/updateBicycleAttributeDetail.dto");
const bicycle_attribute_detail_service_1 = require("./bicycle-attribute-detail.service");
let BicycleAttributeDetailController = class BicycleAttributeDetailController {
    constructor(bicycleAttributeDetailService) {
        this.bicycleAttributeDetailService = bicycleAttributeDetailService;
    }
    async postBicycleAttributeDetail(body, file) {
        return await this.bicycleAttributeDetailService.createBicycleAttributeDetail(body, file);
    }
    async putBicycleAttributeDetailById(param, body, file) {
        return await this.bicycleAttributeDetailService.updatedBicycleAttributeDetail(param, body, file);
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
    __param(0, (0, createBicycleAttributeDetailValidation_decorator_1.CreateBicycleAttributeDetailValidationDecorator)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBicycleAttributeDetail_dto_1.CreateBicycleAttributeDetailDto, Object]),
    __metadata("design:returntype", Promise)
], BicycleAttributeDetailController.prototype, "postBicycleAttributeDetail", null);
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
    __param(1, (0, updateBicycleAttributeDetailValidation_decorator_1.UpdateBicycleAttributeDetailValidationDecorator)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateBicycleAttributeDetail_dto_1.UpdateBicycleAttributeDetailDto, Object]),
    __metadata("design:returntype", Promise)
], BicycleAttributeDetailController.prototype, "putBicycleAttributeDetailById", null);
BicycleAttributeDetailController = __decorate([
    (0, common_1.Controller)('bicycle-attribute-detail'),
    __metadata("design:paramtypes", [bicycle_attribute_detail_service_1.BicycleAttributeDetailService])
], BicycleAttributeDetailController);
exports.BicycleAttributeDetailController = BicycleAttributeDetailController;
//# sourceMappingURL=bicycle-attribute-detail.controller.js.map