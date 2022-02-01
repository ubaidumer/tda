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
exports.StockController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const idsBulkValidation_decorator_copy_1 = require("../../decorators/comman/idsBulkValidation.decorator copy");
const idValidation_decorator_1 = require("../../decorators/comman/idValidation.decorator");
const paginationValidation_decorator_1 = require("../../decorators/comman/paginationValidation.decorator");
const toggleStatusValidation_decorator_1 = require("../../decorators/comman/toggleStatusValidation.decorator");
const createStockValidation_decorator_1 = require("../../decorators/stock/createStockValidation.decorator");
const updateStockValidation_decorator_1 = require("../../decorators/stock/updateStockValidation.decorator");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const createStock_dto_1 = require("../../dto/stock/createStock.dto");
const updateStock_dto_1 = require("../../dto/stock/updateStock.dto");
const stock_service_1 = require("./stock.service");
let StockController = class StockController {
    constructor(stockService) {
        this.stockService = stockService;
    }
    async getStockList(query) {
        return await this.stockService.findStockList(query);
    }
    async getStockById(param) {
        return await this.stockService.findStockById(param);
    }
    async postStock(body) {
        return await this.stockService.createStock(body);
    }
    async putStockStatusById(param, body) {
        return await this.stockService.updateStockStatus(param, body);
    }
    async putStockById(param, body) {
        return await this.stockService.updateStock(param, body);
    }
    async putStockBulkStatusByIds(body1, body2) {
        return await this.stockService.updateStockBulkStatus(body1, body2);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "getStockList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "getStockById", null);
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, createStockValidation_decorator_1.CreateStockValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createStock_dto_1.CreateStockDto]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "postStock", null);
__decorate([
    (0, common_1.Put)('ToggleStatus/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, toggleStatusValidation_decorator_1.ToggleStatusValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "putStockStatusById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateStockValidation_decorator_1.UpdateStockValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateStock_dto_1.UpdateStockDto]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "putStockById", null);
__decorate([
    (0, common_1.Put)('BulkToggleStatus'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idsBulkValidation_decorator_copy_1.IDSBulkValidationDecorator)()),
    __param(1, (0, toggleStatusValidation_decorator_1.ToggleStatusValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "putStockBulkStatusByIds", null);
StockController = __decorate([
    (0, common_1.Controller)('stock'),
    __metadata("design:paramtypes", [stock_service_1.StockService])
], StockController);
exports.StockController = StockController;
//# sourceMappingURL=stock.controller.js.map