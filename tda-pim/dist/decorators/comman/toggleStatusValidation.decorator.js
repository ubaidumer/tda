"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleStatusValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.ToggleStatusValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
        is_activated: ['numeric', 'min:0', 'max:1'],
    };
    let validate = await new Validator(body, rules);
    const result = validate.passes();
    if (result == false) {
        throw new common_1.HttpException(validate.errors, common_1.HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
});
//# sourceMappingURL=toggleStatusValidation.decorator.js.map