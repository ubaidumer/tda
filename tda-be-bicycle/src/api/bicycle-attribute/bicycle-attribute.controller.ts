import { Controller, Get, Patch, Post, Put } from '@nestjs/common';
import { Unprotected } from 'nest-keycloak-connect';
import { CreateBicycleAttributeValidationDecorator } from 'src/decorator/bicycleAttribute/createBicycleAttributeValidation.decorator';
import { GetAllBicycleAttributeValidationDecorator } from 'src/decorator/bicycleAttribute/getAllBicycleAttributeValidation.decorator';
import { UpdateBicycleAttributeActivateValidationDecorator } from 'src/decorator/bicycleAttribute/updateBicycleAttributeActivateValidation.decorator';
import { UpdateBicycleAttributeValidationDecorator } from 'src/decorator/bicycleAttribute/updateBicycleAttributeValidation.decorator';
import { IDSBulkValidationDecorator } from 'src/decorator/comman/idsBulkValidation.decorator';
import { IDValidationDecorator } from 'src/decorator/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorator/comman/paginationValidation.decorator';
import { CreateBicycleAttributeDto } from 'src/dto/bicycleAttribute/createBicycleAttribute.dto';
import { GetAllBicycleAttributeDto } from 'src/dto/bicycleAttribute/getAllBicycleAttribute.dto';
import { UpdateBicycleAttributeDto } from 'src/dto/bicycleAttribute/updateBicycleAttribute.dto';
import { UpdateBicycleAttributeActivateDto } from 'src/dto/bicycleAttribute/updateBicycleAttributeActivate.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { BicycleAttributeService } from './bicycle-attribute.service';

@Controller('bicycle-attribute')
export class BicycleAttributeController {
    constructor(private readonly bicycleAttributeService: BicycleAttributeService) {}
    @Post()
    @Unprotected()
    async postBicycleAttribute(
    @CreateBicycleAttributeValidationDecorator() body: CreateBicycleAttributeDto) {
        return  await this.bicycleAttributeService.createBicycleAttribute(body);
    }
    @Get()
    @Unprotected()
    async getBicycleAttributeList(@PaginationValidationDecorator() query: PaginationDto,@GetAllBicycleAttributeValidationDecorator() body:GetAllBicycleAttributeDto) {
      return await this.bicycleAttributeService.findBicycleAttributeList(query,body);
    }
    @Get('Active')
    @Unprotected()
    async getActiveBicycleAttributeList(@PaginationValidationDecorator() query: PaginationDto,@GetAllBicycleAttributeValidationDecorator() body:GetAllBicycleAttributeDto) {
      body.is_activated=1;
      return await this.bicycleAttributeService.findBicycleAttributeList(query,body);
    }
    @Get('/:id')
    @Unprotected()
    async getBicycleAttributeById(@IDValidationDecorator() param: {id:number}) {
      return await this.bicycleAttributeService.findBicycleAttributeById(param);
    }
    @Patch('Activate/:id')
    @Unprotected()
    async patchBicycleAttributeActivateById(@IDValidationDecorator() param: {id:number}, @UpdateBicycleAttributeActivateValidationDecorator() body:UpdateBicycleAttributeActivateDto) {
      return await this.bicycleAttributeService.updatedBicycleAttributeActivate(param, body);
    }
    @Patch('BulkActivate')
    @Unprotected()
    async patchBicycleAttributeBulkActivateById(@IDSBulkValidationDecorator() body1: {ids:number[]}, @UpdateBicycleAttributeActivateValidationDecorator() body2:UpdateBicycleAttributeActivateDto) {
      return await this.bicycleAttributeService.updatedBulkBicycleAttributeActivate(body1, body2);
    }
    @Put('/:id')
    @Unprotected()
    async putBicycleAttributeById(@IDValidationDecorator() param: {id:number}, @UpdateBicycleAttributeValidationDecorator() body:UpdateBicycleAttributeDto) {
      return await this.bicycleAttributeService.updatedBicycleAttribute(param, body);
    }
}
