import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateProductAttributesDto } from 'src/dto/product-attributes/createProductAttributes.dto';
import { UpdateProductAttributesDto } from 'src/dto/product-attributes/updateProductAttributes.dto';
import { Repository } from 'typeorm';
import { Product_Attributes } from './product-attributes.entity';
export declare class ProductAttributesService {
    private productAttributesRepo;
    constructor(productAttributesRepo: Repository<Product_Attributes>);
    findProductAttributesList(query: PaginationDto): Promise<any>;
    findProductAttributesById(param: {
        id: number;
    }): Promise<any>;
    createProductAttributes(body: CreateProductAttributesDto): Promise<"product attributes created successfully" | "product attributes creation unsuccessfull">;
    updatedProductAttributes(param: {
        id: number;
    }, body: UpdateProductAttributesDto): Promise<"product attributes updated successfully" | "product attributes updation unsuccessfull">;
    updateProductAttributesStatus(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<"product attributes status updated successfully" | "product attributes status updation unsuccessfull">;
    updateProductAttributesBulkStatus(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<string>;
}
