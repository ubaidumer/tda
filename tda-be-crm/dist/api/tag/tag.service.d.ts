import { HttpStatus } from '@nestjs/common';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateTagDto } from 'src/dto/tag/createTag.dto';
import { UpdateTagDto } from 'src/dto/tag/updateTag.dto';
import { GetAllTagDto } from 'src/dto/tag/getAllTag.dto';
export declare class TagService {
    private tagRepo;
    constructor(tagRepo: Repository<Tag>);
    findTagList(query: PaginationDto, body: GetAllTagDto): Promise<{
        data: Tag[];
        total: number;
    }>;
    findTagById(param: {
        id: number;
    }): Promise<{
        data: Tag;
    }>;
    createTag(body: CreateTagDto): Promise<CreateTagDto & Tag>;
    updateTagStatus(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<{
        data: Tag;
    }>;
    updatedTag(param: {
        id: number;
    }, body: UpdateTagDto): Promise<{
        data: Tag;
    }>;
    updateTagBulkStatus(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
