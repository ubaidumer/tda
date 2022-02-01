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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./booking.entity");
let BookingService = class BookingService {
    constructor(bookingRepo) {
        this.bookingRepo = bookingRepo;
    }
    async createBooking(body) {
        const result = await this.bookingRepo.save(body).catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        return result;
    }
    async findBookingList(query, body) {
        console.log(query, body);
        const queryBuild = await this.bookingRepo
            .createQueryBuilder("booking")
            .leftJoinAndSelect("booking.user", "user")
            .orderBy(body.sortList)
            .skip(query.limit * query.offset)
            .take(query.limit);
        if (body.is_activated !== undefined)
            queryBuild.andWhere("booking.is_activated = :IsActive", {
                IsActive: body.is_activated,
            });
        if (body.status !== undefined)
            queryBuild.andWhere("booking.status = :Status", {
                Status: body.status,
            });
        if (body.start_date !== undefined && body.end_date !== undefined)
            queryBuild.andWhere("booking.booking_date >= :after && booking.booking_date <= :before", {
                after: body.start_date,
                before: body.end_date + " " + "23:59:59.746877",
            });
        const Data = await queryBuild.getMany();
        const Total = await queryBuild.getCount();
        return { data: Data, total: Total };
    }
    async findBookingById(param) {
        const queryBuild = await this.bookingRepo
            .createQueryBuilder("booking")
            .leftJoinAndSelect("booking.user", "user")
            .where("booking.id = :id", { id: param.id })
            .getOne();
        if (queryBuild !== undefined) {
            return { data: queryBuild };
        }
        else {
            throw new common_1.HttpException("Booking Not Found!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updatedBookingStatus(param, body) {
        const result = await this.bookingRepo.update({ id: param.id }, body).catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        if (result.affected !== 0) {
            const queryBuild = await this.bookingRepo
                .createQueryBuilder("booking")
                .leftJoinAndSelect("booking.user", "user")
                .where("booking.id = :id", { id: param.id })
                .getOne();
            return { data: queryBuild };
        }
        else {
            throw new common_1.HttpException("Booking Not Found!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updatedBulkBookingStatus(body1, body2) {
        const queryBuild = await this.bookingRepo
            .createQueryBuilder()
            .update(booking_entity_1.Booking)
            .set({
            status: body2.status
        })
            .where('id IN (:ids)', { ids: body1.ids })
            .execute();
        if (body1.ids.length !== queryBuild.affected) {
            throw new common_1.HttpException(`${queryBuild.affected} rows has been updated`, common_1.HttpStatus.PARTIAL_CONTENT);
        }
        else {
            return { statusCode: common_1.HttpStatus.OK, message: `${queryBuild.affected} rows has been updated` };
        }
    }
    async updatedBookingActivate(param, body) {
        const result = await this.bookingRepo.update({ id: param.id }, body).catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        if (result.affected !== 0) {
            const queryBuild = await this.bookingRepo
                .createQueryBuilder("booking")
                .leftJoinAndSelect("booking.user", "user")
                .where("booking.id = :id", { id: param.id })
                .getOne();
            return { data: queryBuild };
        }
        else {
            throw new common_1.HttpException("Booking Not Found!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updatedBulkBookingActivate(body1, body2) {
        const queryBuild = await this.bookingRepo
            .createQueryBuilder()
            .update(booking_entity_1.Booking)
            .set({
            is_activated: body2.is_activated
        })
            .where('id IN (:ids)', { ids: body1.ids })
            .execute();
        if (body1.ids.length !== queryBuild.affected) {
            throw new common_1.HttpException(`${queryBuild.affected} rows has been updated`, common_1.HttpStatus.PARTIAL_CONTENT);
        }
        else {
            return { statusCode: common_1.HttpStatus.OK, message: `${queryBuild.affected} rows has been updated` };
        }
    }
};
BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map