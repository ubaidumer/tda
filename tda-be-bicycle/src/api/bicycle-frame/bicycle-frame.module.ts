import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BicycleFrameController } from './bicycle-frame.controller';
import { BicycleFrame } from './bicycle-frame.entity';
import { BicycleFrameService } from './bicycle-frame.service';

@Module({
  imports: [TypeOrmModule.forFeature([BicycleFrame])],
  controllers: [BicycleFrameController],
  providers: [BicycleFrameService]
})
export class BicycleFrameModule {}
