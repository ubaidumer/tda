import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateProductDto } from 'src/dto/product/createProduct.dto';
import { UpdateProductDto } from 'src/dto/product/updateProduct.dto';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
export declare class ProductService {
    private productRepo;
    constructor(productRepo: Repository<Product>);
    findProductList(query: PaginationDto): Promise<any>;
    findProductById(param: {
        id: number;
    }): Promise<any>;
    createProduct(body: CreateProductDto): Promise<"product created successfully" | "product creation unsuccessfull">;
    updatedProduct(param: {
        id: number;
    }, body: UpdateProductDto): Promise<"product updated successfully" | "product updation unsuccessfull">;
    updateProductStatus(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<"product status updated successfully" | "product status updation unsuccessfull">;
    updateProductBulkStatus(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<string>;
}
