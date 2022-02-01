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
exports.BicycleAttributeDetailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bicycle_attribute_detail_entity_1 = require("./bicycle-attribute-detail.entity");
const fs = require('fs');
let BicycleAttributeDetailService = class BicycleAttributeDetailService {
    constructor(bicycleAttributeDetailRepo) {
        this.bicycleAttributeDetailRepo = bicycleAttributeDetailRepo;
        this.fileDirectory = "/media/ubaid/ExtraSpace1/tda-crm/tda-be-bicycle/uploads/";
    }
    async createBicycleAttributeDetail(body, file) {
        const b = JSON.parse(JSON.stringify(body));
        if (file) {
            b.logo = file.filename;
        }
        const result = await this.bicycleAttributeDetailRepo.save(b).catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        return result;
    }
    async updatedBicycleAttributeDetail(param, body, file) {
        const b = JSON.parse(JSON.stringify(body));
        if (file) {
            b.logo = file.filename;
            const getlogolink = await this.bicycleAttributeDetailRepo
                .createQueryBuilder("bicycle_attribute_detail")
                .select("bicycle_attribute_detail.logo")
                .where("bicycle_attribute_detail.id = :id", { id: param.id })
                .getOne();
            const filePath = `${this.fileDirectory}${getlogolink.logo}`;
            try {
                fs.unlinkSync(filePath);
            }
            catch (err) {
                console.error(err);
            }
        }
        const result = await this.bicycleAttributeDetailRepo.update({ id: param.id }, b).catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        if (result.affected !== 0) {
            const queryBuild = await this.bicycleAttributeDetailRepo
                .createQueryBuilder("bicycle_attribute_detail")
                .where("bicycle_attribute_detail.id = :id", { id: param.id })
                .getOne();
            return { data: queryBuild };
        }
        else {
            throw new common_1.HttpException("Bicycle Attribute Detail Not Found!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
BicycleAttributeDetailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bicycle_attribute_detail_entity_1.BicycleAttributeDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BicycleAttributeDetailService);
exports.BicycleAttributeDetailService = BicycleAttributeDetailService;
//# sourceMappingURL=bicycle-attribute-detail.service.js.map