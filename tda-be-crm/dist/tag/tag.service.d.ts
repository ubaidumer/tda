import { Tag } from './tag.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateTagDto } from 'src/dto/tag/createTag.dto';
import { UpdateTagDto } from 'src/dto/tag/updateTag.dto';
export declare class TagService {
    private tagRepo;
    constructor(tagRepo: Repository<Tag>);
    findTagList(query: PaginationDto): Promise<any>;
    findTagById(param: {
        id: number;
    }): Promise<any>;
    createTag(body: CreateTagDto): Promise<"tag created successfully" | "tag creation unsuccessfull">;
    removeTag(param: {
        id: number;
    }): Promise<"tag deleted successfully" | "tag deletion unsuccessfull">;
    updatedTag(param: {
        id: number;
    }, body: UpdateTagDto): Promise<"tag updated successfully" | "tag updation unsuccessfull">;
}
