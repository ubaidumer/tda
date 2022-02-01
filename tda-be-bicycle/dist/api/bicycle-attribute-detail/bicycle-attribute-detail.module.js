"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BicycleAttributeDetailModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bicycle_attribute_detail_controller_1 = require("./bicycle-attribute-detail.controller");
const bicycle_attribute_detail_entity_1 = require("./bicycle-attribute-detail.entity");
const bicycle_attribute_detail_service_1 = require("./bicycle-attribute-detail.service");
let BicycleAttributeDetailModule = class BicycleAttributeDetailModule {
};
BicycleAttributeDetailModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([bicycle_attribute_detail_entity_1.BicycleAttributeDetail])],
        controllers: [bicycle_attribute_detail_controller_1.BicycleAttributeDetailController],
        providers: [bicycle_attribute_detail_service_1.BicycleAttributeDetailService]
    })
], BicycleAttributeDetailModule);
exports.BicycleAttributeDetailModule = BicycleAttributeDetailModule;
//# sourceMappingURL=bicycle-attribute-detail.module.js.map