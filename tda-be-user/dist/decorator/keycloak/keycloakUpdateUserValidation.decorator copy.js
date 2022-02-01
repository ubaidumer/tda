"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakUpdateUserValidationDecorator = void 0;
const common_1 = require("@nestjs/common");
exports.KeycloakUpdateUserValidationDecorator = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    let keycloakUserData;
    if (body.email) {
        keycloakUserData.email = body.email;
        keycloakUserData.userName = body.email;
    }
    if (body.first_name) {
        keycloakUserData.firstName = body.first_name;
    }
    if (body.last_name) {
        keycloakUserData.lastName = body.last_name;
    }
    return keycloakUserData;
});
//# sourceMappingURL=keycloakUpdateUserValidation.decorator%20copy.js.map