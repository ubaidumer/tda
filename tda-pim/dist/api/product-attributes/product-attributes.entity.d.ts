declare enum Type {
    LIST = "List",
    TAG = "Tag",
    COLOR = "Color",
    SIZE = "Size",
    WEIGHT = "Weight",
    LENGTH = "Length"
}
export declare class Product_Attributes {
    id: number;
    name: string;
    value: string;
    is_activated: number;
    type: Type;
    product_: number;
    measuring__unit_: number;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
}
export {};
