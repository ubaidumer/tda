import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttributesController } from './product-attributes.controller';
import { Product_Attributes } from './product-attributes.entity';
import { ProductAttributesService } from './product-attributes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product_Attributes])],
  controllers: [ProductAttributesController],
  providers: [ProductAttributesService]
})
export class ProductAttributesModule {}
