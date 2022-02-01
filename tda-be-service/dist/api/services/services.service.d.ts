import { HttpStatus } from '@nestjs/common';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateServicesDto } from 'src/dto/services/createServices.dto';
import { GetAllServicesDto } from 'src/dto/services/getAllServices.dto';
import { UpdateServicesDto } from 'src/dto/services/updateServices.dto';
import { UpdateServicesActivateDto } from 'src/dto/services/updateServicesActivate.dto';
import { Repository } from 'typeorm';
import { Services } from './services.entity';
export declare class ServicesService {
    private servicesRepo;
    constructor(servicesRepo: Repository<Services>);
    createServices(body: CreateServicesDto): Promise<CreateServicesDto & Services>;
    findServicesList(query: PaginationDto, body: GetAllServicesDto): Promise<{
        data: Services[];
        total: number;
    }>;
    findServicesById(param: {
        id: number;
    }): Promise<{
        data: Services;
    }>;
    updatedServicesActivate(param: {
        id: number;
    }, body: UpdateServicesActivateDto): Promise<{
        data: Services;
    }>;
    updatedBulkServicesActivate(body1: {
        ids: number[];
    }, body2: UpdateServicesActivateDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    updatedServices(param: {
        id: number;
    }, body: UpdateServicesDto): Promise<{
        data: Services;
    }>;
}
