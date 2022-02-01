"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHeader = void 0;
const common_1 = require("@nestjs/common");
exports.AuthHeader = (0, common_1.createParamDecorator)(async (data, context) => {
    const ctx = context.switchToHttp().getRequest();
    console.log(ctx);
    const header = ctx.headers;
    console.log(header);
    const { authorization } = header;
    if (!authorization) {
        throw new common_1.BadRequestException(`TOKEN NOT FOUND`);
    }
    return authorization;
});
//# sourceMappingURL=authHeader.decorator.js.map