import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateProductAttributesDto } from 'src/dto/product-attributes/createProductAttributes.dto';
import { UpdateProductAttributesDto } from 'src/dto/product-attributes/updateProductAttributes.dto';
import { getManager, Repository } from 'typeorm';
import { Product_Attributes } from './product-attributes.entity';

@Injectable()
export class ProductAttributesService {
    constructor(
        @InjectRepository(Product_Attributes)
        private productAttributesRepo: Repository<Product_Attributes>,
      ) {}
      async findProductAttributesList(query:PaginationDto) {
        const data = await this.productAttributesRepo.query(
          `
                call tda.product_attributes_list(${query.limit}, ${query.offset}, @total, @result);
                `,
        );
        console.log(data[0][0]);
        return data[0][0];
      }
      async findProductAttributesById(param:{id: number}) {
        const data = await this.productAttributesRepo.query(
          `
                call tda.product_attributes_get(${param.id ? param.id : 1}, @result);
                `,
        );
        console.log(data[0][0]);
        return data[0][0];
      }
      async createProductAttributes(body:CreateProductAttributesDto) {
        const data = await this.productAttributesRepo.query(
          "call tda.product_attributes_create('" +
            body.name +
            "','" +
            body.value +
            "','" +
            body.type +
            "'," +
            (body.product_id?body.product_id:null)+
            "," +
            (body.measuring_unit_id?body.measuring_unit_id:null) +
            ",'" +
            (body.created_by?body.created_by:null) +
            "',1,@query_status); ",
        ).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
          return 'product attributes created successfully';
        } else {
          return 'product attributes creation unsuccessfull';
        }
    }
    async updatedProductAttributes(param: {id:number}, body:UpdateProductAttributesDto) {
        const data = await this.productAttributesRepo.query(
          "call tda.product_attributes_update(" +
            param.id +
            ",'" +
            body.name +
            "','" +
            body.value +
            "','" +
            body.type +
            "'," +
            (body.product_id?body.product_id:null)+
            "," +
            (body.measuring_unit_id?body.measuring_unit_id:null) +
            ",'" +
            (body.updated_by?body.updated_by:null) +
            "','" +
            body.is_activated +
            "',@query_status); ",
        ).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
          return 'product attributes updated successfully';
        } else {
          return 'product attributes updation unsuccessfull';
        }
      }
      async updateProductAttributesStatus(param:{id:number},body :{is_activated:number}) {
        const data = await this.productAttributesRepo.query(
          `
                call tda.product_attributes_toggle_status(${param.id},${body.is_activated},@query_status);
                `,
        );
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
          return 'product attributes status updated successfully';
        } else {
          return 'product attributes status updation unsuccessfull';
        }
      }
      async updateProductAttributesBulkStatus(body1:{ids:number[]},body2 :{is_activated:number}) {
        console.log('ids:',body1.ids,'is_activated:',body2.is_activated);
      const response =  await getManager()
        .createQueryBuilder()
        .update(Product_Attributes)
        .set({
          is_activated: body2.is_activated
        })
        .where('id IN (:ids)', { ids:body1.ids })
        .execute();
    
        return `${response.affected} rows has been updated`;
      }
}
