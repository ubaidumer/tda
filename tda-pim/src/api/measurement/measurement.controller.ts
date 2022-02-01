import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { RoleMatchingMode, Roles, Unprotected } from 'nest-keycloak-connect';
import { IDSBulkValidationDecorator } from 'src/decorators/comman/idsBulkValidation.decorator copy';
import { IDValidationDecorator } from 'src/decorators/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorators/comman/paginationValidation.decorator';
import { ToggleStatusValidationDecorator } from 'src/decorators/comman/toggleStatusValidation.decorator';
import { CreateMeasurementValidationDecorator } from 'src/decorators/measurement/createMeasurementValidation.decorator';
import { GetAllMeasurementValidationDecorator } from 'src/decorators/measurement/getAllMeasurementValidation.decorator';
import { UpdateMeasurementActivateValidationDecorator } from 'src/decorators/measurement/updateMeasurementActivateValidation.decorator';
import { UpdateMeasurementValidationDecorator } from 'src/decorators/measurement/updateMeasurementValidation.decorator';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateMeasurementDto } from 'src/dto/measurement/createMeasurement.dto';
import { GetAllMeasurementDto } from 'src/dto/measurement/getAllMeasurement.dto';
import { UpdateMeasurementDto } from 'src/dto/measurement/updateMeasurement.dto';
import { UpdateMeasurementActivateDto } from 'src/dto/measurement/updateMeasurementActivate.dto';
import { MeasurementService } from './measurement.service';

@Controller('measurement')
export class MeasurementController {
    constructor(private readonly measurementService: MeasurementService) {}
    @Get()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getMeasurementList(@PaginationValidationDecorator() query: PaginationDto,
    @GetAllMeasurementValidationDecorator() body:GetAllMeasurementDto) {
      return await this.measurementService.findMeasurementList(query,body);
    }
    @Get('Active')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getActiveMeasurementList(@PaginationValidationDecorator() query: PaginationDto,
    @GetAllMeasurementValidationDecorator() body:GetAllMeasurementDto) {
      body.is_activated=1;
      return await this.measurementService.findMeasurementList(query,body);
    }
    @Get('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getMeasurementById(@IDValidationDecorator() param: {id:number}) {
      return await this.measurementService.findMeasurementById(param);
    }
    @Post()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async postMeasurement(@CreateMeasurementValidationDecorator() body: CreateMeasurementDto) {
      return await this.measurementService.createMeasurement(body);
    }
    @Put('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putMeasurementById(@IDValidationDecorator() param: {id:number}, @UpdateMeasurementValidationDecorator() body:UpdateMeasurementDto) {
      return await this.measurementService.updatedMeasurement(param, body);
    }
    @Patch('Activate/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putMeasurementStatusById(@IDValidationDecorator() param: {id:number},@UpdateMeasurementActivateValidationDecorator() body:UpdateMeasurementActivateDto) {
      return await this.measurementService.updateMeasurementStatus(param,body);
    }
    @Patch('BulkActivate')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putMeasurementBulkStatusByIds(@IDSBulkValidationDecorator() body1: {ids:number[]},@UpdateMeasurementActivateValidationDecorator() body2:UpdateMeasurementActivateDto) {
      return await this.measurementService.updateMeasurementBulkStatus(body1,body2);
    }
}
