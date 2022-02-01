import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateStockDto } from 'src/dto/stock/createStock.dto';
import { UpdateStockDto } from 'src/dto/stock/updateStock.dto';
import { getManager, Repository } from 'typeorm';
import { Stock } from './stock.entity';

@Injectable()
export class StockService {
    constructor(
        @InjectRepository(Stock)
        private stockRepo: Repository<Stock>,
      ) {}
      async findStockList(query:PaginationDto) {
        const data = await this.stockRepo.query(
          `
                call tda.stock_list(${query.limit}, ${query.offset}, @total, @result);
                `,
        );
        console.log(data[0][0]);
        return data[0][0];
      }
      async findStockById(param:{id: number}) {
        const data = await this.stockRepo.query(
          `
                call tda.stock_get(${param.id ? param.id : 1}, @result);
                `,
        );
        console.log(data[0][0]);
        return data[0][0];
      }
      async createStock(body:CreateStockDto) {
        const data = await this.stockRepo.query(
          "call tda.stock_create(" +
            (body.product_id?body.product_id:null) +
            "," +
            body.price_per_unit +
            "," +
            body.total_products +
            "," +
            (body.location_id?body.location_id:null) +
            "," +
            (body.supplier_id?body.supplier_id:null) +
            ",'" +
            (body.delivery_date?body.delivery_date:null) +
            "','" +
            (body.created_by?body.created_by:null) +
            "',1,@query_status); ",
        ).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
          return 'stock created successfully';
        } else {
          return 'stock creation unsuccessfull';
        }
      }
      async updateStockStatus(param:{id:number},body :{is_activated:number}) {
        const data = await this.stockRepo.query(
          `
                call tda.stock_toggle_status(${param.id},${body.is_activated},@query_status);
                `,
        );
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
          return 'stock status updated successfully';
        } else {
          return 'stock status updation unsuccessfull';
        }
      }
      async updateStock(param: {id:number}, body:UpdateStockDto) {
        const data = await this.stockRepo.query(
          "call tda.stock_update(" +
            param.id +
            "," +
            (body.product_id?body.product_id:null) +
            "," +
            body.price_per_unit +
            "," +
            body.total_products +
            "," +
            (body.location_id?body.location_id:null) +
            "," +
            (body.supplier_id?body.supplier_id:null) +
            ",'" +
            (body.delivery_date?body.delivery_date:null) +
            "','" +
            body.updated_by +
            "','" +
            body.is_activated +
            "',@query_status); ",
        ).catch(err => {
          throw new HttpException(err,HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
          return 'stock updated successfully';
        } else {
          return 'stock updation unsuccessfull';
        }
      }
      async updateStockBulkStatus(body1:{ids:number[]},body2 :{is_activated:number}) {
        console.log('ids:',body1.ids,'is_activated:',body2.is_activated);
      const response =  await getManager()
        .createQueryBuilder()
        .update(Stock)
        .set({
          is_activated: body2.is_activated
        })
        .where('id IN (:ids)', { ids:body1.ids })
        .execute();
    
        return `${response.affected} rows has been updated`;
      }
}
