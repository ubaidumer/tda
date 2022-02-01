import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BicycleAttributeDetailController } from './bicycle-attribute-detail.controller';
import { BicycleAttributeDetail } from './bicycle-attribute-detail.entity';
import { BicycleAttributeDetailService } from './bicycle-attribute-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([BicycleAttributeDetail])],
  controllers: [BicycleAttributeDetailController],
  providers: [BicycleAttributeDetailService]
})
export class BicycleAttributeDetailModule {}
