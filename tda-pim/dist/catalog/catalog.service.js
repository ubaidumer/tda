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
exports.CatalogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const updateCatalog_dto_1 = require("../dto/catalog/updateCatalog.dto");
const createCatalog_dto_1 = require("../dto/catalog/createCatalog.dto");
const pagination_dto_1 = require("../dto/comman/pagination.dto");
const typeorm_2 = require("typeorm");
const catalog_entity_1 = require("./catalog.entity");
let CatalogService = class CatalogService {
    constructor(catalogRepo) {
        this.catalogRepo = catalogRepo;
    }
    async findCatalogList(query) {
        const data = await this.catalogRepo.query(`
                call tda.catalog_list(${query.limit}, ${query.offset}, @total, @result);
                `);
        console.log(data[0][0]);
        return data[0][0];
    }
    async findCatalogById(param) {
        const data = await this.catalogRepo.query(`
                call tda.catalog_get(${param.id ? param.id : 1}, @result);
                `);
        console.log(data[0][0]);
        return data[0][0];
    }
    async createCatalog(body) {
        const data = await this.catalogRepo.query("call tda.catalog_create('" +
            body.name +
            "','" +
            body.is_master +
            "','" +
            body.parent_id +
            "','" +
            body.created_by +
            "','ACTIVE',@query_status); ");
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'catalog created successfully';
        }
        else {
            return 'catalog creation unsuccessfull';
        }
    }
    async removeCatalog(param) {
        const data = await this.catalogRepo.query(`
                call tda.catalog_delete(${param.id}, @query_status);
                `);
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'catalog deleted successfully';
        }
        else {
            return 'catalog deletion unsuccessfull';
        }
    }
    async updatedCatalog(param, body) {
        const data = await this.catalogRepo.query("call tda.catalog_update('" +
            param.id +
            "','" +
            body.name +
            "','" +
            body.is_master +
            "','" +
            body.parent_id +
            "','" +
            body.updated_by +
            "','" +
            body.status +
            "',@query_status); ");
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'catalog updated successfully';
        }
        else {
            return 'catalog updation unsuccessfull';
        }
    }
};
CatalogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(catalog_entity_1.Catalog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CatalogService);
exports.CatalogService = CatalogService;
//# sourceMappingURL=catalog.service.js.map