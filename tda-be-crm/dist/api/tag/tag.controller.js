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
exports.TagController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const idsBulkValidation_decorator_copy_1 = require("../../decorators/comman/idsBulkValidation.decorator copy");
const idValidation_decorator_1 = require("../../decorators/comman/idValidation.decorator");
const paginationValidation_decorator_1 = require("../../decorators/comman/paginationValidation.decorator");
const createTagValidation_decorator_1 = require("../../decorators/tag/createTagValidation.decorator");
const getAllTagValidation_decorator_1 = require("../../decorators/tag/getAllTagValidation.decorator");
const updateTagActivateValidation_decorator_1 = require("../../decorators/tag/updateTagActivateValidation.decorator");
const updateTagValidation_decorator_1 = require("../../decorators/tag/updateTagValidation.decorator");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const createTag_dto_1 = require("../../dto/tag/createTag.dto");
const getAllTag_dto_1 = require("../../dto/tag/getAllTag.dto");
const updateTag_dto_1 = require("../../dto/tag/updateTag.dto");
const updateTagActivate_dto_1 = require("../../dto/tag/updateTagActivate.dto");
const tag_service_1 = require("./tag.service");
let TagController = class TagController {
    constructor(tagService) {
        this.tagService = tagService;
    }
    async getTagList(query, body) {
        return await this.tagService.findTagList(query, body);
    }
    async getActiveTagList(query, body) {
        body.is_activated = 1;
        return await this.tagService.findTagList(query, body);
    }
    async getTagById(param) {
        return await this.tagService.findTagById(param);
    }
    async postTag(body) {
        return await this.tagService.createTag(body);
    }
    async putTagStatusById(param, body) {
        return await this.tagService.updateTagStatus(param, body);
    }
    async putTagById(param, body) {
        return await this.tagService.updatedTag(param, body);
    }
    async putTagBulkStatusByIds(body1, body2) {
        return await this.tagService.updateTagBulkStatus(body1, body2);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllTagValidation_decorator_1.GetAllTagValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto,
        getAllTag_dto_1.GetAllTagDto]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "getTagList", null);
__decorate([
    (0, common_1.Get)('Active'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllTagValidation_decorator_1.GetAllTagValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto,
        getAllTag_dto_1.GetAllTagDto]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "getActiveTagList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "getTagById", null);
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, createTagValidation_decorator_1.CreateTagValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTag_dto_1.CreateTagDto]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "postTag", null);
__decorate([
    (0, common_1.Patch)('Activate/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateTagActivateValidation_decorator_1.UpdateTagActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateTagActivate_dto_1.UpdateTagActivateDto]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "putTagStatusById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateTagValidation_decorator_1.UpdateTagValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateTag_dto_1.UpdateTagDto]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "putTagById", null);
__decorate([
    (0, common_1.Patch)('BulkActivate'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idsBulkValidation_decorator_copy_1.IDSBulkValidationDecorator)()),
    __param(1, (0, updateTagActivateValidation_decorator_1.UpdateTagActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateTagActivate_dto_1.UpdateTagActivateDto]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "putTagBulkStatusByIds", null);
TagController = __decorate([
    (0, common_1.Controller)('tag'),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], TagController);
exports.TagController = TagController;
//# sourceMappingURL=tag.controller.js.map