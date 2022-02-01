"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.CreateClientValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    let validate = await new Validator(body, {
        first_name: ['required', 'string'],
        last_name: ['required', 'string'],
        street: ['required', 'string'],
        street_num: ['required', 'string'],
        province: ['required', 'string'],
        country: ['required', 'string'],
        postal_code: ['required', 'string'],
        city: ['required', 'string'],
        email: ['required', 'email'],
        website: ['required', 'string'],
        phone_num: ['required', 'numeric'],
        mobile: ['required', 'numeric'],
        description: ['required', 'string'],
    });
    if (validate.passes() == false) {
        throw new common_1.HttpException('invalid body parameters', common_1.HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
});
//# sourceMappingURL=createClientValidation.decorator.js.map