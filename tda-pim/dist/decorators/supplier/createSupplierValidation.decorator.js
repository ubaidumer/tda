"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSupplierValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.CreateSupplierValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
        name: ['required'],
        email: ['required', 'email'],
        phone_num: ['numeric'],
        mobile: ['required', 'numeric'],
        tax_number: ['required', 'string'],
        coc_number: ['required', 'string'],
        is_a_company: ['numeric'],
        address: ['string'],
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
//# sourceMappingURL=createSupplierValidation.decorator.js.map