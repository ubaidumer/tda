import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateStockDto } from 'src/dto/stock/createStock.dto';
import { UpdateStockDto } from 'src/dto/stock/updateStock.dto';
import { StockService } from './stock.service';
export declare class StockController {
    private readonly stockService;
    constructor(stockService: StockService);
    getStockList(query: PaginationDto): Promise<any>;
    getStockById(param: {
        id: number;
    }): Promise<any>;
    postStock(body: CreateStockDto): Promise<"stock created successfully" | "stock creation unsuccessfull">;
    putStockStatusById(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<"stock status updated successfully" | "stock status updation unsuccessfull">;
    putStockById(param: {
        id: number;
    }, body: UpdateStockDto): Promise<"stock updated successfully" | "stock updation unsuccessfull">;
    putStockBulkStatusByIds(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<string>;
}
