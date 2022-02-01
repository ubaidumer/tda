"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakCreateUserValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
exports.KeycloakCreateUserValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const keycloakUserData = {
        username: body.email,
        enabled: true,
        emailVerified: true,
        firstName: body.first_name,
        email: body.email,
        lastName: body.last_name,
        credentials: [{
                type: "password",
                value: "ubaiddon123",
                temporary: false
            }],
        role: body.user_type
    };
    return keycloakUserData;
});
//# sourceMappingURL=keycloakCreateUserValidation.decorator.js.map