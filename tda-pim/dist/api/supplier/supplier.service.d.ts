import { HttpStatus } from '@nestjs/common';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateSupplierDto } from 'src/dto/supplier/createSupplier.dto';
import { GetAllSupplierDto } from 'src/dto/supplier/getAllSupplier.dto';
import { UpdateSupplierDto } from 'src/dto/supplier/updateSupplier.dto';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';
export declare class SupplierService {
    private supplierRepo;
    constructor(supplierRepo: Repository<Supplier>);
    findSupplierList(query: PaginationDto, body: GetAllSupplierDto): Promise<{
        data: Supplier[];
        total: number;
    }>;
    findSupplierById(param: {
        id: number;
    }): Promise<{
        data: Supplier;
    }>;
    createSupplier(body: CreateSupplierDto): Promise<CreateSupplierDto & Supplier>;
    updatedSupplier(param: {
        id: number;
    }, body: UpdateSupplierDto): Promise<{
        data: Supplier;
    }>;
    updateSupplierStatus(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<{
        data: Supplier;
    }>;
    updateSupplierBulkStatus(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
