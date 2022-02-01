"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.UpdateProductValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
        title: ['required', 'string'],
        description: ['string'],
        description_short: ['string'],
        price: ['required', 'numeric'],
        price_sale: ['required', 'numeric'],
        is_shippable: ['numeric'],
        type: ['required', 'string'],
        tag_ids: ['string'],
        is_taxed: ['numeric'],
        minimum_order: ['numeric', 'min:1'],
        weight: ['numeric'],
        size_height: ['numeric'],
        size_width: ['numeric'],
        size_length: ['numeric'],
        up_sell: ['string'],
        cross_sell: ['string'],
        ean: ['required', 'string'],
        sku: ['required_if:type,Grouped', 'string'],
        back_order: ['numeric'],
        min_stock: ['numeric'],
        supplier_id: ['numeric'],
        catalog_id: ['numeric'],
        product_category_id: ['numeric'],
        tax_class_id: ['numeric']
    };
    const messages = {
        "required": ":attribute is required!",
        "numeric": ":attribute must be numeric!",
        "string": ":attribute must be string!"
    };
    let validate = await new Validator(body, rules, messages);
    const result = validate.passes();
    if (result == false) {
        throw new common_1.HttpException(validate.errors, common_1.HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
});
//# sourceMappingURL=updateProductValidation.decorator.js.map