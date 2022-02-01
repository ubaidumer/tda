import * as dotenv from 'dotenv';
import { Category } from 'src/api/category/category.entity';
import { Catalog } from 'src/api/catalog/catalog.entity';
import { Location } from 'src/api/location/location.entity';
import { Tax } from 'src/api/tax/tax.entity';
import { Measurement } from 'src/api/measurement/measurement.entity';
import { Supplier } from 'src/api/supplier/supplier.entity';
import { Stock } from 'src/api/stock/stock.entity';
import { Product } from 'src/api/product/product.entity';
import { Product_Attributes } from 'src/api/product-attributes/product-attributes.entity';
dotenv.config();
const CONFIG = {
  /*DATABASE-CONFIG VARIABLES*/
  DATABASE_TYPE: String(`${process.env.MYSQL_DATABASE_TYPE}`),
  DATABASE_HOST: String(`${process.env.MYSQL_DATABASE_HOST}`),
  DATABASE_PORT: process.env.MYSQL_DATABASE_PORT,
  DATABASE_USERNAME: String(`${process.env.MYSQL_DATABASE_USERNAME}`),
  DATABASE_PASSWORD: String(`${process.env.MYSQL_DATABASE_PASSWORD}`),
  DATABASE_NAME: String(`${process.env.MYSQL_DATABASE_NAME}`),
  DATABASE_ENTITIES: [Category,Catalog,Location,Tax,Measurement,Supplier,Stock,Product,Product_Attributes],
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
