"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServicesValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.CreateServicesValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    Validator.register('mod', function (value, modvalue, attribute) {
        console.log("here", value, modvalue);
        if (value % modvalue == 0) {
            return true;
        }
        else {
            return false;
        }
    }, 'The :attribute must be divisible to :mod.');
    const rules = {
        name: ['required', 'string'],
        description: ['string'],
        parent_id: ['numeric'],
        price: ['numeric'],
        estimated_service_time: ['required', 'numeric', 'mod:5'],
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
//# sourceMappingURL=createServicesValidation.decorator.js.map