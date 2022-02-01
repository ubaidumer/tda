"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLocationValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.UpdateLocationValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
        name: ['required', 'string'],
        address: ['string'],
        city: ['string'],
        postal_code: ['string']
    };
    const messages = {
        "required": ":attribute is required!",
        "string": ":attribute must be string!"
    };
    let validate = await new Validator(body, rules, messages);
    const result = validate.passes();
    if (result == false) {
        throw new common_1.HttpException(validate.errors, common_1.HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
});
//# sourceMappingURL=updateLocationValidation.decorator.js.map