import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateSupplierDto } from 'src/dto/supplier/createSupplier.dto';
import { GetAllSupplierDto } from 'src/dto/supplier/getAllSupplier.dto';
import { UpdateSupplierDto } from 'src/dto/supplier/updateSupplier.dto';
import { UpdateSupplierActivateDto } from 'src/dto/supplier/updateSupplierActivate.dto';
import { SupplierService } from './supplier.service';
export declare class SupplierController {
    private readonly supplierService;
    constructor(supplierService: SupplierService);
    getSupplierList(query: PaginationDto, body: GetAllSupplierDto): Promise<{
        data: import("./supplier.entity").Supplier[];
        total: number;
    }>;
    getActiveSupplierList(query: PaginationDto, body: GetAllSupplierDto): Promise<{
        data: import("./supplier.entity").Supplier[];
        total: number;
    }>;
    getSupplierById(param: {
        id: number;
    }): Promise<{
        data: import("./supplier.entity").Supplier;
    }>;
    postSupplier(body: CreateSupplierDto): Promise<CreateSupplierDto & import("./supplier.entity").Supplier>;
    putSupplierById(param: {
        id: number;
    }, body: UpdateSupplierDto): Promise<{
        data: import("./supplier.entity").Supplier;
    }>;
    putSupplierStatusById(param: {
        id: number;
    }, body: UpdateSupplierActivateDto): Promise<{
        data: import("./supplier.entity").Supplier;
    }>;
    putSupplierBulkStatusByIds(body1: {
        ids: number[];
    }, body2: UpdateSupplierActivateDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
