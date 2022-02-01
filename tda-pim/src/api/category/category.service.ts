import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/dto/category/createCategory.dto';
import { UpdateCategoryDto } from 'src/dto/category/updateCategory.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { getManager, Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepo: Repository<Category>,
      ) {}
      async findCategoryList(query:PaginationDto) {
        const data = await this.categoryRepo.query(
          `
                call tda.category_list(${query.limit}, ${query.offset}, @total, @result);
                `,
        );
        console.log(data[0][0]);
        return data[0][0];
      }
      async findCategoryById(param:{id: number}) {
        const data = await this.categoryRepo.query(
          `
                call tda.category_get(${param.id ? param.id : 1}, @result);
                `,
        );
        console.log(data[0][0]);
        return data[0][0];
      }
      async createCategory(body:CreateCategoryDto) {
        if(!body.parent_id){
          body.parent_id=0;
        }
        const data = await this.categoryRepo.query(
          "call tda.category_create('" +
            body.name +
            "','" +
            (body.is_master?body.is_master:0) +
            "','" +
            (body.parent_id?body.parent_id:0) +
            "','" +
            (body.created_by?body.created_by:null) +
            "',1,@query_status); ",
        ).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
          return 'category created successfully';
        } else {
          return 'category creation unsuccessfull';
        }
      }
      async updateCategoryStatus(param:{id:number},body :{is_activated:number}) {
        const data = await this.categoryRepo.query(
          `
                call tda.category_toggle_status(${param.id},${body.is_activated},@query_status);
                `,
        );
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
          return 'category status updated successfully';
        } else {
          return 'category status updation unsuccessfull';
        }
      }
      async updatedCategory(param: {id:number}, body:UpdateCategoryDto) {
        const data = await this.categoryRepo.query(
          "call tda.category_update('" +
            param.id +
            "','" +
            body.name +
            "','" +
            body.is_master +
            "','" +
            body.parent_id +
            "','" +
            body.updated_by +
            "','" +
            body.is_activated +
            "',@query_status); ",
        ).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
          return 'category updated successfully';
        } else {
          return 'category updation unsuccessfull';
        }
      }
      async updateCategoryBulkStatus(body1:{ids:number[]},body2 :{is_activated:number}) {
        console.log('ids:',body1.ids,'is_activated:',body2.is_activated);
      const response =  await getManager()
        .createQueryBuilder()
        .update(Category)
        .set({
          is_activated: body2.is_activated
        })
        .where('id IN (:ids)', { ids:body1.ids })
        .execute();
    
        return `${response.affected} rows has been updated`;
      }
}
