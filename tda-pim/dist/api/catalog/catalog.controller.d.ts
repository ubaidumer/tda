import { UpdateCatalogDto } from 'src/dto/catalog/updateCatalog.dto';
import { CreateCatalogDto } from 'src/dto/catalog/createCatalog.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CatalogService } from './catalog.service';
export declare class CatalogController {
    private readonly catalogService;
    constructor(catalogService: CatalogService);
    getCatalogList(query: PaginationDto): Promise<any>;
    getCatalogById(param: {
        id: number;
    }): Promise<any>;
    postCatalog(body: CreateCatalogDto): Promise<"catalog created successfully" | "catalog creation unsuccessfull">;
    putCatalogStatusById(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<"catalog status updated successfully" | "catalog status updation unsuccessfull">;
    putCatalogById(param: {
        id: number;
    }, body: UpdateCatalogDto): Promise<"catalog updated successfully" | "catalog updation unsuccessfull">;
    putCatalogBulkStatusByIds(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<string>;
}
