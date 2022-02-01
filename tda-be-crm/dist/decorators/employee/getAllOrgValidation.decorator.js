"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllOrgValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.GetAllOrgValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    if (body.sortList == undefined) {
        body.sortList = { "org.id": "ASC" };
    }
    const rules = {
        is_activated: ['numeric', 'min:0', 'max:1'],
        name: ['string'],
        description: ['string'],
        street: ['string'],
        street_num: ['string'],
        postal_code: ['string'],
        city: ['string'],
        province: ['string'],
        country: ['string'],
        phone_num: ['string'],
        mobile: ['string'],
        website: ['string'],
        email: ['string']
    };
    const messages = {
        "string": ":attribute must be string!",
        "date": ":attribute must be date!",
        "numeric": ":attribute must be numeric!"
    };
    let validate = await new Validator(body, rules, messages);
    const result = validate.passes();
    if (result == false) {
        throw new common_1.HttpException(validate.errors, common_1.HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
});
//# sourceMappingURL=getAllOrgValidation.decorator.js.map