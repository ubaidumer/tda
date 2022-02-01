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
exports.Product_Attributes = void 0;
const typeorm_1 = require("typeorm");
const measurement_entity_1 = require("../measurement/measurement.entity");
const product_entity_1 = require("../product/product.entity");
var Type;
(function (Type) {
    Type["LIST"] = "List";
    Type["TAG"] = "Tag";
    Type["COLOR"] = "Color";
    Type["SIZE"] = "Size";
    Type["WEIGHT"] = "Weight";
    Type["LENGTH"] = "Length";
})(Type || (Type = {}));
let Product_Attributes = class Product_Attributes {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product_Attributes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], Product_Attributes.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Product_Attributes.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product_Attributes.prototype, "is_activated", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Type,
        default: null
    }),
    __metadata("design:type", String)
], Product_Attributes.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => product_entity_1.Product, product => product.product_attributes),
    __metadata("design:type", Number)
], Product_Attributes.prototype, "product_", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => measurement_entity_1.Measurement, measurement => measurement.product_attributes),
    __metadata("design:type", Number)
], Product_Attributes.prototype, "measuring__unit_", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], Product_Attributes.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product_Attributes.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", Date)
], Product_Attributes.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product_Attributes.prototype, "updated_by", void 0);
Product_Attributes = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(["name"])
], Product_Attributes);
exports.Product_Attributes = Product_Attributes;
//# sourceMappingURL=product-attributes.entity.js.map