declare enum Type {
    GROUPED = "Grouped",
    PRODUCT = "Product",
    DOWNLOAD = "Download"
}
export declare class CreateProductDto {
    title: string;
    description: string;
    description_short: string;
    price: number;
    price_sale: number;
    is_shippable: number;
    type: Type;
    tag_ids: string;
    is_taxed: number;
    minimum_order: number;
    weight: number;
    size_height: number;
    size_length: number;
    size_width: number;
    up_sell: string;
    cross_sell: string;
    ean: string;
    sku: string;
    back_order: number;
    min_stock: number;
    supplier_id: number;
    catalog_id: number;
    product_category_id: number;
    tax_class_id: number;
    created_by: string;
}
export {};
