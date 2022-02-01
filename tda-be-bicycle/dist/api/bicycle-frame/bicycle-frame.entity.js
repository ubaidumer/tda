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
exports.BicycleFrame = void 0;
const local_entity_1 = require("../../config/local/local.entity");
const typeorm_1 = require("typeorm");
const bicycle_type_entity_1 = require("../bicycle-type/bicycle-type.entity");
let BicycleFrame = class BicycleFrame {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BicycleFrame.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", local_entity_1.local)
], BicycleFrame.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", local_entity_1.local)
], BicycleFrame.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], BicycleFrame.prototype, "minimuim_product_alert", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], BicycleFrame.prototype, "turn_on_minimum_product_alert", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], BicycleFrame.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", local_entity_1.local)
], BicycleFrame.prototype, "per_day_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], BicycleFrame.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BicycleFrame.prototype, "bicycle_type_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => bicycle_type_entity_1.BicycleType, b => b.id),
    (0, typeorm_1.JoinColumn)({ name: 'bicycle_type_id' }),
    __metadata("design:type", Number)
], BicycleFrame.prototype, "bicycle_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], BicycleFrame.prototype, "is_activated", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BicycleFrame.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BicycleFrame.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BicycleFrame.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BicycleFrame.prototype, "updated_by", void 0);
BicycleFrame = __decorate([
    (0, typeorm_1.Entity)()
], BicycleFrame);
exports.BicycleFrame = BicycleFrame;
//# sourceMappingURL=bicycle-frame.entity.js.map