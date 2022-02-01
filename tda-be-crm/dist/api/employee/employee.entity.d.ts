import { local } from 'src/config/local/local.entity';
export declare class Employee {
    id: number;
    first_name: string;
    last_name: string;
    street: string;
    street_num: string;
    postal_code: string;
    city: string;
    province: string;
    country: string;
    email: string;
    phone_num: string;
    mobile: string;
    website: string;
    is_activated: number;
    description: local;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
    tag_ids: string;
}
