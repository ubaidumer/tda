import * as dotenv from 'dotenv';
import { BicycleAttributeDetail } from 'src/api/bicycle-attribute-detail/bicycle-attribute-detail.entity';
import { BicycleAttribute } from 'src/api/bicycle-attribute/bicycle-attribute.entity';
import { BicycleFrame } from 'src/api/bicycle-frame/bicycle-frame.entity';
import { BicycleType } from 'src/api/bicycle-type/bicycle-type.entity';
dotenv.config();
const CONFIG = {
  /*DATABASE-CONFIG VARIABLES*/
  DATABASE_TYPE: String(`${process.env.MYSQL_DATABASE_TYPE}`),
  DATABASE_HOST: String(`${process.env.MYSQL_DATABASE_HOST}`),
  DATABASE_PORT: process.env.MYSQL_DATABASE_PORT,
  DATABASE_USERNAME: String(`${process.env.MYSQL_DATABASE_USERNAME}`),
  DATABASE_PASSWORD: String(`${process.env.MYSQL_DATABASE_PASSWORD}`),
  DATABASE_NAME: String(`${process.env.MYSQL_DATABASE_NAME}`),
  DATABASE_ENTITIES: [BicycleType,BicycleFrame,BicycleAttributeDetail,BicycleAttribute],
  DATABASE_SYNCHRONIZE: true,
  DATABASE_MULTI_STATEMENT: false,

  /*MAIN.ts-CONFIG VARIABLES*/
  NEST_APP_PORT: process.env.SERVER_PORT,

  /*KEYCLOAK VARIABLES*/
  KEYCLOAK_URL:String(`${process.env.KEYCLOAK_HOST}/auth`),
  KEYCLOAK_REALM:String(`${process.env.KEYCLOAK_REALM}`),
  KEYCLOAK_CLIENT:String(`${process.env.KEYCLOAK_CLIENT_ID}`),
  KEYCLOAK_CLIENT_SECRET:String(`${process.env.KEYCLOAK_CLIENT_SECRET}`),
};

export default CONFIG;
