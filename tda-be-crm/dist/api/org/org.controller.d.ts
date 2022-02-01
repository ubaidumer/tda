import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateOrgDto } from 'src/dto/org/createOrg.dto';
import { GetAllOrgDto } from 'src/dto/org/getAllOrgdto';
import { UpdateOrgDto } from 'src/dto/org/updateOrg.dto';
import { UpdateOrgActivateDto } from 'src/dto/org/updateOrgActivate.dto';
import { OrgService } from './org.service';
export declare class OrgController {
    private readonly orgService;
    constructor(orgService: OrgService);
    getEmployeeList(query: PaginationDto, body: GetAllOrgDto): Promise<{
        data: import("./org.entity").Org[];
        total: number;
    }>;
    getActiveOrgList(query: PaginationDto, body: GetAllOrgDto): Promise<{
        data: import("./org.entity").Org[];
        total: number;
    }>;
    getOrgById(param: {
        id: number;
    }): Promise<{
        data: import("./org.entity").Org;
    }>;
    postOrg(body: CreateOrgDto): Promise<CreateOrgDto & import("./org.entity").Org>;
    putOrgStatusById(param: {
        id: number;
    }, body: UpdateOrgActivateDto): Promise<{
        data: import("./org.entity").Org;
    }>;
    putOrgById(param: {
        id: number;
    }, body: UpdateOrgDto): Promise<{
        data: import("./org.entity").Org;
    }>;
    putOrgBulkStatusByIds(body1: {
        ids: number[];
    }, body2: UpdateOrgActivateDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
