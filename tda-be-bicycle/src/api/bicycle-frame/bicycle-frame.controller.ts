import { Controller, Get, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { Unprotected } from 'nest-keycloak-connect';
import { CreateBicycleFrameValidationDecorator } from 'src/decorator/bicycleFrame/createBicycleFrameValidation.decorator';
import { GetAllBicycleFrameValidationDecorator } from 'src/decorator/bicycleFrame/getAllBicycleFrameValidation.decorator';
import { UpdateBicycleFrameActivateValidationDecorator } from 'src/decorator/bicycleFrame/updateBicycleFrameActivateValidation.decorator';
import { UpdateBicycleFrameValidationDecorator } from 'src/decorator/bicycleFrame/updateBicycleFrameValidation.decorator';
import { IDSBulkValidationDecorator } from 'src/decorator/comman/idsBulkValidation.decorator';
import { IDValidationDecorator } from 'src/decorator/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorator/comman/paginationValidation.decorator';
import { CreateBicycleFrameDto } from 'src/dto/bicycleFrame/createBicycleFrame.dto';
import { GetAllBicycleFrameDto } from 'src/dto/bicycleFrame/getAllBicycleFrame.dto';
import { UpdateBicycleFrameDto } from 'src/dto/bicycleFrame/updateBicycleFrame.dto';
import { UpdateBicycleFrameActivateDto } from 'src/dto/bicycleFrame/updateBicycleFrameActivate.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { BicycleFrameService } from './bicycle-frame.service';
import { Express } from 'express'
import { diskStorage } from 'multer';
import {v4 as uuidv4} from 'uuid';
import { Helper } from 'src/config/helper';

@Controller('bicycle-frame')
export class BicycleFrameController {
    constructor(private readonly bicycleFrameService: BicycleFrameService) {}
    @Post()
    @Unprotected()
    @UseInterceptors(FileInterceptor('file',{
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename:  Helper.customFileName
      }),
    }))
    async postBicycleFrame(
    @CreateBicycleFrameValidationDecorator() body: CreateBicycleFrameDto,
    @UploadedFile() file:Express.Multer.File) {
        return  await this.bicycleFrameService.createBicycleFrame(body,file);
    }
    @Get()
    @Unprotected()
    async getBicycleFrameList(@PaginationValidationDecorator() query: PaginationDto,@GetAllBicycleFrameValidationDecorator() body:GetAllBicycleFrameDto) {
      return await this.bicycleFrameService.findBicycleFrameList(query,body);
    }
    @Get('Active')
    @Unprotected()
    async getActiveBicycleFrameList(@PaginationValidationDecorator() query: PaginationDto,@GetAllBicycleFrameValidationDecorator() body:GetAllBicycleFrameDto) {
      body.is_activated=1;
      return await this.bicycleFrameService.findBicycleFrameList(query,body);
    }
    @Get('/:id')
    @Unprotected()
    async getBicycleFrameById(@IDValidationDecorator() param: {id:number}) {
      return await this.bicycleFrameService.findBicycleFrameById(param);
    }
    @Patch('Activate/:id')
    @Unprotected()
    async patchBicycleFrameActivateById(@IDValidationDecorator() param: {id:number}, @UpdateBicycleFrameActivateValidationDecorator() body:UpdateBicycleFrameActivateDto) {
      return await this.bicycleFrameService.updatedBicycleFrameActivate(param, body);
    }
    @Patch('BulkActivate')
    @Unprotected()
    async patchBicycleFrameBulkActivateById(@IDSBulkValidationDecorator() body1: {ids:number[]}, @UpdateBicycleFrameActivateValidationDecorator() body2:UpdateBicycleFrameActivateDto) {
      return await this.bicycleFrameService.updatedBulkBicycleFrameActivate(body1, body2);
    }
    @Put('/:id')
    @Unprotected()
    @UseInterceptors(FileInterceptor('file',{
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename:  Helper.customFileName
      }),
    }))
    async putBicycleFrameById(@IDValidationDecorator() param: {id:number},
     @UpdateBicycleFrameValidationDecorator() body:UpdateBicycleFrameDto,
     @UploadedFile() file:Express.Multer.File) {
      return await this.bicycleFrameService.updatedBicycleFrame(param, body,file);
    }
}
