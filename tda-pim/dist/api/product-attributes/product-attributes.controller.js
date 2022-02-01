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
exports.ProductAttributesController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const idsBulkValidation_decorator_copy_1 = require("../../decorators/comman/idsBulkValidation.decorator copy");
const idValidation_decorator_1 = require("../../decorators/comman/idValidation.decorator");
const paginationValidation_decorator_1 = require("../../decorators/comman/paginationValidation.decorator");
const toggleStatusValidation_decorator_1 = require("../../decorators/comman/toggleStatusValidation.decorator");
const createProductAttributesValidation_decorator_1 = require("../../decorators/product-attributes/createProductAttributesValidation.decorator");
const updateProductAttributesValidation_decorator_1 = require("../../decorators/product-attributes/updateProductAttributesValidation.decorator");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const createProductAttributes_dto_1 = require("../../dto/product-attributes/createProductAttributes.dto");
const updateProductAttributes_dto_1 = require("../../dto/product-attributes/updateProductAttributes.dto");
const product_attributes_service_1 = require("./product-attributes.service");
let ProductAttributesController = class ProductAttributesController {
    constructor(productAttributesService) {
        this.productAttributesService = productAttributesService;
    }
    async getProductAttributesList(query) {
        return await this.productAttributesService.findProductAttributesList(query);
    }
    async getProductAttributesById(param) {
        return await this.productAttributesService.findProductAttributesById(param);
    }
    async postProductAttributes(body) {
        return await this.productAttributesService.createProductAttributes(body);
    }
    async putProductAttributesById(param, body) {
        return await this.productAttributesService.updatedProductAttributes(param, body);
    }
    async putProductAttributesStatusById(param, body) {
        return await this.productAttributesService.updateProductAttributesStatus(param, body);
    }
    async putProductAttributesBulkStatusByIds(body1, body2) {
        return await this.productAttributesService.updateProductAttributesBulkStatus(body1, body2);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ProductAttributesController.prototype, "getProductAttributesList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductAttributesController.prototype, "getProductAttributesById", null);
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, createProductAttributesValidation_decorator_1.CreateProductAttributesValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProductAttributes_dto_1.CreateProductAttributesDto]),
    __metadata("design:returntype", Promise)
], ProductAttributesController.prototype, "postProductAttributes", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateProductAttributesValidation_decorator_1.UpdateProductAttributesValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateProductAttributes_dto_1.UpdateProductAttributesDto]),
    __metadata("design:returntype", Promise)
], ProductAttributesController.prototype, "putProductAttributesById", null);
__decorate([
    (0, common_1.Put)('ToggleStatus/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, toggleStatusValidation_decorator_1.ToggleStatusValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductAttributesController.prototype, "putProductAttributesStatusById", null);
__decorate([
    (0, common_1.Put)('BulkToggleStatus'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idsBulkValidation_decorator_copy_1.IDSBulkValidationDecorator)()),
    __param(1, (0, toggleStatusValidation_decorator_1.ToggleStatusValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductAttributesController.prototype, "putProductAttributesBulkStatusByIds", null);
ProductAttributesController = __decorate([
    (0, common_1.Controller)('product-attributes'),
    __metadata("design:paramtypes", [product_attributes_service_1.ProductAttributesService])
], ProductAttributesController);
exports.ProductAttributesController = ProductAttributesController;
//# sourceMappingURL=product-attributes.controller.js.map