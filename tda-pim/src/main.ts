import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import CONFIG from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(CONFIG.NEST_APP_PORT?CONFIG.NEST_APP_PORT:4000);
}
bootstrap();
