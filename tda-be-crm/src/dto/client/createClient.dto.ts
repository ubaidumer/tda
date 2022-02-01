import { local } from "src/config/local/local.entity";

export class CreateClientDto {
  first_name: string;
  last_name: string;
  street:string;
  street_num: string;
  postal_code: string;
  city: string;
  province: string;
  country: string;
  website: string;
  email: string;
  phone_num: string;
  mobile: string;
  description: local;
  tag_ids:string;
  created_by: string;
}
