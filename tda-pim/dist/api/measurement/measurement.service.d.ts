import { HttpStatus } from '@nestjs/common';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateMeasurementDto } from 'src/dto/measurement/createMeasurement.dto';
import { GetAllMeasurementDto } from 'src/dto/measurement/getAllMeasurement.dto';
import { UpdateMeasurementDto } from 'src/dto/measurement/updateMeasurement.dto';
import { Repository } from 'typeorm';
import { Measurement } from './measurement.entity';
export declare class MeasurementService {
    private measurementRepo;
    constructor(measurementRepo: Repository<Measurement>);
    findMeasurementList(query: PaginationDto, body: GetAllMeasurementDto): Promise<{
        data: Measurement[];
        total: number;
    }>;
    findMeasurementById(param: {
        id: number;
    }): Promise<{
        data: Measurement;
    }>;
    createMeasurement(body: CreateMeasurementDto): Promise<CreateMeasurementDto & Measurement>;
    updatedMeasurement(param: {
        id: number;
    }, body: UpdateMeasurementDto): Promise<{
        data: Measurement;
    }>;
    updateMeasurementStatus(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<{
        data: Measurement;
    }>;
    updateMeasurementBulkStatus(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
