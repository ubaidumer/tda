import { HttpStatus } from '@nestjs/common';
import { CreateBookingDto } from 'src/dto/booking/createBooking.dto';
import { GetAllBookingDto } from 'src/dto/booking/getAllBooking.dto';
import { UpdateBookingActivateDto } from 'src/dto/booking/updateBookingActivate.dto';
import { UpdateBookingStatusDto } from 'src/dto/booking/updateBookingStatus.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
export declare class BookingService {
    private bookingRepo;
    constructor(bookingRepo: Repository<Booking>);
    createBooking(body: CreateBookingDto): Promise<never>;
    findBookingList(query: PaginationDto, body: GetAllBookingDto): Promise<{
        data: Booking[];
        total: number;
    }>;
    findBookingById(param: {
        id: number;
    }): Promise<{
        data: Booking;
    }>;
    updatedBookingStatus(param: {
        id: number;
    }, body: UpdateBookingStatusDto): Promise<{
        data: Booking;
    }>;
    updatedBulkBookingStatus(body1: {
        ids: number[];
    }, body2: UpdateBookingStatusDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    updatedBookingActivate(param: {
        id: number;
    }, body: UpdateBookingActivateDto): Promise<{
        data: Booking;
    }>;
    updatedBulkBookingActivate(body1: {
        ids: number[];
    }, body2: UpdateBookingActivateDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
