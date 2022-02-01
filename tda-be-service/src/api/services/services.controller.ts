import { Controller, Get, Patch, Post, Put } from '@nestjs/common';
import { RoleMatchingMode, Roles, Unprotected } from 'nest-keycloak-connect';
import { IDSBulkValidationDecorator } from 'src/decorators/comman/idsBulkValidation.decorator';
import { IDValidationDecorator } from 'src/decorators/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorators/comman/paginationValidation.decorator';
import { CreateServicesValidationDecorator } from 'src/decorators/services/createServicesValidation.decorator';
import { GetAllServicesValidationDecorator } from 'src/decorators/services/getAllServicesValidation.decorator';
import { UpdateServicesActivateValidationDecorator } from 'src/decorators/services/updateServicesActivateValidation.decorator';
import { UpdateServicesValidationDecorator } from 'src/decorators/services/updateServicesValidation.decorator copy';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateServicesDto } from 'src/dto/services/createServices.dto';
import { GetAllServicesDto } from 'src/dto/services/getAllServices.dto';
import { UpdateServicesDto } from 'src/dto/services/updateServices.dto';
import { UpdateServicesActivateDto } from 'src/dto/services/updateServicesActivate.dto';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}
    @Post()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async postServices(@CreateServicesValidationDecorator() body: CreateServicesDto) {
      return await this.servicesService.createServices(body);
    }  
    @Get()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getServicesList(@PaginationValidationDecorator() query: PaginationDto,@GetAllServicesValidationDecorator() body:GetAllServicesDto) {
      return await this.servicesService.findServicesList(query,body);
    }
    @Get('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getServicesById(@IDValidationDecorator() param: {id:number}) {
      return await this.servicesService.findServicesById(param);
    }
    @Patch('Activate/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async patchServicesActivateById(@IDValidationDecorator() param: {id:number}, @UpdateServicesActivateValidationDecorator() body:UpdateServicesActivateDto) {
      return await this.servicesService.updatedServicesActivate(param, body);
    }
    @Patch('BulkActivate')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async patchServicesBulkActivateById(@IDSBulkValidationDecorator() body1: {ids:number[]}, @UpdateServicesActivateValidationDecorator() body2:UpdateServicesActivateDto) {
      return await this.servicesService.updatedBulkServicesActivate(body1, body2);
    }
    @Put('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putServicesById(@IDValidationDecorator() param: {id:number}, @UpdateServicesValidationDecorator() body:UpdateServicesDto) {
      return await this.servicesService.updatedServices(param, body);
    }
}
