import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BicycleAttributeController } from './bicycle-attribute.controller';
import { BicycleAttribute } from './bicycle-attribute.entity';
import { BicycleAttributeService } from './bicycle-attribute.service';

@Module({
  imports: [TypeOrmModule.forFeature([BicycleAttribute])],
  controllers: [BicycleAttributeController],
  providers: [BicycleAttributeService]
})
export class BicycleAttributeModule {}
