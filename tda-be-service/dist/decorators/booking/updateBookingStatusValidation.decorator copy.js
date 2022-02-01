"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookingStatusValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.UpdateBookingStatusValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
        status: ['required', 'in:Pending,In_Progress,Cancelled,Completed'],
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
//# sourceMappingURL=updateBookingStatusValidation.decorator%20copy.js.map