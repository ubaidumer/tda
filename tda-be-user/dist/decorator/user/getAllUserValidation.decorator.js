"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUserValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.GetAllUserValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    if (body.sortList == undefined) {
        body.sortList = { "user.id": "ASC" };
    }
    if (body.is_activated == undefined) {
        body.is_activated = '1';
    }
    const rules = {
        user_type: ['in:Customer,Admin'],
        is_activated: ['numeric', 'min:0', 'max:1'],
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
//# sourceMappingURL=getAllUserValidation.decorator.js.map