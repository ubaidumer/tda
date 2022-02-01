import { CreateBicycleAttributeDto } from 'src/dto/bicycleAttribute/createBicycleAttribute.dto';
import { GetAllBicycleAttributeDto } from 'src/dto/bicycleAttribute/getAllBicycleAttribute.dto';
import { UpdateBicycleAttributeDto } from 'src/dto/bicycleAttribute/updateBicycleAttribute.dto';
import { UpdateBicycleAttributeActivateDto } from 'src/dto/bicycleAttribute/updateBicycleAttributeActivate.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { BicycleAttributeService } from './bicycle-attribute.service';
export declare class BicycleAttributeController {
    private readonly bicycleAttributeService;
    constructor(bicycleAttributeService: BicycleAttributeService);
    postBicycleAttribute(body: CreateBicycleAttributeDto): Promise<CreateBicycleAttributeDto & import("./bicycle-attribute.entity").BicycleAttribute>;
    getBicycleAttributeList(query: PaginationDto, body: GetAllBicycleAttributeDto): Promise<{
        data: import("./bicycle-attribute.entity").BicycleAttribute[];
        total: number;
    }>;
    getActiveBicycleAttributeList(query: PaginationDto, body: GetAllBicycleAttributeDto): Promise<{
        data: import("./bicycle-attribute.entity").BicycleAttribute[];
        total: number;
    }>;
    getBicycleAttributeById(param: {
        id: number;
    }): Promise<{
        data: import("./bicycle-attribute.entity").BicycleAttribute;
    }>;
    patchBicycleAttributeActivateById(param: {
        id: number;
    }, body: UpdateBicycleAttributeActivateDto): Promise<{
        data: import("./bicycle-attribute.entity").BicycleAttribute;
    }>;
    patchBicycleAttributeBulkActivateById(body1: {
        ids: number[];
    }, body2: UpdateBicycleAttributeActivateDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    putBicycleAttributeById(param: {
        id: number;
    }, body: UpdateBicycleAttributeDto): Promise<{
        data: import("./bicycle-attribute.entity").BicycleAttribute;
    }>;
}
