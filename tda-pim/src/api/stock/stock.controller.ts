import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { RoleMatchingMode, Roles, Unprotected } from 'nest-keycloak-connect';
import { IDSBulkValidationDecorator } from 'src/decorators/comman/idsBulkValidation.decorator copy';
import { IDValidationDecorator } from 'src/decorators/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorators/comman/paginationValidation.decorator';
import { ToggleStatusValidationDecorator } from 'src/decorators/comman/toggleStatusValidation.decorator';
import { CreateStockValidationDecorator } from 'src/decorators/stock/createStockValidation.decorator';
import { UpdateStockValidationDecorator } from 'src/decorators/stock/updateStockValidation.decorator';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateStockDto } from 'src/dto/stock/createStock.dto';
import { UpdateStockDto } from 'src/dto/stock/updateStock.dto';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
    constructor(private readonly stockService: StockService) {}
    @Get()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getStockList(@PaginationValidationDecorator() query: PaginationDto) {
      return await this.stockService.findStockList(query);
    }
    @Get('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getStockById(@IDValidationDecorator() param: {id:number}) {
      return await this.stockService.findStockById(param);
    }
    @Post()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async postStock(@CreateStockValidationDecorator() body: CreateStockDto) {
      return await this.stockService.createStock(body);
    }
    @Put('ToggleStatus/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putStockStatusById(@IDValidationDecorator() param: {id:number},@ToggleStatusValidationDecorator() body :{is_activated:number}) {
      return await this.stockService.updateStockStatus(param,body);
    }
    @Put('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putStockById(@IDValidationDecorator() param: {id:number}, @UpdateStockValidationDecorator() body:UpdateStockDto) {
      return await this.stockService.updateStock(param, body);
    }
    @Put('BulkToggleStatus')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putStockBulkStatusByIds(@IDSBulkValidationDecorator() body1: {ids:number[]},@ToggleStatusValidationDecorator() body2 :{is_activated:number}) {
      return await this.stockService.updateStockBulkStatus(body1,body2);
    }
}
