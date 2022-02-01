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
exports.ProductAttributesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const createProductAttributes_dto_1 = require("../../dto/product-attributes/createProductAttributes.dto");
const updateProductAttributes_dto_1 = require("../../dto/product-attributes/updateProductAttributes.dto");
const typeorm_2 = require("typeorm");
const product_attributes_entity_1 = require("./product-attributes.entity");
let ProductAttributesService = class ProductAttributesService {
    constructor(productAttributesRepo) {
        this.productAttributesRepo = productAttributesRepo;
    }
    async findProductAttributesList(query) {
        const data = await this.productAttributesRepo.query(`
                call tda.product_attributes_list(${query.limit}, ${query.offset}, @total, @result);
                `);
        console.log(data[0][0]);
        return data[0][0];
    }
    async findProductAttributesById(param) {
        const data = await this.productAttributesRepo.query(`
                call tda.product_attributes_get(${param.id ? param.id : 1}, @result);
                `);
        console.log(data[0][0]);
        return data[0][0];
    }
    async createProductAttributes(body) {
        const data = await this.productAttributesRepo.query("call tda.product_attributes_create('" +
            body.name +
            "','" +
            body.value +
            "','" +
            body.type +
            "'," +
            (body.product_id ? body.product_id : null) +
            "," +
            (body.measuring_unit_id ? body.measuring_unit_id : null) +
            ",'" +
            (body.created_by ? body.created_by : null) +
            "',1,@query_status); ").catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'product attributes created successfully';
        }
        else {
            return 'product attributes creation unsuccessfull';
        }
    }
    async updatedProductAttributes(param, body) {
        const data = await this.productAttributesRepo.query("call tda.product_attributes_update(" +
            param.id +
            ",'" +
            body.name +
            "','" +
            body.value +
            "','" +
            body.type +
            "'," +
            (body.product_id ? body.product_id : null) +
            "," +
            (body.measuring_unit_id ? body.measuring_unit_id : null) +
            ",'" +
            (body.updated_by ? body.updated_by : null) +
            "','" +
            body.is_activated +
            "',@query_status); ").catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'product attributes updated successfully';
        }
        else {
            return 'product attributes updation unsuccessfull';
        }
    }
    async updateProductAttributesStatus(param, body) {
        const data = await this.productAttributesRepo.query(`
                call tda.product_attributes_toggle_status(${param.id},${body.is_activated},@query_status);
                `);
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'product attributes status updated successfully';
        }
        else {
            return 'product attributes status updation unsuccessfull';
        }
    }
    async updateProductAttributesBulkStatus(body1, body2) {
        console.log('ids:', body1.ids, 'is_activated:', body2.is_activated);
        const response = await (0, typeorm_2.getManager)()
            .createQueryBuilder()
            .update(product_attributes_entity_1.Product_Attributes)
            .set({
            is_activated: body2.is_activated
        })
            .where('id IN (:ids)', { ids: body1.ids })
            .execute();
        return `${response.affected} rows has been updated`;
    }
};
ProductAttributesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_attributes_entity_1.Product_Attributes)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductAttributesService);
exports.ProductAttributesService = ProductAttributesService;
//# sourceMappingURL=product-attributes.service.js.map