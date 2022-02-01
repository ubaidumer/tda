import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateProductDto } from 'src/dto/product/createProduct.dto';
import { UpdateProductDto } from 'src/dto/product/updateProduct.dto';
import { getManager, Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepo: Repository<Product>,
      ) {}
      async findProductList(query:PaginationDto) {
        const data = await this.productRepo.query(
          `
                call tda.product_list(${query.limit}, ${query.offset}, @total, @result);
                `,
        );
        console.log(data[0][0]);
        return data[0][0];
      }
      async findProductById(param:{id: number}) {
        const data = await this.productRepo.query(
          `
                call tda.product_get(${param.id ? param.id : 1}, @result);
                `,
        );
        console.log(data[0][0]);
        return data[0][0];
      }
      async createProduct(body:CreateProductDto) {
        const data = await this.productRepo.query(
          "call tda.product_create(" +
            (body.supplier_id?body.supplier_id:null) +
            "," +
            (body.catalog_id?body.catalog_id:null) +
            "," +
            (body.product_category_id?body.product_category_id:null) +
            ",'" +
            body.title +
            "','" +
            (body.description?body.description:null) +
            "','" +
            (body.description_short?body.description_short:null) +
            "'," +
            body.price +
            "," +
            body.price_sale +
            "," +
            (body.is_shippable?body.is_shippable:0) +
            ",'" +
            body.type +
            "','" +
            (body.tag_ids?body.tag_ids:null) +
            "'," +
            (body.is_taxed?body.is_taxed:0) +
            "," +
            (body.tax_class_id?body.tax_class_id:null) +
            "," +
            (body.minimum_order?body.minimum_order:0) +
            "," +
            (body.weight?body.weight:0) +
            "," +
            (body.size_height?body.size_height:0) +
            "," +
            (body.size_width?body.size_width:0) +
            "," +
            (body.size_length?body.size_length:0) +
            ",'" +
            (body.up_sell?body.up_sell:null) +
            "','" +
            (body.cross_sell?body.cross_sell:null) +
            "','" +
            (body.ean?body.ean:null) +
            "','" +
            (body.sku?body.sku:null) +
            "'," +
            (body.back_order?body.back_order:0) +
            "," +
            (body.min_stock?body.min_stock:0) +
            ",'" +
            (body.created_by?body.created_by:null) +
            "',1,@query_status); ",
        ).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
          return 'product created successfully';
        } else {
          return 'product creation unsuccessfull';
        }
    }
    async updatedProduct(param: {id:number}, body:UpdateProductDto) {
      const data = await this.productRepo.query(
        "call tda.product_update('" +
          param.id +
          "'," +
          (body.supplier_id?body.supplier_id:null) +
          "," +
          (body.catalog_id?body.catalog_id:null) +
          "," +
          (body.product_category_id?body.product_category_id:null) +
          ",'" +
          body.title +
          "','" +
          (body.description?body.description:null) +
          "','" +
          (body.description_short?body.description_short:null) +
          "'," +
          body.price +
          "," +
          body.price_sale +
          "," +
          (body.is_shippable?body.is_shippable:0) +
          ",'" +
          body.type +
          "','" +
          (body.tag_ids?body.tag_ids:null) +
          "'," +
          (body.is_taxed?body.is_taxed:0) +
          "," +
          (body.tax_class_id?body.tax_class_id:null) +
          "," +
          (body.minimum_order?body.minimum_order:0) +
          "," +
          (body.weight?body.weight:0) +
          "," +
          (body.size_height?body.size_height:0) +
          "," +
          (body.size_width?body.size_width:0) +
          "," +
          (body.size_length?body.size_length:0) +
          ",'" +
          (body.up_sell?body.up_sell:null) +
          "','" +
          (body.cross_sell?body.cross_sell:null) +
          "','" +
          (body.ean?body.ean:null) +
          "','" +
          (body.sku?body.sku:null) +
          "'," +
          (body.back_order?body.back_order:0) +
          "," +
          (body.min_stock?body.min_stock:0) +
          ",'" +
          body.updated_by +
          "','" +
          body.is_activated +
          "',@query_status); ",
      ).catch(err => {
        throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
      });
      console.log(data[0][0]);
      if (data[0][0].query_status == 1) {
        return 'product updated successfully';
      } else {
        return 'product updation unsuccessfull';
      }
    }
    async updateProductStatus(param:{id:number},body :{is_activated:number}) {
      const data = await this.productRepo.query(
        `
              call tda.product_toggle_status(${param.id},${body.is_activated},@query_status);
              `,
      );
      console.log(data[0][0]);
      if (data[0][0].query_status == 1) {
        return 'product status updated successfully';
      } else {
        return 'product status updation unsuccessfull';
      }
    }
    async updateProductBulkStatus(body1:{ids:number[]},body2 :{is_activated:number}) {
      console.log('ids:',body1.ids,'is_activated:',body2.is_activated);
    const response =  await getManager()
      .createQueryBuilder()
      .update(Product)
      .set({
        is_activated: body2.is_activated
      })
      .where('id IN (:ids)', { ids:body1.ids })
      .execute();
  
      return `${response.affected} rows has been updated`;
    }
}
