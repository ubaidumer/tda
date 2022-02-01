import { local } from "src/config/local/local.entity";
export declare class CreateBicycleTypeDto {
    name: local;
    description: local;
    static_price: number;
    is_activated: number;
    logo: string;
    created_by: string;
}
