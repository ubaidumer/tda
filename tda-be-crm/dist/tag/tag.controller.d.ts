import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateTagDto } from 'src/dto/tag/createTag.dto';
import { UpdateTagDto } from 'src/dto/tag/updateTag.dto';
import { TagService } from './tag.service';
export declare class TagController {
    private readonly tagService;
    constructor(tagService: TagService);
    getTagList(query: PaginationDto): Promise<any>;
    getTagById(param: {
        id: number;
    }): Promise<any>;
    postTag(body: CreateTagDto): Promise<"tag created successfully" | "tag creation unsuccessfull">;
    deleteTagById(param: {
        id: number;
    }): Promise<"tag deleted successfully" | "tag deletion unsuccessfull">;
    putTagById(param: {
        id: number;
    }, body: UpdateTagDto): Promise<"tag updated successfully" | "tag updation unsuccessfull">;
}
