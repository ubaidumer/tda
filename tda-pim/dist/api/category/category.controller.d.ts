import { CreateCategoryDto } from 'src/dto/category/createCategory.dto';
import { UpdateCategoryDto } from 'src/dto/category/updateCategory.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategoryList(query: PaginationDto): Promise<any>;
    getCategoryById(param: {
        id: number;
    }): Promise<any>;
    postCategory(body: CreateCategoryDto): Promise<"category created successfully" | "category creation unsuccessfull">;
    putCategoryStatusById(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<"category status updated successfully" | "category status updation unsuccessfull">;
    putCategoryById(param: {
        id: number;
    }, body: UpdateCategoryDto): Promise<"category updated successfully" | "category updation unsuccessfull">;
    putCategoryBulkStatusByIds(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<string>;
}
