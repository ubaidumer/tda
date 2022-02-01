import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Roles, RoleMatchingMode, Unprotected } from 'nest-keycloak-connect';
import { IDSBulkValidationDecorator } from 'src/decorators/comman/idsBulkValidation.decorator copy';
import { IDValidationDecorator } from 'src/decorators/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorators/comman/paginationValidation.decorator';
import { ToggleStatusValidationDecorator } from 'src/decorators/comman/toggleStatusValidation.decorator';
import { CreateProductValidationDecorator } from 'src/decorators/product/createProductValidation.decorator';
import { UpdateProductValidationDecorator } from 'src/decorators/product/updateProductValidation.decorator';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateProductDto } from 'src/dto/product/createProduct.dto';
import { UpdateProductDto } from 'src/dto/product/updateProduct.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
    @Get()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getProductList(@PaginationValidationDecorator() query: PaginationDto) {
      return await this.productService.findProductList(query);
    }
    @Get('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getProductById(@IDValidationDecorator() param: {id:number}) {
      return await this.productService.findProductById(param);
    }
    @Post()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async postProduct(@CreateProductValidationDecorator() body: CreateProductDto) {
      return await this.productService.createProduct(body);
    }
    @Put('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putProductById(@IDValidationDecorator() param: {id:number}, @UpdateProductValidationDecorator() body:UpdateProductDto) {
      return await this.productService.updatedProduct(param, body);
    }
    @Put('ToggleStatus/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putProductStatusById(@IDValidationDecorator() param: {id:number},@ToggleStatusValidationDecorator() body :{is_activated:number}) {
      return await this.productService.updateProductStatus(param,body);
    }
    @Put('BulkToggleStatus')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putProductBulkStatusByIds(@IDSBulkValidationDecorator() body1: {ids:number[]},@ToggleStatusValidationDecorator() body2 :{is_activated:number}) {
      return await this.productService.updateProductBulkStatus(body1,body2);
    }
}
