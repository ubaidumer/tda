"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.IDValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const param = request.params;
    const rules = {
        id: ['numeric']
    };
    let validate = await new Validator(param, rules);
    const result = validate.passes();
    if (result == false) {
        throw new common_1.HttpException(validate.errors, common_1.HttpStatus.NOT_ACCEPTABLE);
    }
    return param;
});
//# sourceMappingURL=idValidation.decorator.js.map