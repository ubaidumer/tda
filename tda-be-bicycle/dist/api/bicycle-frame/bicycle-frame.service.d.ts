/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { CreateBicycleFrameDto } from 'src/dto/bicycleFrame/createBicycleFrame.dto';
import { GetAllBicycleFrameDto } from 'src/dto/bicycleFrame/getAllBicycleFrame.dto';
import { UpdateBicycleFrameDto } from 'src/dto/bicycleFrame/updateBicycleFrame.dto';
import { UpdateBicycleFrameActivateDto } from 'src/dto/bicycleFrame/updateBicycleFrameActivate.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { Repository } from 'typeorm';
import { BicycleFrame } from './bicycle-frame.entity';
export declare class BicycleFrameService {
    private bicycleFrameRepo;
    constructor(bicycleFrameRepo: Repository<BicycleFrame>);
    private fileDirectory;
    createBicycleFrame(body: CreateBicycleFrameDto, file: Express.Multer.File): Promise<any>;
    findBicycleFrameById(param: {
        id: number;
    }): Promise<{
        data: BicycleFrame;
    }>;
    findBicycleFrameList(query: PaginationDto, body: GetAllBicycleFrameDto): Promise<{
        data: BicycleFrame[];
        total: number;
    }>;
    updatedBicycleFrameActivate(param: {
        id: number;
    }, body: UpdateBicycleFrameActivateDto): Promise<{
        data: BicycleFrame;
    }>;
    updatedBulkBicycleFrameActivate(body1: {
        ids: number[];
    }, body2: UpdateBicycleFrameActivateDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    updatedBicycleFrame(param: {
        id: number;
    }, body: UpdateBicycleFrameDto, file: any): Promise<{
        data: BicycleFrame;
    }>;
}
