import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { RoleMatchingMode, Roles, Unprotected } from 'nest-keycloak-connect';
import { IDSBulkValidationDecorator } from 'src/decorators/comman/idsBulkValidation.decorator copy';
import { IDValidationDecorator } from 'src/decorators/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorators/comman/paginationValidation.decorator';
import { ToggleStatusValidationDecorator } from 'src/decorators/comman/toggleStatusValidation.decorator';
import { CreateProductAttributesValidationDecorator } from 'src/decorators/product-attributes/createProductAttributesValidation.decorator';
import { UpdateProductAttributesValidationDecorator } from 'src/decorators/product-attributes/updateProductAttributesValidation.decorator';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateProductAttributesDto } from 'src/dto/product-attributes/createProductAttributes.dto';
import { UpdateProductAttributesDto } from 'src/dto/product-attributes/updateProductAttributes.dto';
import { ProductAttributesService } from './product-attributes.service';

@Controller('product-attributes')
export class ProductAttributesController {
    constructor(private readonly productAttributesService: ProductAttributesService) {}
    @Get()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getProductAttributesList(@PaginationValidationDecorator() query: PaginationDto) {
      return await this.productAttributesService.findProductAttributesList(query);
    }
    @Get('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getProductAttributesById(@IDValidationDecorator() param: {id:number}) {
      return await this.productAttributesService.findProductAttributesById(param);
    }
    @Post()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async postProductAttributes(@CreateProductAttributesValidationDecorator() body: CreateProductAttributesDto) {
      return await this.productAttributesService.createProductAttributes(body);
    }
    @Put('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putProductAttributesById(@IDValidationDecorator() param: {id:number}, @UpdateProductAttributesValidationDecorator() body:UpdateProductAttributesDto) {
      return await this.productAttributesService.updatedProductAttributes(param, body);
    }
    @Put('ToggleStatus/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putProductAttributesStatusById(@IDValidationDecorator() param: {id:number},@ToggleStatusValidationDecorator() body :{is_activated:number}) {
      return await this.productAttributesService.updateProductAttributesStatus(param,body);
    }
    @Put('BulkToggleStatus')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putProductAttributesBulkStatusByIds(@IDSBulkValidationDecorator() body1: {ids:number[]},@ToggleStatusValidationDecorator() body2 :{is_activated:number}) {
      return await this.productAttributesService.updateProductAttributesBulkStatus(body1,body2);
    }
}

