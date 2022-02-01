import { local } from 'src/config/local/local.entity';
export declare class Tax {
    id: number;
    name: local;
    is_activated: number;
    country: string;
    percentage: number;
    tax_code: string;
    product: number;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
}
