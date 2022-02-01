import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateProductAttributesDto } from 'src/dto/product-attributes/createProductAttributes.dto';
import { UpdateProductAttributesDto } from 'src/dto/product-attributes/updateProductAttributes.dto';
import { ProductAttributesService } from './product-attributes.service';
export declare class ProductAttributesController {
    private readonly productAttributesService;
    constructor(productAttributesService: ProductAttributesService);
    getProductAttributesList(query: PaginationDto): Promise<any>;
    getProductAttributesById(param: {
        id: number;
    }): Promise<any>;
    postProductAttributes(body: CreateProductAttributesDto): Promise<"product attributes created successfully" | "product attributes creation unsuccessfull">;
    putProductAttributesById(param: {
        id: number;
    }, body: UpdateProductAttributesDto): Promise<"product attributes updated successfully" | "product attributes updation unsuccessfull">;
    putProductAttributesStatusById(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<"product attributes status updated successfully" | "product attributes status updation unsuccessfull">;
    putProductAttributesBulkStatusByIds(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<string>;
}
