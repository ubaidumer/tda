import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateOrgtypeDto } from 'src/dto/orgtype/createOrgtype.dto';
import { UpdateOrgtypeDto } from 'src/dto/orgtype/updateOrgtype.dto';
import { OrgtypeService } from './orgtype.service';
import { GetAllOrgTypeDto } from 'src/dto/orgtype/getAllOrgtypedto';
import { UpdateTagActivateDto } from 'src/dto/tag/updateTagActivate.dto';
export declare class OrgtypeController {
    private readonly orgtypeService;
    constructor(orgtypeService: OrgtypeService);
    getOrgtypeList(query: PaginationDto, body: GetAllOrgTypeDto): Promise<{
        data: import("./orgtype.entity").Orgtype[];
        total: number;
    }>;
    getActiveOrgtypeList(query: PaginationDto, body: GetAllOrgTypeDto): Promise<{
        data: import("./orgtype.entity").Orgtype[];
        total: number;
    }>;
    getOrgtypeById(param: {
        id: number;
    }): Promise<{
        data: import("./orgtype.entity").Orgtype;
    }>;
    postOrgtype(body: CreateOrgtypeDto): Promise<CreateOrgtypeDto & import("./orgtype.entity").Orgtype>;
    putOrgTypeStatusById(param: {
        id: number;
    }, body: UpdateTagActivateDto): Promise<{
        data: import("./orgtype.entity").Orgtype;
    }>;
    putOrgtypeById(param: {
        id: number;
    }, body: UpdateOrgtypeDto): Promise<{
        data: import("./orgtype.entity").Orgtype;
    }>;
    putOrgtypeBulkStatusByIds(body1: {
        ids: number[];
    }, body2: UpdateTagActivateDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
