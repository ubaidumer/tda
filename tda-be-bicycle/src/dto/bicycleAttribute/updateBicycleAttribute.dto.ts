import { local } from "src/config/local/local.entity";

  export class UpdateBicycleAttributeDto {
    name: local;
    minimuim_product_alert:number;
    turn_on_minimum_product_alert:number;
    is_activated:number;
    updated_by: string;
}
  