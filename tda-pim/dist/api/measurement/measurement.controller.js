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
exports.MeasurementController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const idsBulkValidation_decorator_copy_1 = require("../../decorators/comman/idsBulkValidation.decorator copy");
const idValidation_decorator_1 = require("../../decorators/comman/idValidation.decorator");
const paginationValidation_decorator_1 = require("../../decorators/comman/paginationValidation.decorator");
const toggleStatusValidation_decorator_1 = require("../../decorators/comman/toggleStatusValidation.decorator");
const createMeasurementValidation_decorator_1 = require("../../decorators/measurement/createMeasurementValidation.decorator");
const getAllMeasurementValidation_decorator_1 = require("../../decorators/measurement/getAllMeasurementValidation.decorator");
const updateMeasurementActivateValidation_decorator_1 = require("../../decorators/measurement/updateMeasurementActivateValidation.decorator");
const updateMeasurementValidation_decorator_1 = require("../../decorators/measurement/updateMeasurementValidation.decorator");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const createMeasurement_dto_1 = require("../../dto/measurement/createMeasurement.dto");
const getAllMeasurement_dto_1 = require("../../dto/measurement/getAllMeasurement.dto");
const updateMeasurement_dto_1 = require("../../dto/measurement/updateMeasurement.dto");
const updateMeasurementActivate_dto_1 = require("../../dto/measurement/updateMeasurementActivate.dto");
const measurement_service_1 = require("./measurement.service");
let MeasurementController = class MeasurementController {
    constructor(measurementService) {
        this.measurementService = measurementService;
    }
    async getMeasurementList(query, body) {
        return await this.measurementService.findMeasurementList(query, body);
    }
    async getActiveMeasurementList(query, body) {
        body.is_activated = 1;
        return await this.measurementService.findMeasurementList(query, body);
    }
    async getMeasurementById(param) {
        return await this.measurementService.findMeasurementById(param);
    }
    async postMeasurement(body) {
        return await this.measurementService.createMeasurement(body);
    }
    async putMeasurementById(param, body) {
        return await this.measurementService.updatedMeasurement(param, body);
    }
    async putMeasurementStatusById(param, body) {
        return await this.measurementService.updateMeasurementStatus(param, body);
    }
    async putMeasurementBulkStatusByIds(body1, body2) {
        return await this.measurementService.updateMeasurementBulkStatus(body1, body2);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllMeasurementValidation_decorator_1.GetAllMeasurementValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto,
        getAllMeasurement_dto_1.GetAllMeasurementDto]),
    __metadata("design:returntype", Promise)
], MeasurementController.prototype, "getMeasurementList", null);
__decorate([
    (0, common_1.Get)('Active'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllMeasurementValidation_decorator_1.GetAllMeasurementValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto,
        getAllMeasurement_dto_1.GetAllMeasurementDto]),
    __metadata("design:returntype", Promise)
], MeasurementController.prototype, "getActiveMeasurementList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MeasurementController.prototype, "getMeasurementById", null);
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, createMeasurementValidation_decorator_1.CreateMeasurementValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createMeasurement_dto_1.CreateMeasurementDto]),
    __metadata("design:returntype", Promise)
], MeasurementController.prototype, "postMeasurement", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateMeasurementValidation_decorator_1.UpdateMeasurementValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateMeasurement_dto_1.UpdateMeasurementDto]),
    __metadata("design:returntype", Promise)
], MeasurementController.prototype, "putMeasurementById", null);
__decorate([
    (0, common_1.Patch)('Activate/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateMeasurementActivateValidation_decorator_1.UpdateMeasurementActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateMeasurementActivate_dto_1.UpdateMeasurementActivateDto]),
    __metadata("design:returntype", Promise)
], MeasurementController.prototype, "putMeasurementStatusById", null);
__decorate([
    (0, common_1.Patch)('BulkActivate'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idsBulkValidation_decorator_copy_1.IDSBulkValidationDecorator)()),
    __param(1, (0, updateMeasurementActivateValidation_decorator_1.UpdateMeasurementActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateMeasurementActivate_dto_1.UpdateMeasurementActivateDto]),
    __metadata("design:returntype", Promise)
], MeasurementController.prototype, "putMeasurementBulkStatusByIds", null);
MeasurementController = __decorate([
    (0, common_1.Controller)('measurement'),
    __metadata("design:paramtypes", [measurement_service_1.MeasurementService])
], MeasurementController);
exports.MeasurementController = MeasurementController;
//# sourceMappingURL=measurement.controller.js.map