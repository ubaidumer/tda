import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './api/category/category.module';
import CONFIG from './config/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard
} from 'nest-keycloak-connect';
import { CatalogModule } from './api/catalog/catalog.module';
import { LocationModule } from './api/location/location.module';
import { TaxModule } from './api/tax/tax.module';
import { MeasurementModule } from './api/measurement/measurement.module';
import { SupplierModule } from './api/supplier/supplier.module';
import { KeycloakMiddleware } from './middlewares/keycloakMiddleware';
import { CatalogController } from './api/catalog/catalog.controller';
import { CategoryController } from './api/category/category.controller';
import { LocationController } from './api/location/location.controller';
import { MeasurementController } from './api/measurement/measurement.controller';
import { SupplierController } from './api/supplier/supplier.controller';
import { TaxController } from './api/tax/tax.controller';
import { StockModule } from './api/stock/stock.module';
import { ProductModule } from './api/product/product.module';
import { ProductAttributesModule } from './api/product-attributes/product-attributes.module';
import { ProductAttributesController } from './api/product-attributes/product-attributes.controller';
import { StockController } from './api/stock/stock.controller';
import { ProductController } from './api/product/product.controller';

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
    CategoryModule,
    CatalogModule,
    LocationModule,
    TaxModule,
    MeasurementModule,
    SupplierModule,
    StockModule,
    ProductModule,
    ProductAttributesModule
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
//export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(KeycloakMiddleware)
      .forRoutes(CatalogController,CategoryController,
        LocationController,MeasurementController,
        SupplierController,TaxController,
        ProductAttributesController,StockController,
        ProductController
        );
  }
}