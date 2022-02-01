"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("./config/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.listen(config_1.default.NEST_APP_PORT ? config_1.default.NEST_APP_PORT : 2000);
}
bootstrap();
//# sourceMappingURL=main.js.map