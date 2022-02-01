declare enum Type {
    LIST = "List",
    TAG = "Tag",
    COLOR = "Color"
}
export declare class CreateProductAttributesDto {
    name: string;
    value: string;
    type: Type;
    measuring_unit_id: number;
    product_id: number;
    created_by: string;
}
export {};
