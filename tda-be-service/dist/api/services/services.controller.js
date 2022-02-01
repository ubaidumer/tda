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
exports.ServicesController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const idsBulkValidation_decorator_1 = require("../../decorators/comman/idsBulkValidation.decorator");
const idValidation_decorator_1 = require("../../decorators/comman/idValidation.decorator");
const paginationValidation_decorator_1 = require("../../decorators/comman/paginationValidation.decorator");
const createServicesValidation_decorator_1 = require("../../decorators/services/createServicesValidation.decorator");
const getAllServicesValidation_decorator_1 = require("../../decorators/services/getAllServicesValidation.decorator");
const updateServicesActivateValidation_decorator_1 = require("../../decorators/services/updateServicesActivateValidation.decorator");
const updateServicesValidation_decorator_copy_1 = require("../../decorators/services/updateServicesValidation.decorator copy");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const createServices_dto_1 = require("../../dto/services/createServices.dto");
const getAllServices_dto_1 = require("../../dto/services/getAllServices.dto");
const updateServices_dto_1 = require("../../dto/services/updateServices.dto");
const updateServicesActivate_dto_1 = require("../../dto/services/updateServicesActivate.dto");
const services_service_1 = require("./services.service");
let ServicesController = class ServicesController {
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    async postServices(body) {
        return await this.servicesService.createServices(body);
    }
    async getServicesList(query, body) {
        return await this.servicesService.findServicesList(query, body);
    }
    async getServicesById(param) {
        return await this.servicesService.findServicesById(param);
    }
    async patchServicesActivateById(param, body) {
        return await this.servicesService.updatedServicesActivate(param, body);
    }
    async patchServicesBulkActivateById(body1, body2) {
        return await this.servicesService.updatedBulkServicesActivate(body1, body2);
    }
    async putServicesActivateById(param, body) {
        return await this.servicesService.updatedServices(param, body);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, createServicesValidation_decorator_1.CreateServicesValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createServices_dto_1.CreateServicesDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "postServices", null);
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllServicesValidation_decorator_1.GetAllServicesValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, getAllServices_dto_1.GetAllServicesDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getServicesList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getServicesById", null);
__decorate([
    (0, common_1.Patch)('Activate/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateServicesActivateValidation_decorator_1.UpdateServicesActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateServicesActivate_dto_1.UpdateServicesActivateDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "patchServicesActivateById", null);
__decorate([
    (0, common_1.Patch)('BulkActivate'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idsBulkValidation_decorator_1.IDSBulkValidationDecorator)()),
    __param(1, (0, updateServicesActivateValidation_decorator_1.UpdateServicesActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateServicesActivate_dto_1.UpdateServicesActivateDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "patchServicesBulkActivateById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateServicesValidation_decorator_copy_1.UpdateServicesValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateServices_dto_1.UpdateServicesDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "putServicesActivateById", null);
ServicesController = __decorate([
    (0, common_1.Controller)('services'),
    __metadata("design:paramtypes", [services_service_1.ServicesService])
], ServicesController);
exports.ServicesController = ServicesController;
//# sourceMappingURL=services.controller.js.map