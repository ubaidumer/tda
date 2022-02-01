import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateServicesDto } from 'src/dto/services/createServices.dto';
import { GetAllServicesDto } from 'src/dto/services/getAllServices.dto';
import { UpdateServicesDto } from 'src/dto/services/updateServices.dto';
import { UpdateServicesActivateDto } from 'src/dto/services/updateServicesActivate.dto';
import { ServicesService } from './services.service';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    postServices(body: CreateServicesDto): Promise<CreateServicesDto & import("./services.entity").Services>;
    getServicesList(query: PaginationDto, body: GetAllServicesDto): Promise<{
        data: import("./services.entity").Services[];
        total: number;
    }>;
    getServicesById(param: {
        id: number;
    }): Promise<{
        data: import("./services.entity").Services;
    }>;
    patchServicesActivateById(param: {
        id: number;
    }, body: UpdateServicesActivateDto): Promise<{
        data: import("./services.entity").Services;
    }>;
    patchServicesBulkActivateById(body1: {
        ids: number[];
    }, body2: UpdateServicesActivateDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    putServicesActivateById(param: {
        id: number;
    }, body: UpdateServicesDto): Promise<{
        data: import("./services.entity").Services;
    }>;
}
