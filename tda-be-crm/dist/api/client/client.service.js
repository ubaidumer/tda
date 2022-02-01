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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const createClient_dto_1 = require("../../dto/client/createClient.dto");
const getAllClient_dto_1 = require("../../dto/client/getAllClient.dto");
const updateClient_dto_1 = require("../../dto/client/updateClient.dto");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("./client.entity");
let ClientService = class ClientService {
    constructor(clientRepo) {
        this.clientRepo = clientRepo;
    }
    async findClientList(query, body) {
        const queryBuild = await this.clientRepo
            .createQueryBuilder("client")
            .orderBy(body.sortList)
            .skip(query.limit * query.offset)
            .take(query.limit);
        if (body.is_activated !== undefined)
            queryBuild.andWhere("client.is_activated = :IsActive", {
                IsActive: body.is_activated,
            });
        const Data = await queryBuild.getMany();
        const Total = await queryBuild.getCount();
        return { data: Data, total: Total };
    }
    async findClientById(param) {
        const queryBuild = await this.clientRepo
            .createQueryBuilder("client")
            .where("client.id = :id", { id: param.id })
            .getOne();
        if (queryBuild !== undefined) {
            return { data: queryBuild };
        }
        else {
            throw new common_1.HttpException("Client Not Found!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createClient(body) {
        const result = await this.clientRepo.save(body).catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        return result;
    }
    async updateClientStatus(param, body) {
        const result = await this.clientRepo.update({ id: param.id }, body).catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        if (result.affected !== 0) {
            const queryBuild = await this.clientRepo
                .createQueryBuilder("client")
                .where("client.id = :id", { id: param.id })
                .getOne();
            return { data: queryBuild };
        }
        else {
            throw new common_1.HttpException("Client Not Found!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateClientBulkStatus(body1, body2) {
        const queryBuild = await this.clientRepo
            .createQueryBuilder()
            .update(client_entity_1.Client)
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
    async updatedClient(param, body) {
        const result = await this.clientRepo.update({ id: param.id }, body).catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        if (result.affected !== 0) {
            const queryBuild = await this.clientRepo
                .createQueryBuilder("client")
                .where("client.id = :id", { id: param.id })
                .getOne();
            return { data: queryBuild };
        }
        else {
            throw new common_1.HttpException("Client Not Found!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map