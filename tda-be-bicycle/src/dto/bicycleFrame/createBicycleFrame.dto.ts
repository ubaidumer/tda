import { local } from "src/config/local/local.entity";

  export class CreateBicycleFrameDto {
    name: local;
    description: local;
    minimuim_product_alert:number;
    turn_on_minimum_product_alert:number;
    quantity:number;
    per_day_price: local;
    bicycle_type_id: number;
    is_activated:number;
    logo:string;
    created_by: string;
}
  