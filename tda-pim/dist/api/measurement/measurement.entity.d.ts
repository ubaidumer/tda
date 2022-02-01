import { local } from 'src/config/local/local.entity';
export declare class Measurement {
    id: number;
    name: local;
    short_name: string;
    is_master: number;
    parent_id: number;
    is_activated: number;
    product_attributes: number;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
}
