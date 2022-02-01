import { CreateCategoryDto } from 'src/dto/category/createCategory.dto';
import { UpdateCategoryDto } from 'src/dto/category/updateCategory.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
export declare class CategoryService {
    private categoryRepo;
    constructor(categoryRepo: Repository<Category>);
    findCategoryList(query: PaginationDto): Promise<any>;
    findCategoryById(param: {
        id: number;
    }): Promise<any>;
    createCategory(body: CreateCategoryDto): Promise<"category created successfully" | "category creation unsuccessfull">;
    updateCategoryStatus(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<"category status updated successfully" | "category status updation unsuccessfull">;
    updatedCategory(param: {
        id: number;
    }, body: UpdateCategoryDto): Promise<"category updated successfully" | "category updation unsuccessfull">;
    updateCategoryBulkStatus(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<string>;
}
