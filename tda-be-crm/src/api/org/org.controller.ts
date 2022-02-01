import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { Roles, RoleMatchingMode } from 'nest-keycloak-connect';
import { IDSBulkValidationDecorator } from 'src/decorators/comman/idsBulkValidation.decorator copy';
import { IDValidationDecorator } from 'src/decorators/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorators/comman/paginationValidation.decorator';
import { ToggleStatusValidationDecorator } from 'src/decorators/comman/toggleStatusValidation.decorator';
import { CreateOrgValidationDecorator } from 'src/decorators/org/createOrgValidation.decorator';
import { GetAllOrgValidationDecorator } from 'src/decorators/org/getAllOrgValidation.decorator';
import { UpdateOrgActivateValidationDecorator } from 'src/decorators/org/updateOrgActivateValidation.decorator';
import { UpdateOrgValidationDecorator } from 'src/decorators/org/updateOrgValidation.decorator';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateOrgDto } from 'src/dto/org/createOrg.dto';
import { GetAllOrgDto } from 'src/dto/org/getAllOrgdto';
import { UpdateOrgDto } from 'src/dto/org/updateOrg.dto';
import { UpdateOrgActivateDto } from 'src/dto/org/updateOrgActivate.dto';
import { OrgService } from './org.service';

@Controller('org')
export class OrgController {
    constructor(private readonly orgService: OrgService) {}
    @Get()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getEmployeeList(@PaginationValidationDecorator() query: PaginationDto,
    @GetAllOrgValidationDecorator() body:GetAllOrgDto) {
      return await this.orgService.findOrgList(query,body);
    }
    @Get('Active')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getActiveOrgList(@PaginationValidationDecorator() query: PaginationDto,
    @GetAllOrgValidationDecorator() body:GetAllOrgDto) {
      body.is_activated=1;
      return await this.orgService.findOrgList(query,body);
    }
    @Get('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getOrgById(@IDValidationDecorator() param: {id:number}) {
      return await this.orgService.findOrgById(param);
    }
    @Post()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async postOrg(@CreateOrgValidationDecorator() body: CreateOrgDto) {
      return await this.orgService.createOrg(body);
    }
    @Patch('Activate/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putOrgStatusById(@IDValidationDecorator() param: {id:number},@UpdateOrgActivateValidationDecorator() body:UpdateOrgActivateDto) {
      return await this.orgService.updateOrgStatus(param,body);
    }
    @Put('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putOrgById(@IDValidationDecorator() param: {id:number}, @UpdateOrgValidationDecorator() body:UpdateOrgDto) {
      return await this.orgService.updatedOrg(param, body);
    }
    @Patch('BulkActivate')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putOrgBulkStatusByIds(@IDSBulkValidationDecorator() body1: {ids:number[]},@UpdateOrgActivateValidationDecorator() body2:UpdateOrgActivateDto) {
      return await this.orgService.updateOrgBulkStatus(body1,body2);
    }
}
