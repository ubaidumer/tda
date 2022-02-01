"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBicycleAttributeDetailValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.CreateBicycleAttributeDetailValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
        name: ['required'],
        quantity: ['numeric', 'min:0'],
        bicycle_attribute_id: ['required', 'numeric'],
    };
    const messages = {
        "required": ":attribute is required!",
        "string": ":attribute must be string!",
        "date": ":attribute must be date!"
    };
    let validate = await new Validator(body, rules, messages);
    const result = validate.passes();
    if (result == false) {
        throw new common_1.HttpException(validate.errors, common_1.HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
});
//# sourceMappingURL=createBicycleAttributeDetailValidation.decorator.js.map