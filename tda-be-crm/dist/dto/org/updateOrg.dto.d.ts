import { local } from "src/config/local/local.entity";
export declare class UpdateOrgDto {
    name: local;
    street: string;
    street_num: string;
    postal_code: string;
    city: string;
    province: string;
    country: string;
    website: string;
    email: string;
    phone_num: string;
    mobile: string;
    description: local;
    tag_ids: string;
    updated_by: string;
    is_activated: number;
}
