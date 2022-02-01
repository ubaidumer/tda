import { local } from "src/config/local/local.entity";

export class CreateTagDto {
  name: local;
  color: string;
  description: local;
  created_by: string;
}
