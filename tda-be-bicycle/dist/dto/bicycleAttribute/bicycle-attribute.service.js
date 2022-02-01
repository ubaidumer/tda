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
exports.BicycleAttributeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bicycle_attribute_entity_1 = require("./bicycle-attribute.entity");
let BicycleAttributeService = class BicycleAttributeService {
    constructor(bicycleAttrBicycleAttributeRepo) {
        this.bicycleAttrBicycleAttributeRepo = bicycleAttrBicycleAttributeRepo;
    }
    async createBicycleAttribute(body) {
        const result = await this.bicycleAttrBicycleAttributeRepo.save(body).catch(err => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        return result;
    }
};
BicycleAttributeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bicycle_attribute_entity_1.BicycleAttribute)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BicycleAttributeService);
exports.BicycleAttributeService = BicycleAttributeService;
//# sourceMappingURL=bicycle-attribute.service.js.map