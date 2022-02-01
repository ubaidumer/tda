"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrgtypeValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.CreateOrgtypeValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
        name: ['required'],
        is_activated: ['numeric', 'max:1', "min:0"]
    };
    const messages = {
        "required": ":attribute is required!",
        "string": ":attribute must be string!",
    };
    let validate = await new Validator(body, rules, messages);
    const result = validate.passes();
    if (result == false) {
        throw new common_1.HttpException(validate.errors, common_1.HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
});
//# sourceMappingURL=createOrgtypeValidation.decorator.js.map