"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBicycleFrameValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.CreateBicycleFrameValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
        name: ['required'],
        minimuim_product_alert: ['numeric', 'min:0'],
        turn_on_minimum_product_alert: ['numeric', 'min:0', 'max:1'],
        quantity: ['numeric', 'min:0'],
        bicycle_type_id: ['required', 'numeric'],
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
//# sourceMappingURL=createBicycleFrameValidation.decorator.js.map