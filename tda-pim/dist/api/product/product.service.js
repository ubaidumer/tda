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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const createProduct_dto_1 = require("../../dto/product/createProduct.dto");
const updateProduct_dto_1 = require("../../dto/product/updateProduct.dto");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductService = class ProductService {
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async findProductList(query) {
        const data = await this.productRepo.query(`
                call tda.product_list(${query.limit}, ${query.offset}, @total, @result);
                `);
        console.log(data[0][0]);
        return data[0][0];
    }
    async findProductById(param) {
        const data = await this.productRepo.query(`
                call tda.product_get(${param.id ? param.id : 1}, @result);
                `);
        console.log(data[0][0]);
        return data[0][0];
    }
    async createProduct(body) {
        const data = await this.productRepo.query("call tda.product_create(" +
            (body.supplier_id ? body.supplier_id : null) +
            "," +
            (body.catalog_id ? body.catalog_id : null) +
            "," +
            (body.product_category_id ? body.product_category_id : null) +
            ",'" +
            body.title +
            "','" +
            (body.description ? body.description : null) +
            "','" +
            (body.description_short ? body.description_short : null) +
            "'," +
            body.price +
            "," +
            body.price_sale +
            "," +
            (body.is_shippable ? body.is_shippable : 0) +
            ",'" +
            body.type +
            "','" +
            (body.tag_ids ? body.tag_ids : null) +
            "'," +
            (body.is_taxed ? body.is_taxed : 0) +
            "," +
            (body.tax_class_id ? body.tax_class_id : null) +
            "," +
            (body.minimum_order ? body.minimum_order : 0) +
            "," +
            (body.weight ? body.weight : 0) +
            "," +
            (body.size_height ? body.size_height : 0) +
            "," +
            (body.size_width ? body.size_width : 0) +
            "," +
            (body.size_length ? body.size_length : 0) +
            ",'" +
            (body.up_sell ? body.up_sell : null) +
            "','" +
            (body.cross_sell ? body.cross_sell : null) +
            "','" +
            (body.ean ? body.ean : null) +
            "','" +
            (body.sku ? body.sku : null) +
            "'," +
            (body.back_order ? body.back_order : 0) +
            "," +
            (body.min_stock ? body.min_stock : 0) +
            ",'" +
            (body.created_by ? body.created_by : null) +
            "',1,@query_status); ").catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'product created successfully';
        }
        else {
            return 'product creation unsuccessfull';
        }
    }
    async updatedProduct(param, body) {
        const data = await this.productRepo.query("call tda.product_update('" +
            param.id +
            "'," +
            (body.supplier_id ? body.supplier_id : null) +
            "," +
            (body.catalog_id ? body.catalog_id : null) +
            "," +
            (body.product_category_id ? body.product_category_id : null) +
            ",'" +
            body.title +
            "','" +
            (body.description ? body.description : null) +
            "','" +
            (body.description_short ? body.description_short : null) +
            "'," +
            body.price +
            "," +
            body.price_sale +
            "," +
            (body.is_shippable ? body.is_shippable : 0) +
            ",'" +
            body.type +
            "','" +
            (body.tag_ids ? body.tag_ids : null) +
            "'," +
            (body.is_taxed ? body.is_taxed : 0) +
            "," +
            (body.tax_class_id ? body.tax_class_id : null) +
            "," +
            (body.minimum_order ? body.minimum_order : 0) +
            "," +
            (body.weight ? body.weight : 0) +
            "," +
            (body.size_height ? body.size_height : 0) +
            "," +
            (body.size_width ? body.size_width : 0) +
            "," +
            (body.size_length ? body.size_length : 0) +
            ",'" +
            (body.up_sell ? body.up_sell : null) +
            "','" +
            (body.cross_sell ? body.cross_sell : null) +
            "','" +
            (body.ean ? body.ean : null) +
            "','" +
            (body.sku ? body.sku : null) +
            "'," +
            (body.back_order ? body.back_order : 0) +
            "," +
            (body.min_stock ? body.min_stock : 0) +
            ",'" +
            body.updated_by +
            "','" +
            body.is_activated +
            "',@query_status); ").catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'product updated successfully';
        }
        else {
            return 'product updation unsuccessfull';
        }
    }
    async updateProductStatus(param, body) {
        const data = await this.productRepo.query(`
              call tda.product_toggle_status(${param.id},${body.is_activated},@query_status);
              `);
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
            return 'product status updated successfully';
        }
        else {
            return 'product status updation unsuccessfull';
        }
    }
    async updateProductBulkStatus(body1, body2) {
        console.log('ids:', body1.ids, 'is_activated:', body2.is_activated);
        const response = await (0, typeorm_2.getManager)()
            .createQueryBuilder()
            .update(product_entity_1.Product)
            .set({
            is_activated: body2.is_activated
        })
            .where('id IN (:ids)', { ids: body1.ids })
            .execute();
        return `${response.affected} rows has been updated`;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map