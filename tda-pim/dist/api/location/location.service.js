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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const createLocation_dto_1 = require("../../dto/location/createLocation.dto");
const updateLocation_dto_1 = require("../../dto/location/updateLocation.dto");
const typeorm_2 = require("typeorm");
const location_entity_1 = require("./location.entity");
let LocationService = class LocationService {
    constructor(locationRepo) {
        this.locationRepo = locationRepo;
    }
    async findLocationList(query) {
        const data = await this.locationRepo.query(`
                call tda.location_list(${query.limit}, ${query.offset}, @total, @result);
                `);
        console.log(data[0][0]);
        return data[0][0];
    }
    async findLocationById(param) {
        const data = await this.locationRepo.query(`
                call tda.location_get(${param.id ? param.id : 1}, @result);
                `);
        console.log(data[0][0]);
        return data[0][0];
    }
    async createLocation(body) {
        const data = await this.locationRepo.query("call tda.location_create('" +
            body.name +
            "','" +
            (body.location_type ? body.location_type : 'store') +
            "','" +
            (body.address ? body.address : null) +
            "','" +
            (body.city ? body.city : null) +
            "','" +
            (body.postal_code ? body.postal_code : null) +
            "','" +
            (body.created_by ? body.created_by : null) +
            "',1,@query_status); ").catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'location created successfully';
        }
        else {
            return 'location creation unsuccessfull';
        }
    }
    async updateLocationStatus(param, body) {
        const data = await this.locationRepo.query(`
                call tda.location_toggle_status(${param.id},${body.is_activated},@query_status);
                `);
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'location status updated successfully';
        }
        else {
            return 'location status updation unsuccessfull';
        }
    }
    async updatedLocation(param, body) {
        const data = await this.locationRepo.query("call tda.location_update('" +
            param.id +
            "','" +
            body.name +
            "','" +
            body.location_type +
            "','" +
            body.address +
            "','" +
            body.city +
            "','" +
            body.postal_code +
            "','" +
            body.updated_by +
            "','" +
            body.is_activated +
            "',@query_status); ").catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'location updated successfully';
        }
        else {
            return 'location updation unsuccessfull';
        }
    }
    async updateLocationBulkStatus(body1, body2) {
        console.log('ids:', body1.ids, 'is_activated:', body2.is_activated);
        const response = await (0, typeorm_2.getManager)()
            .createQueryBuilder()
            .update(location_entity_1.Location)
            .set({
            is_activated: body2.is_activated
        })
            .where('id IN (:ids)', { ids: body1.ids })
            .execute();
        return `${response.affected} rows has been updated`;
    }
};
LocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(location_entity_1.Location)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LocationService);
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map