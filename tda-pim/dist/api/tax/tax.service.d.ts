import { HttpStatus } from '@nestjs/common';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateTaxDto } from 'src/dto/tax/createTax.dto';
import { UpdateTaxDto } from 'src/dto/tax/updateTax.dto';
import { Repository } from 'typeorm';
import { Tax } from './tax.entity';
export declare class TaxService {
    private taxRepo;
    constructor(taxRepo: Repository<Tax>);
    findTaxList(query: PaginationDto, body: any): Promise<{
        data: Tax[];
        total: number;
    }>;
    findTaxById(param: {
        id: number;
    }): Promise<{
        data: Tax;
    }>;
    createTax(body: CreateTaxDto): Promise<CreateTaxDto & Tax>;
    updatedTax(param: {
        id: number;
    }, body: UpdateTaxDto): Promise<{
        data: Tax;
    }>;
    updateTaxStatus(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<{
        data: Tax;
    }>;
    updateTaxBulkStatus(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
