"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllServicesValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.GetAllServicesValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    if (body.sortList == undefined) {
        body.sortList = { "services.id": "ASC" };
    }
    if (body.is_activated == undefined) {
        body.is_activated = '1';
    }
    const rules = {
        is_activated: ['required', 'numeric', 'min:0', 'max:1'],
    };
    const messages = {
        "numeric": ":attribute must be numeric!"
    };
    let validate = await new Validator(body, rules, messages);
    const result = validate.passes();
    if (result == false) {
        throw new common_1.HttpException(validate.errors, common_1.HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
});
//# sourceMappingURL=getAllServicesValidation.decorator.js.map