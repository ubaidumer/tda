import { Controller, Get, Patch, Post, Put } from '@nestjs/common';
import { RoleMatchingMode, Roles, Unprotected } from 'nest-keycloak-connect';
import { CreateBookingValidationDecorator } from 'src/decorators/booking/createBookingValidation.decorator';
import { GetAllBookingValidationDecorator } from 'src/decorators/booking/getAllBookingValidation.decorator';
import { UpdateBookingActivateValidationDecorator } from 'src/decorators/booking/updateBookingActivateValidation.decorator';
import { UpdateBookingStatusValidationDecorator } from 'src/decorators/booking/updateBookingStatusValidation.decorator';
import { IDSBulkValidationDecorator } from 'src/decorators/comman/idsBulkValidation.decorator';
import { IDValidationDecorator } from 'src/decorators/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorators/comman/paginationValidation.decorator';
import { CreateBookingDto } from 'src/dto/booking/createBooking.dto';
import { GetAllBookingDto } from 'src/dto/booking/getAllBooking.dto';
import { UpdateBookingActivateDto } from 'src/dto/booking/updateBookingActivate.dto';
import { UpdateBookingStatusDto } from 'src/dto/booking/updateBookingStatus.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}
    @Post()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async postBooking(@CreateBookingValidationDecorator() body: CreateBookingDto) {
      return await this.bookingService.createBooking(body);
    }  
    @Get()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getBookingList(@PaginationValidationDecorator() query: PaginationDto,@GetAllBookingValidationDecorator() body:GetAllBookingDto) {
      return await this.bookingService.findBookingList(query,body);
    }
    @Get('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getBookingById(@IDValidationDecorator() param: {id:number}) {
      return await this.bookingService.findBookingById(param);
    }
    @Patch('UpdateStatus/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async patchBookingStatusById(@IDValidationDecorator() param: {id:number}, @UpdateBookingStatusValidationDecorator() body:UpdateBookingStatusDto) {
      return await this.bookingService.updatedBookingStatus(param, body);
    }
    @Patch('BulkUpdateStatus')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async patchBulkBookingStatusByIds(@IDSBulkValidationDecorator() body1: {ids:number[]}, @UpdateBookingStatusValidationDecorator() body2:UpdateBookingStatusDto) {
      return await this.bookingService.updatedBulkBookingStatus(body1, body2);
    }
    @Patch('Activate/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async patchBookingActivateById(@IDValidationDecorator() param: {id:number}, @UpdateBookingActivateValidationDecorator() body:UpdateBookingActivateDto) {
      return await this.bookingService.updatedBookingActivate(param, body);
    }
    @Patch('BulkActivate')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async patchBookingBulkActivateById(@IDSBulkValidationDecorator() body1: {ids:number[]}, @UpdateBookingActivateValidationDecorator() body2:UpdateBookingActivateDto) {
      return await this.bookingService.updatedBulkBookingActivate(body1, body2);
    }
}
