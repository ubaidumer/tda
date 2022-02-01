import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { Roles, RoleMatchingMode, Unprotected } from 'nest-keycloak-connect';
import { IDSBulkValidationDecorator } from 'src/decorators/comman/idsBulkValidation.decorator copy';
import { IDValidationDecorator } from 'src/decorators/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorators/comman/paginationValidation.decorator';
import { ToggleStatusValidationDecorator } from 'src/decorators/comman/toggleStatusValidation.decorator';
import { CreateTaxValidationDecorator } from 'src/decorators/tax/createTaxValidation.decorator';
import { GetAllTaxValidationDecorator } from 'src/decorators/tax/getAllTaxValidation.decorator';
import { UpdateTaxActivateValidationDecorator } from 'src/decorators/tax/updateTaxActivateValidation.decorator';
import { UpdateTaxValidationDecorator } from 'src/decorators/tax/updateTaxValidation.decorator';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateTaxDto } from 'src/dto/tax/createTax.dto';
import { GetAllTaxDto } from 'src/dto/tax/getAllTax.dto';
import { UpdateTaxDto } from 'src/dto/tax/updateTax.dto';
import { UpdateTaxActivateDto } from 'src/dto/tax/updateTaxActivate.dto';
import { TaxService } from './tax.service';

@Controller('tax')
export class TaxController {
    constructor(private readonly taxService: TaxService) {}
    @Get()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getTaxList(@PaginationValidationDecorator() query: PaginationDto,
    @GetAllTaxValidationDecorator() body:GetAllTaxDto) {
      return await this.taxService.findTaxList(query,body);
    }
    @Get('Active')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getActiveTaxList(@PaginationValidationDecorator() query: PaginationDto,
    @GetAllTaxValidationDecorator() body:GetAllTaxDto) {
      body.is_activated=1;
      return await this.taxService.findTaxList(query,body);
    }
    @Get('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getTaxById(@IDValidationDecorator() param: {id:number}) {
      return await this.taxService.findTaxById(param);
    }
    @Post()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async postTax(@CreateTaxValidationDecorator() body: CreateTaxDto) {
      return await this.taxService.createTax(body);
    }
    @Put('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putTaxById(@IDValidationDecorator() param: {id:number}, @UpdateTaxValidationDecorator() body:UpdateTaxDto) {
      return await this.taxService.updatedTax(param, body);
    }
    @Patch('Activate/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putTaxStatusById(@IDValidationDecorator() param: {id:number},@UpdateTaxActivateValidationDecorator() body:UpdateTaxActivateDto) {
      return await this.taxService.updateTaxStatus(param,body);
    }
    @Patch('BulkActivate')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putTaxBulkStatusByIds(@IDSBulkValidationDecorator() body1: {ids:number[]},@UpdateTaxActivateValidationDecorator() body2:UpdateTaxActivateDto) {
      return await this.taxService.updateTaxBulkStatus(body1,body2);
    }
}
