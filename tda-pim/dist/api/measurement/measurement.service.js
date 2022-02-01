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
exports.MeasurementService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const createMeasurement_dto_1 = require("../../dto/measurement/createMeasurement.dto");
const getAllMeasurement_dto_1 = require("../../dto/measurement/getAllMeasurement.dto");
const updateMeasurement_dto_1 = require("../../dto/measurement/updateMeasurement.dto");
const typeorm_2 = require("typeorm");
const measurement_entity_1 = require("./measurement.entity");
let MeasurementService = class MeasurementService {
    constructor(measurementRepo) {
        this.measurementRepo = measurementRepo;
    }
    async findMeasurementList(query, body) {
        const queryBuild = await this.measurementRepo
            .createQueryBuilder("measurement")
            .orderBy(body.sortList)
            .skip(query.limit * query.offset)
            .take(query.limit);
        if (body.is_activated !== undefined)
            queryBuild.andWhere("measurement.is_activated = :IsActive", {
                IsActive: body.is_activated,
            });
        const Data = await queryBuild.getMany();
        const Total = await queryBuild.getCount();
        return { data: Data, total: Total };
    }
    async findMeasurementById(param) {
        const queryBuild = await this.measurementRepo
            .createQueryBuilder("measurement")
            .where("measurement.id = :id", { id: param.id })
            .getOne();
        if (queryBuild !== undefined) {
            return { data: queryBuild };
        }
        else {
            throw new common_1.HttpException("Measurement Not Found!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createMeasurement(body) {
        const result = await this.measurementRepo.save(body).catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        return result;
    }
    async updatedMeasurement(param, body) {
        const result = await this.measurementRepo.update({ id: param.id }, body).catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        if (result.affected !== 0) {
            const queryBuild = await this.measurementRepo
                .createQueryBuilder("measurement")
                .where("measurement.id = :id", { id: param.id })
                .getOne();
            return { data: queryBuild };
        }
        else {
            throw new common_1.HttpException("Measurement Not Found!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateMeasurementStatus(param, body) {
        const result = await this.measurementRepo.update({ id: param.id }, body).catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        if (result.affected !== 0) {
            const queryBuild = await this.measurementRepo
                .createQueryBuilder("measurement")
                .where("measurement.id = :id", { id: param.id })
                .getOne();
            return { data: queryBuild };
        }
        else {
            throw new common_1.HttpException("Measurement Not Found!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateMeasurementBulkStatus(body1, body2) {
        const queryBuild = await this.measurementRepo
            .createQueryBuilder()
            .update(measurement_entity_1.Measurement)
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
MeasurementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(measurement_entity_1.Measurement)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MeasurementService);
exports.MeasurementService = MeasurementService;
//# sourceMappingURL=measurement.service.js.map