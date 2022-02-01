import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { KeycloakConnectModule, AuthGuard, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import CONFIG from './config/config';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './api/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    /*TypeOrmModule.forRootAsync({
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
    }),*/
    KeycloakConnectModule.register({
      authServerUrl: CONFIG.KEYCLOAK_URL,
      realm: CONFIG.KEYCLOAK_REALM,
      clientId: CONFIG.KEYCLOAK_CLIENT,
      secret: CONFIG.KEYCLOAK_CLIENT_SECRET,
      cookieKey: 'KEYCLOAK_JWT',
      logLevels: ['warn'],
      useNestLogger: true,
    }),
    AdminModule,
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
    },
  ],
})
export class AppModule {}
