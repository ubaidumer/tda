import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateStockDto } from 'src/dto/stock/createStock.dto';
import { UpdateStockDto } from 'src/dto/stock/updateStock.dto';
import { Repository } from 'typeorm';
import { Stock } from './stock.entity';
export declare class StockService {
    private stockRepo;
    constructor(stockRepo: Repository<Stock>);
    findStockList(query: PaginationDto): Promise<any>;
    findStockById(param: {
        id: number;
    }): Promise<any>;
    createStock(body: CreateStockDto): Promise<"stock created successfully" | "stock creation unsuccessfull">;
    updateStockStatus(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<"stock status updated successfully" | "stock status updation unsuccessfull">;
    updateStock(param: {
        id: number;
    }, body: UpdateStockDto): Promise<"stock updated successfully" | "stock updation unsuccessfull">;
    updateStockBulkStatus(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<string>;
}
