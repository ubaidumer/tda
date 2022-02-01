/// <reference types="multer" />
import { CreateBicycleTypeDto } from 'src/dto/bicycleType/createBicycleType.dto';
import { GetAllBicycleTypeDto } from 'src/dto/bicycleType/getAllBicycleType.dto';
import { UpdateBicycleTypeDto } from 'src/dto/bicycleType/updateBicycleType.dto';
import { UpdateBicycleTypeActivateDto } from 'src/dto/bicycleType/updateBicycleTypeActivate.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { BicycleTypeService } from './bicycle-type.service';
export declare class BicycleTypeController {
    private readonly bicycleTypeService;
    constructor(bicycleTypeService: BicycleTypeService);
    postBicycleType(body: CreateBicycleTypeDto, file: Express.Multer.File): Promise<any>;
    getActiveBicycleTypeList(query: PaginationDto, body: GetAllBicycleTypeDto): Promise<{
        data: import("./bicycle-type.entity").BicycleType[];
        total: number;
    }>;
    putBicycleTypeById(param: {
        id: number;
    }, body: UpdateBicycleTypeDto, file: Express.Multer.File): Promise<{
        data: import("./bicycle-type.entity").BicycleType;
    }>;
    getBicycleTypeList(query: PaginationDto, body: GetAllBicycleTypeDto): Promise<{
        data: import("./bicycle-type.entity").BicycleType[];
        total: number;
    }>;
    getBicycleTypeById(param: {
        id: number;
    }): Promise<{
        data: import("./bicycle-type.entity").BicycleType;
    }>;
    patchBicycleTypeActivateById(param: {
        id: number;
    }, body: UpdateBicycleTypeActivateDto): Promise<{
        data: import("./bicycle-type.entity").BicycleType;
    }>;
    patchBicycleTypeBulkActivateById(body1: {
        ids: number[];
    }, body2: UpdateBicycleTypeActivateDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
