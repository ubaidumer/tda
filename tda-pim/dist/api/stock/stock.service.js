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
exports.StockService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const createStock_dto_1 = require("../../dto/stock/createStock.dto");
const updateStock_dto_1 = require("../../dto/stock/updateStock.dto");
const typeorm_2 = require("typeorm");
const stock_entity_1 = require("./stock.entity");
let StockService = class StockService {
    constructor(stockRepo) {
        this.stockRepo = stockRepo;
    }
    async findStockList(query) {
        const data = await this.stockRepo.query(`
                call tda.stock_list(${query.limit}, ${query.offset}, @total, @result);
                `);
        console.log(data[0][0]);
        return data[0][0];
    }
    async findStockById(param) {
        const data = await this.stockRepo.query(`
                call tda.stock_get(${param.id ? param.id : 1}, @result);
                `);
        console.log(data[0][0]);
        return data[0][0];
    }
    async createStock(body) {
        const data = await this.stockRepo.query("call tda.stock_create(" +
            (body.product_id ? body.product_id : null) +
            "," +
            body.price_per_unit +
            "," +
            body.total_products +
            "," +
            (body.location_id ? body.location_id : null) +
            "," +
            (body.supplier_id ? body.supplier_id : null) +
            ",'" +
            (body.delivery_date ? body.delivery_date : null) +
            "','" +
            (body.created_by ? body.created_by : null) +
            "',1,@query_status); ").catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'stock created successfully';
        }
        else {
            return 'stock creation unsuccessfull';
        }
    }
    async updateStockStatus(param, body) {
        const data = await this.stockRepo.query(`
                call tda.stock_toggle_status(${param.id},${body.is_activated},@query_status);
                `);
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'stock status updated successfully';
        }
        else {
            return 'stock status updation unsuccessfull';
        }
    }
    async updateStock(param, body) {
        const data = await this.stockRepo.query("call tda.stock_update(" +
            param.id +
            "," +
            (body.product_id ? body.product_id : null) +
            "," +
            body.price_per_unit +
            "," +
            body.total_products +
            "," +
            (body.location_id ? body.location_id : null) +
            "," +
            (body.supplier_id ? body.supplier_id : null) +
            ",'" +
            (body.delivery_date ? body.delivery_date : null) +
            "','" +
            body.updated_by +
            "','" +
            body.is_activated +
            "',@query_status); ").catch(err => {
            throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'stock updated successfully';
        }
        else {
            return 'stock updation unsuccessfull';
        }
    }
    async updateStockBulkStatus(body1, body2) {
        console.log('ids:', body1.ids, 'is_activated:', body2.is_activated);
        const response = await (0, typeorm_2.getManager)()
            .createQueryBuilder()
            .update(stock_entity_1.Stock)
            .set({
            is_activated: body2.is_activated
        })
            .where('id IN (:ids)', { ids: body1.ids })
            .execute();
        return `${response.affected} rows has been updated`;
    }
};
StockService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stock_entity_1.Stock)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StockService);
exports.StockService = StockService;
//# sourceMappingURL=stock.service.js.map