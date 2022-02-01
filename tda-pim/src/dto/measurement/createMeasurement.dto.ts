import { local } from "src/config/local/local.entity";

export class CreateMeasurementDto {
  name: local;
  short_name:string;
  is_master:number;
  parent_id:number;
  created_by: string;
}
