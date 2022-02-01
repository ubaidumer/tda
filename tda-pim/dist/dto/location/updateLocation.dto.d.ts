declare enum LocationType {
    WAREHOUSE = "warehouse",
    STORE = "store"
}
export declare class UpdateLocationDto {
    name: string;
    is_activated: number;
    location_type: LocationType;
    address: string;
    city: string;
    postal_code: string;
    updated_by: string;
}
export {};
