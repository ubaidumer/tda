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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const createBookingValidation_decorator_1 = require("../../decorators/booking/createBookingValidation.decorator");
const getAllBookingValidation_decorator_1 = require("../../decorators/booking/getAllBookingValidation.decorator");
const updateBookingActivateValidation_decorator_1 = require("../../decorators/booking/updateBookingActivateValidation.decorator");
const updateBookingStatusValidation_decorator_1 = require("../../decorators/booking/updateBookingStatusValidation.decorator");
const idsBulkValidation_decorator_1 = require("../../decorators/comman/idsBulkValidation.decorator");
const idValidation_decorator_1 = require("../../decorators/comman/idValidation.decorator");
const paginationValidation_decorator_1 = require("../../decorators/comman/paginationValidation.decorator");
const createBooking_dto_1 = require("../../dto/booking/createBooking.dto");
const getAllBooking_dto_1 = require("../../dto/booking/getAllBooking.dto");
const updateBookingActivate_dto_1 = require("../../dto/booking/updateBookingActivate.dto");
const updateBookingStatus_dto_1 = require("../../dto/booking/updateBookingStatus.dto");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const booking_service_1 = require("./booking.service");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async postBooking(body) {
        return await this.bookingService.createBooking(body);
    }
    async getBookingList(query, body) {
        return await this.bookingService.findBookingList(query, body);
    }
    async getBookingById(param) {
        return await this.bookingService.findBookingById(param);
    }
    async patchBookingStatusById(param, body) {
        return await this.bookingService.updatedBookingStatus(param, body);
    }
    async patchBulkBookingStatusByIds(body1, body2) {
        return await this.bookingService.updatedBulkBookingStatus(body1, body2);
    }
    async patchBookingActivateById(param, body) {
        return await this.bookingService.updatedBookingActivate(param, body);
    }
    async patchBookingBulkActivateById(body1, body2) {
        return await this.bookingService.updatedBulkBookingActivate(body1, body2);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, createBookingValidation_decorator_1.CreateBookingValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBooking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "postBooking", null);
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllBookingValidation_decorator_1.GetAllBookingValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, getAllBooking_dto_1.GetAllBookingDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookingList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookingById", null);
__decorate([
    (0, common_1.Patch)('UpdateStatus/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateBookingStatusValidation_decorator_1.UpdateBookingStatusValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateBookingStatus_dto_1.UpdateBookingStatusDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "patchBookingStatusById", null);
__decorate([
    (0, common_1.Patch)('BulkUpdateStatus'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idsBulkValidation_decorator_1.IDSBulkValidationDecorator)()),
    __param(1, (0, updateBookingStatusValidation_decorator_1.UpdateBookingStatusValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateBookingStatus_dto_1.UpdateBookingStatusDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "patchBulkBookingStatusByIds", null);
__decorate([
    (0, common_1.Patch)('Activate/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateBookingActivateValidation_decorator_1.UpdateBookingActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateBookingActivate_dto_1.UpdateBookingActivateDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "patchBookingActivateById", null);
__decorate([
    (0, common_1.Patch)('BulkActivate'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idsBulkValidation_decorator_1.IDSBulkValidationDecorator)()),
    __param(1, (0, updateBookingActivateValidation_decorator_1.UpdateBookingActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateBookingActivate_dto_1.UpdateBookingActivateDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "patchBookingBulkActivateById", null);
BookingController = __decorate([
    (0, common_1.Controller)('booking'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map