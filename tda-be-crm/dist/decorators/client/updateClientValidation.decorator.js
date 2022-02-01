"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.UpdateClientValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
        first_name: ['string'],
        last_name: ['string'],
        street: ['string'],
        street_num: ['string'],
        province: ['string'],
        country: ['string'],
        postal_code: ['string'],
        city: ['string'],
        email: ['email'],
        website: ['string'],
        phone_num: ['numeric'],
        mobile: ['numeric'],
        tag_ids: ['string'],
        is_activated: ['numeric', 'max:1', "min:0"]
    };
    const messages = {
        "required": ":attribute is required!",
        "string": ":attribute must be string!",
        "numeric": ":attribute must be numeric!"
    };
    let validate = await new Validator(body, rules, messages);
    const result = validate.passes();
    if (result == false) {
        throw new common_1.HttpException(validate.errors, common_1.HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
});
//# sourceMappingURL=updateClientValidation.decorator.js.map