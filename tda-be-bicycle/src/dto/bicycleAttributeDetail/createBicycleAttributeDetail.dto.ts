import { local } from "src/config/local/local.entity";

  export class CreateBicycleAttributeDetailDto {
    name: local;
    description: local;
    quantity: number;
    per_day_price: local;
    logo: string;
    bicycle_attribute_id: number;
    is_activated:number;
    created_by: string;
}
  