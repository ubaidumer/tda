import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateProductDto } from 'src/dto/product/createProduct.dto';
import { UpdateProductDto } from 'src/dto/product/updateProduct.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProductList(query: PaginationDto): Promise<any>;
    getProductById(param: {
        id: number;
    }): Promise<any>;
    postProduct(body: CreateProductDto): Promise<"product created successfully" | "product creation unsuccessfull">;
    putProductById(param: {
        id: number;
    }, body: UpdateProductDto): Promise<"product updated successfully" | "product updation unsuccessfull">;
    putProductStatusById(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<"product status updated successfully" | "product status updation unsuccessfull">;
    putProductBulkStatusByIds(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<string>;
}
