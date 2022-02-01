import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateTaxDto } from 'src/dto/tax/createTax.dto';
import { GetAllTaxDto } from 'src/dto/tax/getAllTax.dto';
import { UpdateTaxDto } from 'src/dto/tax/updateTax.dto';
import { UpdateTaxActivateDto } from 'src/dto/tax/updateTaxActivate.dto';
import { TaxService } from './tax.service';
export declare class TaxController {
    private readonly taxService;
    constructor(taxService: TaxService);
    getTaxList(query: PaginationDto, body: GetAllTaxDto): Promise<{
        data: import("./tax.entity").Tax[];
        total: number;
    }>;
    getActiveTaxList(query: PaginationDto, body: GetAllTaxDto): Promise<{
        data: import("./tax.entity").Tax[];
        total: number;
    }>;
    getTaxById(param: {
        id: number;
    }): Promise<{
        data: import("./tax.entity").Tax;
    }>;
    postTax(body: CreateTaxDto): Promise<CreateTaxDto & import("./tax.entity").Tax>;
    putTaxById(param: {
        id: number;
    }, body: UpdateTaxDto): Promise<{
        data: import("./tax.entity").Tax;
    }>;
    putTaxStatusById(param: {
        id: number;
    }, body: UpdateTaxActivateDto): Promise<{
        data: import("./tax.entity").Tax;
    }>;
    putTaxBulkStatusByIds(body1: {
        ids: number[];
    }, body2: UpdateTaxActivateDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
