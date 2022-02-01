import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TagModule } from './api/tag/tag.module';
import { OrgtypeModule } from './api/orgtype/orgtype.module';
import { ClientModule } from './api/client/client.module';
import { EmployeeModule } from './api/employee/employee.module';
import CONFIG from './config/config';
import { TagController } from './api/tag/tag.controller';
import { KeycloakMiddleware } from 'src/middlewares/keycloakMiddleware';
import { OrgModule } from './api/org/org.module';
import { APP_GUARD } from '@nestjs/core';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard
} from 'nest-keycloak-connect';
import { OrgController } from './api/org/org.controller';
import { OrgtypeController } from './api/orgtype/orgtype.controller';
import { ClientController } from './api/client/client.controller';
import { EmployeeController } from './api/employee/employee.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: CONFIG.DATABASE_TYPE as any,
        host: CONFIG.DATABASE_HOST as any,
        port: CONFIG.DATABASE_PORT as any,
        username: CONFIG.DATABASE_USERNAME as any,
        password: CONFIG.DATABASE_PASSWORD as any,
        database: CONFIG.DATABASE_NAME as any,
        entities: CONFIG.DATABASE_ENTITIES as any,
        synchronize: CONFIG.DATABASE_SYNCHRONIZE as any,
        multipleStatements: CONFIG.DATABASE_MULTI_STATEMENT as any,
      }),
    }),
    KeycloakConnectModule.register({
      authServerUrl: CONFIG.KEYCLOAK_URL,
      realm: CONFIG.KEYCLOAK_REALM,
      clientId: CONFIG.KEYCLOAK_CLIENT,
      secret: CONFIG.KEYCLOAK_CLIENT_SECRET,
      cookieKey: 'KEYCLOAK_JWT',
      logLevels: ['warn'],
      useNestLogger: true,
    }),
    TagModule,
    OrgtypeModule,
    ClientModule,
    EmployeeModule,
    OrgModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },],
})
//export class AppModule{}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(KeycloakMiddleware)
      .forRoutes(TagController,OrgController,OrgtypeController,ClientController,EmployeeController);
  }
}
