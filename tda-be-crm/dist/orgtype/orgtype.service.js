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
exports.OrgtypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pagination_dto_1 = require("../dto/comman/pagination.dto");
const createOrgtype_dto_1 = require("../dto/orgtype/createOrgtype.dto");
const updateOrgtype_dto_1 = require("../dto/orgtype/updateOrgtype.dto");
const typeorm_2 = require("typeorm");
const orgtype_entity_1 = require("./orgtype.entity");
let OrgtypeService = class OrgtypeService {
    constructor(orgtypeRepo) {
        this.orgtypeRepo = orgtypeRepo;
    }
    async findOrgtypeList(query) {
        const data = await this.orgtypeRepo.query(`
                call tda.orgtype_list(${query.limit}, ${query.offset}, @total, @result);
                `);
        console.log(data[0][0]);
        return data[0][0];
    }
    async findOrgtypeById(param) {
        const data = await this.orgtypeRepo.query(`
                call tda.orgtype_get(${param.id ? param.id : 1}, @result);
                `);
        console.log(data[0][0]);
        return data[0][0];
    }
    async createOrgtype(body) {
        const data = await this.orgtypeRepo.query("call tda.orgtype_create('" +
            body.name +
            "','" +
            body.description +
            "','" +
            body.created_by +
            "','ACTIVE',@query_status); ");
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'orgtype created successfully';
        }
        else {
            return 'orgtype creation unsuccessfull';
        }
    }
    async removeOrgtype(param) {
        const data = await this.orgtypeRepo.query(`
                call tda.orgtype_delete(${param.id}, @query_status);
                `);
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'orgtype deleted successfully';
        }
        else {
            return 'orgtype deletion unsuccessfull';
        }
    }
    async updatedOrgtype(param, body) {
        const data = await this.orgtypeRepo.query("call tda.orgtype_update('" +
            param.id +
            "','" +
            body.name +
            "','" +
            body.description +
            "','" +
            body.status +
            "','" +
            body.updated_by +
            "',@query_status); ");
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'orgtype updated successfully';
        }
        else {
            return 'orgtype updation unsuccessfull';
        }
    }
};
OrgtypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orgtype_entity_1.Orgtype)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrgtypeService);
exports.OrgtypeService = OrgtypeService;
//# sourceMappingURL=orgtype.service.js.map