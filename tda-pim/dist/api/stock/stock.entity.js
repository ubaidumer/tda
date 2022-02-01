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
exports.Stock = void 0;
const typeorm_1 = require("typeorm");
const location_entity_1 = require("../location/location.entity");
const product_entity_1 = require("../product/product.entity");
const supplier_entity_1 = require("../supplier/supplier.entity");
let Stock = class Stock {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Stock.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Stock.prototype, "price_per_unit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stock.prototype, "total_products", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Stock.prototype, "delivery_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stock.prototype, "is_activated", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => product_entity_1.Product, product => product.stock),
    __metadata("design:type", Number)
], Stock.prototype, "product_", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => location_entity_1.Location, location => location.stock),
    __metadata("design:type", Number)
], Stock.prototype, "location_", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => supplier_entity_1.Supplier, supplier => supplier.stock),
    __metadata("design:type", Number)
], Stock.prototype, "supplier_", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], Stock.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Stock.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", Date)
], Stock.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Stock.prototype, "updated_by", void 0);
Stock = __decorate([
    (0, typeorm_1.Entity)()
], Stock);
exports.Stock = Stock;
//# sourceMappingURL=stock.entity.js.map