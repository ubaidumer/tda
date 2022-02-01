"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStockValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.CreateStockValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
        price_per_unit: ['required', 'numeric'],
        total_products: ['required', 'numeric'],
        product_id: ['numeric'],
        location_id: ['numeric'],
        supplier_id: ['numeric'],
        delivery_date: ['date']
    };
    const messages = {
        "required": ":attribute is required!",
        "numeric": ":attribute must be numeric!",
        "date": ":attribute must be date!"
    };
    let validate = await new Validator(body, rules, messages);
    const result = validate.passes();
    if (result == false) {
        throw new common_1.HttpException(validate.errors, common_1.HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
});
//# sourceMappingURL=createStockValidation.decorator.js.map