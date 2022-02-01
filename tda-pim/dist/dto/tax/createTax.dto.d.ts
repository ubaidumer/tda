import { local } from "src/config/local/local.entity";
export declare class CreateTaxDto {
    name: local;
    country: string;
    percentage: number;
    tax_code: string;
    created_by: string;
}
