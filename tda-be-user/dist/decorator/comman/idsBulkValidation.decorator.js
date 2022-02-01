"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDSBulkValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
const Validator = require("validatorjs");
exports.IDSBulkValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
        ids: ['array', 'required']
    };
    let validate = await new Validator(body, rules);
    const result = validate.passes();
    if (result == false) {
        throw new common_1.HttpException(validate.errors, common_1.HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
});
//# sourceMappingURL=idsBulkValidation.decorator.js.map