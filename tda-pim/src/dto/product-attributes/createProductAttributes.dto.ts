enum Type {
  LIST='List',
  TAG='Tag',
  COLOR='Color'
}

export class CreateProductAttributesDto {
  name: string;
  value: string;
  type: Type;
  measuring_unit_id:number;
  product_id:number;
  created_by: string;
}
