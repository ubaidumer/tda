/// <reference types="multer" />
import { CreateBicycleAttributeDetailDto } from 'src/dto/bicycleAttributeDetail/createBicycleAttributeDetail.dto';
import { UpdateBicycleAttributeDetailDto } from 'src/dto/bicycleAttributeDetail/updateBicycleAttributeDetail.dto';
import { Repository } from 'typeorm';
import { BicycleAttributeDetail } from './bicycle-attribute-detail.entity';
export declare class BicycleAttributeDetailService {
    private bicycleAttributeDetailRepo;
    constructor(bicycleAttributeDetailRepo: Repository<BicycleAttributeDetail>);
    private fileDirectory;
    createBicycleAttributeDetail(body: CreateBicycleAttributeDetailDto, file: Express.Multer.File): Promise<any>;
    updatedBicycleAttributeDetail(param: {
        id: number;
    }, body: UpdateBicycleAttributeDetailDto, file: any): Promise<{
        data: BicycleAttributeDetail;
    }>;
}
