"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductAttributesValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.CreateProductAttributesValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
        name: ['required', 'string'],
        value: ['required', 'string'],
        product_id: ['numeric'],
        measuring_unit_id: ['numeric'],
        type: ['required', 'string'],
    };
    const messages = {
        "required": ":attribute is required!",
        "numeric": ":attribute must be numeric!",
        "string": ":attribute must be string!"
    };
    let validate = await new Validator(body, rules, messages);
    const result = validate.passes();
    if (result == false) {
        throw new common_1.HttpException(validate.errors, common_1.HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
});
//# sourceMappingURL=createProductAttributesValidation.decorator.js.map