import { local } from 'src/config/local/local.entity';
declare enum Type {
    GROUPED = "Grouped",
    PRODUCT = "Product",
    DOWNLOAD = "Download"
}
export declare class Product {
    id: number;
    title: local;
    description: local;
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
    is_activated: number;
    supplier_id: number;
    catalog_id: number;
    product_category_id: number;
    tax_class_id: number;
    supplier_: number;
    catalog_: number;
    product__category_: number;
    tax__class_: number;
    stock: number;
    product_attributes: number;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
}
export {};
