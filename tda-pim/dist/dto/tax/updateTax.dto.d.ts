import { local } from "src/config/local/local.entity";
export declare class UpdateTaxDto {
    name: local;
    is_activated: number;
    country: string;
    percentage: number;
    tax_code: string;
    updated_by: string;
}
