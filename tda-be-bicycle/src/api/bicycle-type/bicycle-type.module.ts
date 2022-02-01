import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BicycleTypeController } from './bicycle-type.controller';
import { BicycleType } from './bicycle-type.entity';
import { BicycleTypeService } from './bicycle-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([BicycleType])],
  controllers: [BicycleTypeController],
  providers: [BicycleTypeService]
})
export class BicycleTypeModule {}
