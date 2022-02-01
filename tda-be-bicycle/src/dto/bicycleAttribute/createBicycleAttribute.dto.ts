import { local } from "src/config/local/local.entity";

  export class CreateBicycleAttributeDto {
    name: local;
    minimuim_product_alert:number;
    turn_on_minimum_product_alert:number;
    is_activated:number;
    created_by: string;
}
  