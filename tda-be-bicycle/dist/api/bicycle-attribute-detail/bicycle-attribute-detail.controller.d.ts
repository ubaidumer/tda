/// <reference types="multer" />
import { CreateBicycleAttributeDetailDto } from 'src/dto/bicycleAttributeDetail/createBicycleAttributeDetail.dto';
import { UpdateBicycleAttributeDetailDto } from 'src/dto/bicycleAttributeDetail/updateBicycleAttributeDetail.dto';
import { BicycleAttributeDetailService } from './bicycle-attribute-detail.service';
export declare class BicycleAttributeDetailController {
    private readonly bicycleAttributeDetailService;
    constructor(bicycleAttributeDetailService: BicycleAttributeDetailService);
    postBicycleAttributeDetail(body: CreateBicycleAttributeDetailDto, file: Express.Multer.File): Promise<any>;
    putBicycleAttributeDetailById(param: {
        id: number;
    }, body: UpdateBicycleAttributeDetailDto, file: Express.Multer.File): Promise<{
        data: import("./bicycle-attribute-detail.entity").BicycleAttributeDetail;
    }>;
}
