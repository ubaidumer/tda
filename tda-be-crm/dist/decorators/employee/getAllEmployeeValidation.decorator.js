"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllEmployeeValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.GetAllEmployeeValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    if (body.sortList == undefined) {
        body.sortList = { "employee.id": "ASC" };
    }
    const rules = {
        is_activated: ['numeric', 'min:0', 'max:1'],
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
//# sourceMappingURL=getAllEmployeeValidation.decorator.js.map