"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.PaginationValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    if (query.limit == undefined) {
        query.limit = '10';
    }
    if (query.offset == undefined) {
        query.offset = '0';
    }
    const rules = {
        limit: ['numeric', 'min:1', 'max:100'],
        offset: ['numeric', 'min:0', 'max:100']
    };
    let validate = await new Validator(query, rules);
    const result = validate.passes();
    if (result == false) {
        throw new common_1.HttpException(validate.errors, common_1.HttpStatus.NOT_ACCEPTABLE);
    }
    return query;
});
//# sourceMappingURL=paginationValidation.decorator.js.map