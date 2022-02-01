"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTagValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.UpdateTagValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
        is_activated: ['numeric', 'max:1', "min:0"],
        color: ['string'],
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
//# sourceMappingURL=updateTagValidation.decorator.js.map