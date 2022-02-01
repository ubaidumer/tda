"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSupplierValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.UpdateSupplierValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    let validate = await new Validator(body, {
        name: ['required', 'string'],
        email: ['required', 'email'],
        phone_num: ['required', 'numeric'],
        mobile: ['required', 'numeric'],
    });
    if (validate.passes() == false) {
        throw new common_1.HttpException('invalid body parameters', common_1.HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
});
//# sourceMappingURL=updateCategoryValidation.decorator.js.map