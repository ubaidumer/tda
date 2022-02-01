enum Type {
  LIST='List',
  TAG='Tag',
  COLOR='Color'
}

export class UpdateProductAttributesDto {
  name: string;
  value: string;
  type: Type;
  measuring_unit_id:number;
  product_id:number;
  updated_by: string;
  is_activated:number;
  }
  