import { Controller, Get, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Unprotected } from 'nest-keycloak-connect';
import { Helper } from 'src/config/helper';
import { CreateBicycleTypeValidationDecorator } from 'src/decorator/bicycleType/createBicycleTypeValidation.decorator';
import { GetAllBicycleTypeValidationDecorator } from 'src/decorator/bicycleType/getAllBicycleTypeValidation.decorator';
import { UpdateBicycleTypeActivateValidationDecorator } from 'src/decorator/bicycleType/updateBicycleTypeActivateValidation.decorator';
import { UpdateBicycleTypeValidationDecorator } from 'src/decorator/bicycleType/updateBicycleTypeValidation.decorator';
import { IDSBulkValidationDecorator } from 'src/decorator/comman/idsBulkValidation.decorator';
import { IDValidationDecorator } from 'src/decorator/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorator/comman/paginationValidation.decorator';
import { CreateBicycleTypeDto } from 'src/dto/bicycleType/createBicycleType.dto';
import { GetAllBicycleTypeDto } from 'src/dto/bicycleType/getAllBicycleType.dto';
import { UpdateBicycleTypeDto } from 'src/dto/bicycleType/updateBicycleType.dto';
import { UpdateBicycleTypeActivateDto } from 'src/dto/bicycleType/updateBicycleTypeActivate.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { BicycleTypeService } from './bicycle-type.service';

@Controller('bicycle-type')
export class BicycleTypeController {
    constructor(private readonly bicycleTypeService: BicycleTypeService) {}
    @Post()
    @Unprotected()
    @UseInterceptors(FileInterceptor('file',{
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename:  Helper.customFileName
      }),
    }))
    async postBicycleType(
    @CreateBicycleTypeValidationDecorator() body: CreateBicycleTypeDto,
    @UploadedFile() file:Express.Multer.File) {
        return  await this.bicycleTypeService.createBicycleType(body,file);
    }
    @Get('Active')
    @Unprotected()
    async getActiveBicycleTypeList(@PaginationValidationDecorator() query: PaginationDto,@GetAllBicycleTypeValidationDecorator() body:GetAllBicycleTypeDto) {
      body.is_activated=1;
      return await this.bicycleTypeService.findBicycleTypeList(query,body);
    }
    @Put('/:id')
    @Unprotected()
    @UseInterceptors(FileInterceptor('file',{
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename:  Helper.customFileName
      }),
    }))
    async putBicycleTypeById(@IDValidationDecorator() param: {id:number},
     @UpdateBicycleTypeValidationDecorator() body:UpdateBicycleTypeDto,
     @UploadedFile() file:Express.Multer.File) {
      return await this.bicycleTypeService.updatedBicycleType(param, body,file);
    }
    @Get()
    @Unprotected()
    async getBicycleTypeList(@PaginationValidationDecorator() query: PaginationDto,@GetAllBicycleTypeValidationDecorator() body:GetAllBicycleTypeDto) {
      return await this.bicycleTypeService.findBicycleTypeList(query,body);
    }
    @Get('/:id')
    @Unprotected()
    async getBicycleTypeById(@IDValidationDecorator() param: {id:number}) {
      return await this.bicycleTypeService.findBicycleTypeById(param);
    }
    @Patch('Activate/:id')
    @Unprotected()
    async patchBicycleTypeActivateById(@IDValidationDecorator() param: {id:number}, @UpdateBicycleTypeActivateValidationDecorator() body:UpdateBicycleTypeActivateDto) {
      return await this.bicycleTypeService.updatedBicycleTypeActivate(param, body);
    }
    @Patch('BulkActivate')
    @Unprotected()
    async patchBicycleTypeBulkActivateById(@IDSBulkValidationDecorator() body1: {ids:number[]}, @UpdateBicycleTypeActivateValidationDecorator() body2:UpdateBicycleTypeActivateDto) {
      return await this.bicycleTypeService.updatedBulkBicycleTypeActivate(body1, body2);
    }
}
