import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCatalogDto } from 'src/dto/catalog/updateCatalog.dto';
import { CreateCatalogDto } from 'src/dto/catalog/createCatalog.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { getManager, Repository } from 'typeorm';
import { Catalog } from './catalog.entity';

@Injectable()
export class CatalogService {
    constructor(
        @InjectRepository(Catalog)
        private catalogRepo: Repository<Catalog>,
      ) {}
      async findCatalogList(query:PaginationDto) {
        const data = await this.catalogRepo.query(
          `
                call tda.catalog_list(${query.limit}, ${query.offset}, @total, @result);
                `,
        );
        console.log(data[0][0]);
        return data[0][0];
      }
      async findCatalogById(param:{id: number}) {
        const data = await this.catalogRepo.query(
          `
                call tda.catalog_get(${param.id ? param.id : 1}, @result);
                `,
        );
        console.log(data[0][0]);
        return data[0][0];
      }
      async createCatalog(body:CreateCatalogDto) {
        const data = await this.catalogRepo.query(
          "call tda.catalog_create('" +
            body.name +
            "','" +
            (body.is_master?body.is_master:0) +
            "','" +
            (body.parent_id?body.parent_id:0) +
            "','" +
            (body.tag_ids?body.tag_ids:null) +
            "','" +
            (body.created_by?body.created_by:null) +
            "',1,@query_status); ",
        ).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
          return 'catalog created successfully';
        } else {
          return 'catalog creation unsuccessfull';
        }
      }
      async updateCatalogStatus(param:{id:number},body :{is_activated:number}) {
        const data = await this.catalogRepo.query(
          `
                call tda.catalog_toggle_status(${param.id},${body.is_activated},@query_status);
                `,
        );
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
          return 'catalog status updated successfully';
        } else {
          return 'catalog status updation unsuccessfull';
        }
      }
      async updatedCatalog(param: {id:number}, body:UpdateCatalogDto) {
        const data = await this.catalogRepo.query(
          "call tda.catalog_update('" +
            param.id +
            "','" +
            body.name +
            "','" +
            body.is_master +
            "','" +
            body.parent_id +
            "','" +
            body.tag_ids +
            "','" +
            body.updated_by +
            "','" +
            body.is_activated +
            "',@query_status); ",
        ).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });;
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
          return 'catalog updated successfully';
        } else {
          return 'catalog updation unsuccessfull';
        }
      }
      async updateCatalogBulkStatus(body1:{ids:number[]},body2 :{is_activated:number}) {
        console.log('ids:',body1.ids,'is_activated:',body2.is_activated);
      const response =  await getManager()
        .createQueryBuilder()
        .update(Catalog)
        .set({
          is_activated: body2.is_activated
        })
        .where('id IN (:ids)', { ids:body1.ids })
        .execute();
    
        return `${response.affected} rows has been updated`;
      }
}
