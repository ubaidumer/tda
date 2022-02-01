import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgtypeController } from './orgtype.controller';
import { Orgtype } from './orgtype.entity';
import { OrgtypeService } from './orgtype.service';

@Module({

  imports: [TypeOrmModule.forFeature([Orgtype])],
  controllers: [OrgtypeController],
  providers: [OrgtypeService]
})
export class OrgtypeModule {}
