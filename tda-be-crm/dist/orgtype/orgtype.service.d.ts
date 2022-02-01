import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateOrgtypeDto } from 'src/dto/orgtype/createOrgtype.dto';
import { UpdateOrgtypeDto } from 'src/dto/orgtype/updateOrgtype.dto';
import { Repository } from 'typeorm';
import { Orgtype } from './orgtype.entity';
export declare class OrgtypeService {
    private orgtypeRepo;
    constructor(orgtypeRepo: Repository<Orgtype>);
    findOrgtypeList(query: PaginationDto): Promise<any>;
    findOrgtypeById(param: {
        id: number;
    }): Promise<any>;
    createOrgtype(body: CreateOrgtypeDto): Promise<"orgtype created successfully" | "orgtype creation unsuccessfull">;
    removeOrgtype(param: {
        id: number;
    }): Promise<"orgtype deleted successfully" | "orgtype deletion unsuccessfull">;
    updatedOrgtype(param: {
        id: number;
    }, body: UpdateOrgtypeDto): Promise<"orgtype updated successfully" | "orgtype updation unsuccessfull">;
}
