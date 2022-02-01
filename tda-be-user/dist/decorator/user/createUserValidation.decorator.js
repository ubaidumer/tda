"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.CreateUserValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
        first_name: ['required', 'string'],
        last_name: ['required', 'string'],
        email: ['required', 'email'],
        gender: ['in:Male,Female', 'required'],
        address: ['string'],
        city: ['string'],
        country: ['string'],
        postal_code: ['string'],
        user_type: ['in:Customer,Admin', 'required'],
        is_activated: ['required', 'numeric', 'min:0', 'max:1'],
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
//# sourceMappingURL=createUserValidation.decorator.js.map