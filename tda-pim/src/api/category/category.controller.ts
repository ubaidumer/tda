import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Roles, RoleMatchingMode } from 'nest-keycloak-connect';
import { CreateCategoryValidationDecorator } from 'src/decorators/category/createCategoryValidation.decorator';
import { UpdateCategoryValidationDecorator } from 'src/decorators/category/updateCategoryValidation.decorator';
import { IDSBulkValidationDecorator } from 'src/decorators/comman/idsBulkValidation.decorator copy';
import { IDValidationDecorator } from 'src/decorators/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorators/comman/paginationValidation.decorator';
import { ToggleStatusValidationDecorator } from 'src/decorators/comman/toggleStatusValidation.decorator';
import { CreateCategoryDto } from 'src/dto/category/createCategory.dto';
import { UpdateCategoryDto } from 'src/dto/category/updateCategory.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
    @Get()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getCategoryList(@PaginationValidationDecorator() query: PaginationDto) {
      return await this.categoryService.findCategoryList(query);
    }
    @Get('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getCategoryById(@IDValidationDecorator() param: {id:number}) {
      return await this.categoryService.findCategoryById(param);
    }
    @Post()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async postCategory(@CreateCategoryValidationDecorator() body: CreateCategoryDto) {
      return await this.categoryService.createCategory(body);
    }
    @Put('ToggleStatus/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putCategoryStatusById(@IDValidationDecorator() param: {id:number},@ToggleStatusValidationDecorator() body :{is_activated:number}) {
      return await this.categoryService.updateCategoryStatus(param,body);
    }
    @Put('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putCategoryById(@IDValidationDecorator() param: {id:number}, @UpdateCategoryValidationDecorator() body:UpdateCategoryDto) {
      return await this.categoryService.updatedCategory(param, body);
    }
    @Put('BulkToggleStatus')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putCategoryBulkStatusByIds(@IDSBulkValidationDecorator() body1: {ids:number[]},@ToggleStatusValidationDecorator() body2 :{is_activated:number}) {
      return await this.categoryService.updateCategoryBulkStatus(body1,body2);
    }
}

