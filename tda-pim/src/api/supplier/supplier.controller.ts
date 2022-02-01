import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { RoleMatchingMode, Roles, Unprotected } from 'nest-keycloak-connect';
import { IDSBulkValidationDecorator } from 'src/decorators/comman/idsBulkValidation.decorator copy';
import { IDValidationDecorator } from 'src/decorators/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorators/comman/paginationValidation.decorator';
import { ToggleStatusValidationDecorator } from 'src/decorators/comman/toggleStatusValidation.decorator';
import { CreateSupplierValidationDecorator } from 'src/decorators/supplier/createSupplierValidation.decorator';
import { GetAllSupplierValidationDecorator } from 'src/decorators/supplier/getAllSupplierValidation.decorator';
import { UpdateSupplierActivateValidationDecorator } from 'src/decorators/supplier/updateSupplierActivateValidation.decorator';
import { UpdateSupplierValidationDecorator } from 'src/decorators/supplier/updateSupplierValidation.decorator';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateSupplierDto } from 'src/dto/supplier/createSupplier.dto';
import { GetAllSupplierDto } from 'src/dto/supplier/getAllSupplier.dto';
import { UpdateSupplierDto } from 'src/dto/supplier/updateSupplier.dto';
import { UpdateSupplierActivateDto } from 'src/dto/supplier/updateSupplierActivate.dto';
import { SupplierService } from './supplier.service';

@Controller('supplier')
export class SupplierController {
    constructor(private readonly supplierService: SupplierService) {}
    @Get()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getSupplierList(@PaginationValidationDecorator() query: PaginationDto,
    @GetAllSupplierValidationDecorator() body:GetAllSupplierDto) {
      return await this.supplierService.findSupplierList(query,body);
    }
    @Get('Active')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getActiveSupplierList(@PaginationValidationDecorator() query: PaginationDto,
    @GetAllSupplierValidationDecorator() body:GetAllSupplierDto) {
      body.is_activated=1;
      return await this.supplierService.findSupplierList(query,body);
    }
    @Get('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getSupplierById(@IDValidationDecorator() param: {id:number}) {
      return await this.supplierService.findSupplierById(param);
    }
    @Post()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async postSupplier(@CreateSupplierValidationDecorator() body: CreateSupplierDto) {
      return await this.supplierService.createSupplier(body);
    }
    @Put('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putSupplierById(@IDValidationDecorator() param: {id:number}, @UpdateSupplierValidationDecorator() body:UpdateSupplierDto) {
      return await this.supplierService.updatedSupplier(param, body);
    }
    @Patch('Activate/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putSupplierStatusById(@IDValidationDecorator() param: {id:number},@UpdateSupplierActivateValidationDecorator() body:UpdateSupplierActivateDto) {
      return await this.supplierService.updateSupplierStatus(param,body);
    }
    @Patch('BulkActivate')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putSupplierBulkStatusByIds(@IDSBulkValidationDecorator() body1: {ids:number[]},@UpdateSupplierActivateValidationDecorator() body2:UpdateSupplierActivateDto) {
      return await this.supplierService.updateSupplierBulkStatus(body1,body2);
    }
}
