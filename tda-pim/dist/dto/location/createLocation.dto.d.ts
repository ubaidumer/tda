declare enum LocationType {
    WAREHOUSE = "warehouse",
    STORE = "store"
}
export declare class CreateLocationDto {
    name: string;
    location_type: LocationType;
    address: string;
    city: string;
    postal_code: string;
    created_by: string;
}
export {};
