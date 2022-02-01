declare enum LocationType {
    WAREHOUSE = "Warehouse",
    STORE = "Store"
}
export declare class Location {
    id: number;
    name: string;
    is_activated: number;
    location_type: LocationType;
    address: string;
    city: string;
    postal_code: string;
    stock: number;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
}
export {};
