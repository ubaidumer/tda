/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { CreateBicycleTypeDto } from 'src/dto/bicycleType/createBicycleType.dto';
import { GetAllBicycleTypeDto } from 'src/dto/bicycleType/getAllBicycleType.dto';
import { UpdateBicycleTypeDto } from 'src/dto/bicycleType/updateBicycleType.dto';
import { UpdateBicycleTypeActivateDto } from 'src/dto/bicycleType/updateBicycleTypeActivate.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { Repository } from 'typeorm';
import { BicycleType } from './bicycle-type.entity';
export declare class BicycleTypeService {
    private bicycleTypeRepo;
    constructor(bicycleTypeRepo: Repository<BicycleType>);
    private fileDirectory;
    createBicycleType(body: CreateBicycleTypeDto, file: Express.Multer.File): Promise<any>;
    updatedBicycleType(param: {
        id: number;
    }, body: UpdateBicycleTypeDto, file: any): Promise<{
        data: BicycleType;
    }>;
    findBicycleTypeList(query: PaginationDto, body: GetAllBicycleTypeDto): Promise<{
        data: BicycleType[];
        total: number;
    }>;
    findBicycleTypeById(param: {
        id: number;
    }): Promise<{
        data: BicycleType;
    }>;
    updatedBicycleTypeActivate(param: {
        id: number;
    }, body: UpdateBicycleTypeActivateDto): Promise<{
        data: BicycleType;
    }>;
    updatedBulkBicycleTypeActivate(body1: {
        ids: number[];
    }, body2: UpdateBicycleTypeActivateDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
