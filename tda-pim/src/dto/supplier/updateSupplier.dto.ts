import { local } from "src/config/local/local.entity";

export class UpdateSupplierDto {
  name: local;
  phone_num: string;
  mobile: string;
  email: string;
  is_a_company: number;
  address: string;
  coc_number: string;
  tax_number: string;
  is_activated:number;
  updated_by: string;
  }
  