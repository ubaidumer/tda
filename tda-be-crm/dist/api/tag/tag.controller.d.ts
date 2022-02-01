import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateTagDto } from 'src/dto/tag/createTag.dto';
import { GetAllTagDto } from 'src/dto/tag/getAllTag.dto';
import { UpdateTagDto } from 'src/dto/tag/updateTag.dto';
import { UpdateTagActivateDto } from 'src/dto/tag/updateTagActivate.dto';
import { TagService } from './tag.service';
export declare class TagController {
    private readonly tagService;
    constructor(tagService: TagService);
    getTagList(query: PaginationDto, body: GetAllTagDto): Promise<{
        data: import("./tag.entity").Tag[];
        total: number;
    }>;
    getActiveTagList(query: PaginationDto, body: GetAllTagDto): Promise<{
        data: import("./tag.entity").Tag[];
        total: number;
    }>;
    getTagById(param: {
        id: number;
    }): Promise<{
        data: import("./tag.entity").Tag;
    }>;
    postTag(body: CreateTagDto): Promise<CreateTagDto & import("./tag.entity").Tag>;
    putTagStatusById(param: {
        id: number;
    }, body: UpdateTagActivateDto): Promise<{
        data: import("./tag.entity").Tag;
    }>;
    putTagById(param: {
        id: number;
    }, body: UpdateTagDto): Promise<{
        data: import("./tag.entity").Tag;
    }>;
    putTagBulkStatusByIds(body1: {
        ids: number[];
    }, body2: UpdateTagActivateDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
