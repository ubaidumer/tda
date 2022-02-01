import { CreateBookingDto } from 'src/dto/booking/createBooking.dto';
import { GetAllBookingDto } from 'src/dto/booking/getAllBooking.dto';
import { UpdateBookingActivateDto } from 'src/dto/booking/updateBookingActivate.dto';
import { UpdateBookingStatusDto } from 'src/dto/booking/updateBookingStatus.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { BookingService } from './booking.service';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    postBooking(body: CreateBookingDto): Promise<never>;
    getBookingList(query: PaginationDto, body: GetAllBookingDto): Promise<{
        data: import("./booking.entity").Booking[];
        total: number;
    }>;
    getBookingById(param: {
        id: number;
    }): Promise<{
        data: import("./booking.entity").Booking;
    }>;
    patchBookingStatusById(param: {
        id: number;
    }, body: UpdateBookingStatusDto): Promise<{
        data: import("./booking.entity").Booking;
    }>;
    patchBulkBookingStatusByIds(body1: {
        ids: number[];
    }, body2: UpdateBookingStatusDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    patchBookingActivateById(param: {
        id: number;
    }, body: UpdateBookingActivateDto): Promise<{
        data: import("./booking.entity").Booking;
    }>;
    patchBookingBulkActivateById(body1: {
        ids: number[];
    }, body2: UpdateBookingActivateDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
