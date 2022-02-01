import { HttpStatus } from '@nestjs/common';
import { CreateBicycleAttributeDto } from 'src/dto/bicycleAttribute/createBicycleAttribute.dto';
import { GetAllBicycleAttributeDto } from 'src/dto/bicycleAttribute/getAllBicycleAttribute.dto';
import { UpdateBicycleAttributeDto } from 'src/dto/bicycleAttribute/updateBicycleAttribute.dto';
import { UpdateBicycleAttributeActivateDto } from 'src/dto/bicycleAttribute/updateBicycleAttributeActivate.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { Repository } from 'typeorm';
import { BicycleAttribute } from './bicycle-attribute.entity';
export declare class BicycleAttributeService {
    private bicycleAttributeRepo;
    constructor(bicycleAttributeRepo: Repository<BicycleAttribute>);
    createBicycleAttribute(body: CreateBicycleAttributeDto): Promise<CreateBicycleAttributeDto & BicycleAttribute>;
    findBicycleAttributeById(param: {
        id: number;
    }): Promise<{
        data: BicycleAttribute;
    }>;
    findBicycleAttributeList(query: PaginationDto, body: GetAllBicycleAttributeDto): Promise<{
        data: BicycleAttribute[];
        total: number;
    }>;
    updatedBicycleAttributeActivate(param: {
        id: number;
    }, body: UpdateBicycleAttributeActivateDto): Promise<{
        data: BicycleAttribute;
    }>;
    updatedBulkBicycleAttributeActivate(body1: {
        ids: number[];
    }, body2: UpdateBicycleAttributeActivateDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    updatedBicycleAttribute(param: {
        id: number;
    }, body: UpdateBicycleAttributeDto): Promise<{
        data: BicycleAttribute;
    }>;
}
