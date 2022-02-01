import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Roles, RoleMatchingMode } from 'nest-keycloak-connect';
import { CreateCatalogValidationDecorator } from 'src/decorators/catalog/createCatalogValidation.decorator';
import { UpdateCatalogValidationDecorator } from 'src/decorators/catalog/updateCatalogValidation.decorator';
import { IDValidationDecorator } from 'src/decorators/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorators/comman/paginationValidation.decorator';
import { UpdateCatalogDto } from 'src/dto/catalog/updateCatalog.dto';
import { CreateCatalogDto } from 'src/dto/catalog/createCatalog.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CatalogService } from './catalog.service';
import { ToggleStatusValidationDecorator } from 'src/decorators/comman/toggleStatusValidation.decorator';
import { IDSBulkValidationDecorator } from 'src/decorators/comman/idsBulkValidation.decorator copy';

@Controller('catalog')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}
    @Get()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getCatalogList(@PaginationValidationDecorator() query: PaginationDto) {
      return await this.catalogService.findCatalogList(query);
    }
    @Get('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getCatalogById(@IDValidationDecorator() param: {id:number}) {
      return await this.catalogService.findCatalogById(param);
    }
    @Post()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async postCatalog(@CreateCatalogValidationDecorator() body: CreateCatalogDto) {
      return await this.catalogService.createCatalog(body);
    }
    @Put('ToggleStatus/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putCatalogStatusById(@IDValidationDecorator() param: {id:number},@ToggleStatusValidationDecorator() body :{is_activated:number}) {
      return await this.catalogService.updateCatalogStatus(param,body);
    }
    @Put('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putCatalogById(@IDValidationDecorator() param: {id:number}, @UpdateCatalogValidationDecorator() body:UpdateCatalogDto) {
      return await this.catalogService.updatedCatalog(param, body);
    }
    @Put('BulkToggleStatus')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putCatalogBulkStatusByIds(@IDSBulkValidationDecorator() body1: {ids:number[]},@ToggleStatusValidationDecorator() body2 :{is_activated:number}) {
      return await this.catalogService.updateCatalogBulkStatus(body1,body2);
    }
}
