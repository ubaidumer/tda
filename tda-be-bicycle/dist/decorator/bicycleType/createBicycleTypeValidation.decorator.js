"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBicycleTypeValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.CreateBicycleTypeValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
        name: ['required'],
        static_price: ['required', 'numeric']
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
//# sourceMappingURL=createBicycleTypeValidation.decorator.js.map