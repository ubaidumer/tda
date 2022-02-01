import { HttpStatus } from '@nestjs/common';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateOrgDto } from 'src/dto/org/createOrg.dto';
import { GetAllOrgDto } from 'src/dto/org/getAllOrgdto';
import { UpdateOrgDto } from 'src/dto/org/updateOrg.dto';
import { Repository } from 'typeorm';
import { Org } from './org.entity';
export declare class OrgService {
    private orgRepo;
    constructor(orgRepo: Repository<Org>);
    findOrgList(query: PaginationDto, body: GetAllOrgDto): Promise<{
        data: Org[];
        total: number;
    }>;
    findOrgById(param: {
        id: number;
    }): Promise<{
        data: Org;
    }>;
    createOrg(body: CreateOrgDto): Promise<CreateOrgDto & Org>;
    updateOrgStatus(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<{
        data: Org;
    }>;
    updatedOrg(param: {
        id: number;
    }, body: UpdateOrgDto): Promise<{
        data: Org;
    }>;
    updateOrgBulkStatus(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
