import { UpdateCatalogDto } from 'src/dto/catalog/updateCatalog.dto';
import { CreateCatalogDto } from 'src/dto/catalog/createCatalog.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { Repository } from 'typeorm';
import { Catalog } from './catalog.entity';
export declare class CatalogService {
    private catalogRepo;
    constructor(catalogRepo: Repository<Catalog>);
    findCatalogList(query: PaginationDto): Promise<any>;
    findCatalogById(param: {
        id: number;
    }): Promise<any>;
    createCatalog(body: CreateCatalogDto): Promise<"catalog created successfully" | "catalog creation unsuccessfull">;
    updateCatalogStatus(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<"catalog status updated successfully" | "catalog status updation unsuccessfull">;
    updatedCatalog(param: {
        id: number;
    }, body: UpdateCatalogDto): Promise<"catalog updated successfully" | "catalog updation unsuccessfull">;
    updateCatalogBulkStatus(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<string>;
}
