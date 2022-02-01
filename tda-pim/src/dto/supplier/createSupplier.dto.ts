import { local } from "src/config/local/local.entity";

export class CreateSupplierDto {
  name: local;
  phone_num: string;
  mobile: string;
  email: string;
  is_a_company: number;
  address: string;
  coc_number: string;
  tax_number: string;
  created_by: string;
}
