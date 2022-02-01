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
exports.OrgtypeController = void 0;
const common_1 = require("@nestjs/common");
const idValidation_decorator_1 = require("../decorators/comman/idValidation.decorator");
const paginationValidation_decorator_1 = require("../decorators/comman/paginationValidation.decorator");
const pagination_dto_1 = require("../dto/comman/pagination.dto");
const createOrgtype_dto_1 = require("../dto/orgtype/createOrgtype.dto");
const updateOrgtype_dto_1 = require("../dto/orgtype/updateOrgtype.dto");
const updateOrgtypeValidation_decorator_1 = require("../decorators/orgtype/updateOrgtypeValidation.decorator");
const createOrgtypeValidation_decorator_1 = require("../decorators/orgtype/createOrgtypeValidation.decorator");
const orgtype_service_1 = require("./orgtype.service");
let OrgtypeController = class OrgtypeController {
    constructor(orgtypeService) {
        this.orgtypeService = orgtypeService;
    }
    async getOrgtypeList(query) {
        return await this.orgtypeService.findOrgtypeList(query);
    }
    async getOrgtypeById(param) {
        return await this.orgtypeService.findOrgtypeById(param);
    }
    async postOrgtype(body) {
        return await this.orgtypeService.createOrgtype(body);
    }
    async deleteOrgtypeById(param) {
        return await this.orgtypeService.removeOrgtype(param);
    }
    async putOrgtypeById(param, body) {
        return await this.orgtypeService.updatedOrgtype(param, body);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], OrgtypeController.prototype, "getOrgtypeList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrgtypeController.prototype, "getOrgtypeById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, createOrgtypeValidation_decorator_1.CreateOrgtypeValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createOrgtype_dto_1.CreateOrgtypeDto]),
    __metadata("design:returntype", Promise)
], OrgtypeController.prototype, "postOrgtype", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrgtypeController.prototype, "deleteOrgtypeById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateOrgtypeValidation_decorator_1.UpdateOrgtypeValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateOrgtype_dto_1.UpdateOrgtypeDto]),
    __metadata("design:returntype", Promise)
], OrgtypeController.prototype, "putOrgtypeById", null);
OrgtypeController = __decorate([
    (0, common_1.Controller)('orgtype'),
    __metadata("design:paramtypes", [orgtype_service_1.OrgtypeService])
], OrgtypeController);
exports.OrgtypeController = OrgtypeController;
//# sourceMappingURL=orgtype.controller.js.map