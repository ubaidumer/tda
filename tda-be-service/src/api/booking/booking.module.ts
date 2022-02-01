import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { Booking } from './booking.entity';
import { BookingService } from './booking.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking,User])],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}
