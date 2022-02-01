import { local } from "src/config/local/local.entity";

export class CreateOrgDto {
  name: local;
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
  tag_ids:string;
  description: local;
  created_by: string;
}
