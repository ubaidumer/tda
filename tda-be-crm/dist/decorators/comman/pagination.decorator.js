"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.PaginationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    if (!query.limit) {
        query.limit = '10';
    }
    if (!query.offset) {
        query.offset = '0';
    }
    let validate = await new Validator(query, {
        limit: ['numeric', 'min:1', 'max:100'],
        offset: ['numeric', 'min:0', 'max:100']
    });
    if (validate.passes() == false) {
        throw new common_1.HttpException('invalid query parameters', common_1.HttpStatus.NOT_ACCEPTABLE);
    }
    return query;
});
//# sourceMappingURL=pagination.decorator.js.map