"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BicycleFrameModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bicycle_frame_controller_1 = require("./bicycle-frame.controller");
const bicycle_frame_entity_1 = require("./bicycle-frame.entity");
const bicycle_frame_service_1 = require("./bicycle-frame.service");
let BicycleFrameModule = class BicycleFrameModule {
};
BicycleFrameModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([bicycle_frame_entity_1.BicycleFrame])],
        controllers: [bicycle_frame_controller_1.BicycleFrameController],
        providers: [bicycle_frame_service_1.BicycleFrameService]
    })
], BicycleFrameModule);
exports.BicycleFrameModule = BicycleFrameModule;
//# sourceMappingURL=bicycle-frame.module.js.map