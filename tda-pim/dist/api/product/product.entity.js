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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const local_entity_1 = require("../../config/local/local.entity");
const typeorm_1 = require("typeorm");
const catalog_entity_1 = require("../catalog/catalog.entity");
const category_entity_1 = require("../category/category.entity");
const product_attributes_entity_1 = require("../product-attributes/product-attributes.entity");
const stock_entity_1 = require("../stock/stock.entity");
const supplier_entity_1 = require("../supplier/supplier.entity");
const tax_entity_1 = require("../tax/tax.entity");
var Type;
(function (Type) {
    Type["GROUPED"] = "Grouped";
    Type["PRODUCT"] = "Product";
    Type["DOWNLOAD"] = "Download";
})(Type || (Type = {}));
let Product = class Product {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", local_entity_1.local)
], Product.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", local_entity_1.local)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description_short", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Product.prototype, "price_sale", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "is_shippable", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Type,
        default: null
    }),
    __metadata("design:type", String)
], Product.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "tag_ids", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "is_taxed", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Product.prototype, "minimum_order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "size_height", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "size_length", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "size_width", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "up_sell", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "cross_sell", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Product.prototype, "ean", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "back_order", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "min_stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "is_activated", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "supplier_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "catalog_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "product_category_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "tax_class_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => supplier_entity_1.Supplier, supplier => supplier.product),
    (0, typeorm_1.JoinColumn)({ name: 'supplier_id' }),
    __metadata("design:type", Number)
], Product.prototype, "supplier_", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => catalog_entity_1.Catalog, catalog => catalog.product),
    (0, typeorm_1.JoinColumn)({ name: 'catalog_id' }),
    __metadata("design:type", Number)
], Product.prototype, "catalog_", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => category_entity_1.Category, category => category.product),
    (0, typeorm_1.JoinColumn)({ name: 'product_category_id' }),
    __metadata("design:type", Number)
], Product.prototype, "product__category_", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => tax_entity_1.Tax, tax => tax.product),
    (0, typeorm_1.JoinColumn)({ name: 'tax_class_id' }),
    __metadata("design:type", Number)
], Product.prototype, "tax__class_", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => stock_entity_1.Stock, stock => stock.id),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => product_attributes_entity_1.Product_Attributes, product_attribute => product_attribute.id),
    __metadata("design:type", Number)
], Product.prototype, "product_attributes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "updated_by", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(["ean"]),
    (0, typeorm_1.Unique)(["sku"])
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map