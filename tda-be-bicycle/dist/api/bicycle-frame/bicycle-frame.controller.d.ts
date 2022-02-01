/// <reference types="multer" />
import { CreateBicycleFrameDto } from 'src/dto/bicycleFrame/createBicycleFrame.dto';
import { GetAllBicycleFrameDto } from 'src/dto/bicycleFrame/getAllBicycleFrame.dto';
import { UpdateBicycleFrameDto } from 'src/dto/bicycleFrame/updateBicycleFrame.dto';
import { UpdateBicycleFrameActivateDto } from 'src/dto/bicycleFrame/updateBicycleFrameActivate.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { BicycleFrameService } from './bicycle-frame.service';
export declare class BicycleFrameController {
    private readonly bicycleFrameService;
    constructor(bicycleFrameService: BicycleFrameService);
    postBicycleFrame(body: CreateBicycleFrameDto, file: Express.Multer.File): Promise<any>;
    getBicycleFrameList(query: PaginationDto, body: GetAllBicycleFrameDto): Promise<{
        data: import("./bicycle-frame.entity").BicycleFrame[];
        total: number;
    }>;
    getActiveBicycleFrameList(query: PaginationDto, body: GetAllBicycleFrameDto): Promise<{
        data: import("./bicycle-frame.entity").BicycleFrame[];
        total: number;
    }>;
    getBicycleFrameById(param: {
        id: number;
    }): Promise<{
        data: import("./bicycle-frame.entity").BicycleFrame;
    }>;
    patchBicycleFrameActivateById(param: {
        id: number;
    }, body: UpdateBicycleFrameActivateDto): Promise<{
        data: import("./bicycle-frame.entity").BicycleFrame;
    }>;
    patchBicycleFrameBulkActivateById(body1: {
        ids: number[];
    }, body2: UpdateBicycleFrameActivateDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    putBicycleFrameById(param: {
        id: number;
    }, body: UpdateBicycleFrameDto, file: Express.Multer.File): Promise<{
        data: import("./bicycle-frame.entity").BicycleFrame;
    }>;
}
