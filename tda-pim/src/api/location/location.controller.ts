import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { RoleMatchingMode, Roles, Unprotected } from 'nest-keycloak-connect';
import { IDSBulkValidationDecorator } from 'src/decorators/comman/idsBulkValidation.decorator copy';
import { IDValidationDecorator } from 'src/decorators/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorators/comman/paginationValidation.decorator';
import { ToggleStatusValidationDecorator } from 'src/decorators/comman/toggleStatusValidation.decorator';
import { CreateLocationValidationDecorator } from 'src/decorators/location/createLocationValidation.decorator';
import { UpdateLocationValidationDecorator } from 'src/decorators/location/updateLocationValidation.decorator';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateLocationDto } from 'src/dto/location/createLocation.dto';
import { UpdateLocationDto } from 'src/dto/location/updateLocation.dto';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}
    @Get()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getLocationList(@PaginationValidationDecorator() query: PaginationDto) {
      return await this.locationService.findLocationList(query);
    }
    @Get('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getLocationById(@IDValidationDecorator() param: {id:number}) {
      return await this.locationService.findLocationById(param);
    }
    @Post()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async postLocation(@CreateLocationValidationDecorator() body: CreateLocationDto) {
      return await this.locationService.createLocation(body);
    }
    @Put('ToggleStatus/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putLocationStatusById(@IDValidationDecorator() param: {id:number},@ToggleStatusValidationDecorator() body :{is_activated:number}) {
      return await this.locationService.updateLocationStatus(param,body);
    }
    @Put('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putLocationById(@IDValidationDecorator() param: {id:number}, @UpdateLocationValidationDecorator() body:UpdateLocationDto) {
      return await this.locationService.updatedLocation(param, body);
    }
    @Put('BulkToggleStatus')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putLocationBulkStatusByIds(@IDSBulkValidationDecorator() body1: {ids:number[]},@ToggleStatusValidationDecorator() body2 :{is_activated:number}) {
      return await this.locationService.updateLocationBulkStatus(body1,body2);
    }
}
