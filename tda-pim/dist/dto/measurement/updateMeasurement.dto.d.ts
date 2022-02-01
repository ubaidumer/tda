import { local } from "src/config/local/local.entity";
export declare class UpdateMeasurementDto {
    name: local;
    short_name: string;
    is_activated: number;
    is_master: number;
    parent_id: number;
    updated_by: string;
}
