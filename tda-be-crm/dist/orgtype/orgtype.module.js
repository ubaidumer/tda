"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgtypeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orgtype_controller_1 = require("./orgtype.controller");
const orgtype_entity_1 = require("./orgtype.entity");
const orgtype_service_1 = require("./orgtype.service");
let OrgtypeModule = class OrgtypeModule {
};
OrgtypeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([orgtype_entity_1.Orgtype])],
        controllers: [orgtype_controller_1.OrgtypeController],
        providers: [orgtype_service_1.OrgtypeService]
    })
], OrgtypeModule);
exports.OrgtypeModule = OrgtypeModule;
//# sourceMappingURL=orgtype.module.js.map