import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateOrgtypeDto } from 'src/dto/orgtype/createOrgtype.dto';
import { UpdateOrgtypeDto } from 'src/dto/orgtype/updateOrgtype.dto';
import { OrgtypeService } from './orgtype.service';
export declare class OrgtypeController {
    private readonly orgtypeService;
    constructor(orgtypeService: OrgtypeService);
    getOrgtypeList(query: PaginationDto): Promise<any>;
    getOrgtypeById(param: {
        id: number;
    }): Promise<any>;
    postOrgtype(body: CreateOrgtypeDto): Promise<"orgtype created successfully" | "orgtype creation unsuccessfull">;
    deleteOrgtypeById(param: {
        id: number;
    }): Promise<"orgtype deleted successfully" | "orgtype deletion unsuccessfull">;
    putOrgtypeById(param: {
        id: number;
    }, body: UpdateOrgtypeDto): Promise<"orgtype updated successfully" | "orgtype updation unsuccessfull">;
}
