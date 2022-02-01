import {
    Controller,
    Delete,
    Get,
    Post,
    Put,
  } from '@nestjs/common';
import { IDValidationDecorator } from 'src/decorators/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorators/comman/paginationValidation.decorator';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateOrgtypeDto } from 'src/dto/orgtype/createOrgtype.dto';
import { UpdateOrgtypeDto } from 'src/dto/orgtype/updateOrgtype.dto';
import { UpdateOrgtypeValidationDecorator } from '../../decorators/orgtype/updateOrgtypeValidation.decorator';
import { CreateOrgtypeValidationDecorator } from '../../decorators/orgtype/createOrgtypeValidation.decorator';
import { OrgtypeService } from './orgtype.service';
import { Roles, RoleMatchingMode } from 'nest-keycloak-connect';
import { IDSBulkValidationDecorator } from 'src/decorators/comman/idsBulkValidation.decorator copy';
import { GetAllOrgtypeValidationDecorator } from 'src/decorators/orgtype/getAllOrgtypeValidation.decorator';
import { GetAllOrgTypeDto } from 'src/dto/orgtype/getAllOrgtypedto';
import { UpdateTagActivateValidationDecorator } from 'src/decorators/tag/updateTagActivateValidation.decorator';
import { UpdateTagActivateDto } from 'src/dto/tag/updateTagActivate.dto';

@Controller('orgtype')
export class OrgtypeController {
    constructor(private readonly orgtypeService: OrgtypeService) {}
    @Get()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getOrgtypeList(@PaginationValidationDecorator() query: PaginationDto
    ,@GetAllOrgtypeValidationDecorator() body:GetAllOrgTypeDto) {
      return await this.orgtypeService.findOrgtypeList(query,body);
    }
    @Get('Active')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getActiveOrgtypeList(@PaginationValidationDecorator() query: PaginationDto,
    @GetAllOrgtypeValidationDecorator() body:GetAllOrgTypeDto) {
      body.is_activated=1;
      return await this.orgtypeService.findOrgtypeList(query,body);
    }
    @Get('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getOrgtypeById(@IDValidationDecorator() param: {id:number}) {
      return await this.orgtypeService.findOrgtypeById(param);
    }
    @Post()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async postOrgtype(@CreateOrgtypeValidationDecorator() body: CreateOrgtypeDto) {
      return await this.orgtypeService.createOrgtype(body);
    }
    @Put('Activate/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putOrgTypeStatusById(@IDValidationDecorator() param: {id:number},@UpdateTagActivateValidationDecorator() body:UpdateTagActivateDto) {
      return await this.orgtypeService.updateOrgTypeStatus(param,body);
    }
    @Put('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putOrgtypeById(@IDValidationDecorator() param: {id:number}, @UpdateOrgtypeValidationDecorator() body:UpdateOrgtypeDto) {
      return await this.orgtypeService.updatedOrgtype(param, body);
    }
    @Put('BulkActivate')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putOrgtypeBulkStatusByIds(@IDSBulkValidationDecorator() body1: {ids:number[]},@UpdateTagActivateValidationDecorator() body2:UpdateTagActivateDto) {
      return await this.orgtypeService.updateOrgtypeBulkStatus(body1,body2);
    }
}
