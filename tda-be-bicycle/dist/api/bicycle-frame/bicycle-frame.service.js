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
exports.BicycleFrameService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bicycle_frame_entity_1 = require("./bicycle-frame.entity");
const fs = require('fs');
let BicycleFrameService = class BicycleFrameService {
    constructor(bicycleFrameRepo) {
        this.bicycleFrameRepo = bicycleFrameRepo;
        this.fileDirectory = "/media/ubaid/ExtraSpace1/tda-crm/tda-be-bicycle/uploads/";
    }
    async createBicycleFrame(body, file) {
        const b = JSON.parse(JSON.stringify(body));
        if (file) {
            b.logo = file.filename;
        }
        const result = await this.bicycleFrameRepo.save(b).catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        return result;
    }
    async findBicycleFrameById(param) {
        const queryBuild = await this.bicycleFrameRepo
            .createQueryBuilder("bicycle_frame")
            .where("bicycle_frame.id = :id", { id: param.id })
            .getOne();
        if (queryBuild !== undefined) {
            return { data: queryBuild };
        }
        else {
            throw new common_1.HttpException("Bicycle frame Not Found!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findBicycleFrameList(query, body) {
        const queryBuild = await this.bicycleFrameRepo
            .createQueryBuilder("bicycle_frame")
            .orderBy(body.sortList)
            .skip(query.limit * query.offset)
            .take(query.limit);
        if (body.is_activated !== undefined)
            queryBuild.andWhere("bicycle_frame.is_activated = :IsActive", {
                IsActive: body.is_activated,
            });
        const Data = await queryBuild.getMany();
        const Total = await queryBuild.getCount();
        return { data: Data, total: Total };
    }
    async updatedBicycleFrameActivate(param, body) {
        const result = await this.bicycleFrameRepo.update({ id: param.id }, body).catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        if (result.affected !== 0) {
            const queryBuild = await this.bicycleFrameRepo
                .createQueryBuilder("bicycle_frame")
                .where("bicycle_frame.id = :id", { id: param.id })
                .getOne();
            return { data: queryBuild };
        }
        else {
            throw new common_1.HttpException("Bicycle Frame Not Found!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updatedBulkBicycleFrameActivate(body1, body2) {
        const queryBuild = await this.bicycleFrameRepo
            .createQueryBuilder()
            .update(bicycle_frame_entity_1.BicycleFrame)
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
    async updatedBicycleFrame(param, body, file) {
        const b = JSON.parse(JSON.stringify(body));
        if (file) {
            b.logo = file.filename;
            const getlogolink = await this.bicycleFrameRepo
                .createQueryBuilder("bicycle_frame")
                .select("bicycle_frame.logo")
                .where("bicycle_frame.id = :id", { id: param.id })
                .getOne();
            const filePath = `${this.fileDirectory}${getlogolink.logo}`;
            try {
                fs.unlinkSync(filePath);
            }
            catch (err) {
                console.error(err);
            }
        }
        const result = await this.bicycleFrameRepo.update({ id: param.id }, body).catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        if (result.affected !== 0) {
            const queryBuild = await this.bicycleFrameRepo
                .createQueryBuilder("bicycle_frame")
                .where("bicycle_frame.id = :id", { id: param.id })
                .getOne();
            return { data: queryBuild };
        }
        else {
            throw new common_1.HttpException("Bicycle Frame Not Found!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
BicycleFrameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bicycle_frame_entity_1.BicycleFrame)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BicycleFrameService);
exports.BicycleFrameService = BicycleFrameService;
//# sourceMappingURL=bicycle-frame.service.js.map