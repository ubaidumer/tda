import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateMeasurementDto } from 'src/dto/measurement/createMeasurement.dto';
import { GetAllMeasurementDto } from 'src/dto/measurement/getAllMeasurement.dto';
import { UpdateMeasurementDto } from 'src/dto/measurement/updateMeasurement.dto';
import { UpdateMeasurementActivateDto } from 'src/dto/measurement/updateMeasurementActivate.dto';
import { MeasurementService } from './measurement.service';
export declare class MeasurementController {
    private readonly measurementService;
    constructor(measurementService: MeasurementService);
    getMeasurementList(query: PaginationDto, body: GetAllMeasurementDto): Promise<{
        data: import("./measurement.entity").Measurement[];
        total: number;
    }>;
    getActiveMeasurementList(query: PaginationDto, body: GetAllMeasurementDto): Promise<{
        data: import("./measurement.entity").Measurement[];
        total: number;
    }>;
    getMeasurementById(param: {
        id: number;
    }): Promise<{
        data: import("./measurement.entity").Measurement;
    }>;
    postMeasurement(body: CreateMeasurementDto): Promise<CreateMeasurementDto & import("./measurement.entity").Measurement>;
    putMeasurementById(param: {
        id: number;
    }, body: UpdateMeasurementDto): Promise<{
        data: import("./measurement.entity").Measurement;
    }>;
    putMeasurementStatusById(param: {
        id: number;
    }, body: UpdateMeasurementActivateDto): Promise<{
        data: import("./measurement.entity").Measurement;
    }>;
    putMeasurementBulkStatusByIds(body1: {
        ids: number[];
    }, body2: UpdateMeasurementActivateDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
