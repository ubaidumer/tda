import { HttpStatus } from '@nestjs/common';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateOrgtypeDto } from 'src/dto/orgtype/createOrgtype.dto';
import { GetAllOrgTypeDto } from 'src/dto/orgtype/getAllOrgtypedto';
import { UpdateOrgtypeDto } from 'src/dto/orgtype/updateOrgtype.dto';
import { Repository } from 'typeorm';
import { Orgtype } from './orgtype.entity';
export declare class OrgtypeService {
    private orgtypeRepo;
    constructor(orgtypeRepo: Repository<Orgtype>);
    findOrgtypeList(query: PaginationDto, body: GetAllOrgTypeDto): Promise<{
        data: Orgtype[];
        total: number;
    }>;
    findOrgtypeById(param: {
        id: number;
    }): Promise<{
        data: Orgtype;
    }>;
    createOrgtype(body: CreateOrgtypeDto): Promise<CreateOrgtypeDto & Orgtype>;
    updateOrgTypeStatus(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<{
        data: Orgtype;
    }>;
    updatedOrgtype(param: {
        id: number;
    }, body: UpdateOrgtypeDto): Promise<{
        data: Orgtype;
    }>;
    updateOrgtypeBulkStatus(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
