import { Controller, Get, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Unprotected } from 'nest-keycloak-connect';
import { Helper } from 'src/config/helper';
import { CreateBicycleAttributeDetailValidationDecorator } from 'src/decorator/bicycleAttributeDetail/createBicycleAttributeDetailValidation.decorator';
import { GetAllBicycleAttributeDetailValidationDecorator } from 'src/decorator/bicycleAttributeDetail/getAllBicycleAttributeDetailValidation.decorator';
import { UpdateBicycleAttributeDetailActivateValidationDecorator } from 'src/decorator/bicycleAttributeDetail/updateBicycleAttributeDetailActivateValidation.decorator';
import { UpdateBicycleAttributeDetailValidationDecorator } from 'src/decorator/bicycleAttributeDetail/updateBicycleAttributeDetailValidation.decorator';
import { IDSBulkValidationDecorator } from 'src/decorator/comman/idsBulkValidation.decorator';
import { IDValidationDecorator } from 'src/decorator/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorator/comman/paginationValidation.decorator';
import { CreateBicycleAttributeDetailDto } from 'src/dto/bicycleAttributeDetail/createBicycleAttributeDetail.dto';
import { GetAllBicycleAttributeDetailDto } from 'src/dto/bicycleAttributeDetail/getAllBicycleAttributeDetail.dto';
import { UpdateBicycleAttributeDetailDto } from 'src/dto/bicycleAttributeDetail/updateBicycleAttributeDetail.dto';
import { UpdateBicycleAttributeDetailActivateDto } from 'src/dto/bicycleAttributeDetail/updateBicycleAttributeDetailActivate.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { BicycleAttributeDetailService } from './bicycle-attribute-detail.service';

@Controller('bicycle-attribute-detail')
export class BicycleAttributeDetailController {
    constructor(private readonly bicycleAttributeDetailService: BicycleAttributeDetailService) {}
    @Post()
    @Unprotected()
    @UseInterceptors(FileInterceptor('file',{
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename:  Helper.customFileName
      }),
    }))
    async postBicycleAttributeDetail(
    @CreateBicycleAttributeDetailValidationDecorator() body: CreateBicycleAttributeDetailDto,
    @UploadedFile() file:Express.Multer.File) {
        return  await this.bicycleAttributeDetailService.createBicycleAttributeDetail(body,file);
    }
    @Put('/:id')
    @Unprotected()
    @UseInterceptors(FileInterceptor('file',{
        storage: diskStorage({
          destination: Helper.destinationPath,
          filename:  Helper.customFileName
        }),
      }))
    async putBicycleAttributeDetailById(@IDValidationDecorator() param: {id:number}, 
    @UpdateBicycleAttributeDetailValidationDecorator() body:UpdateBicycleAttributeDetailDto,
    @UploadedFile() file:Express.Multer.File) {
      return await this.bicycleAttributeDetailService.updatedBicycleAttributeDetail(param, body,file);
    }
    @Get()
    @Unprotected()
    async getBicycleAttributeDetailList(@PaginationValidationDecorator() query: PaginationDto,@GetAllBicycleAttributeDetailValidationDecorator() body:GetAllBicycleAttributeDetailDto) {
      return await this.bicycleAttributeDetailService.findBicycleAttributeDetailList(query,body);
    }
    @Get('Active')
    @Unprotected()
    async getActiveBicycleAttributeDetailList(@PaginationValidationDecorator() query: PaginationDto,@GetAllBicycleAttributeDetailValidationDecorator() body:GetAllBicycleAttributeDetailDto) {
      body.is_activated=1;
      return await this.bicycleAttributeDetailService.findBicycleAttributeDetailList(query,body);
    }
    @Get('/:id')
    @Unprotected()
    async getBicycleAttributeDetailById(@IDValidationDecorator() param: {id:number}) {
      return await this.bicycleAttributeDetailService.findBicycleAttributeDetailById(param);
    }
    @Patch('Activate/:id')
    @Unprotected()
    async patchBicycleAttributeDetailActivateById(@IDValidationDecorator() param: {id:number}, @UpdateBicycleAttributeDetailActivateValidationDecorator() body:UpdateBicycleAttributeDetailActivateDto) {
      return await this.bicycleAttributeDetailService.updatedBicycleAttributeDetailActivate(param, body);
    }
    @Patch('BulkActivate')
    @Unprotected()
    async patchBicycleAttributeDetailBulkActivateById(@IDSBulkValidationDecorator() body1: {ids:number[]}, @UpdateBicycleAttributeDetailActivateValidationDecorator() body2:UpdateBicycleAttributeDetailActivateDto) {
      return await this.bicycleAttributeDetailService.updatedBulkBicycleAttributeDetailActivate(body1, body2);
    }
}
