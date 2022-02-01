import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateTaxDto } from 'src/dto/tax/createTax.dto';
import { UpdateTaxDto } from 'src/dto/tax/updateTax.dto';
import { getManager, Repository } from 'typeorm';
import { Tax } from './tax.entity';

@Injectable()
export class TaxService {
    constructor(
        @InjectRepository(Tax)
        private taxRepo: Repository<Tax>,
      ) {}
    async findTaxList(query:PaginationDto,body) {
      const queryBuild = await this.taxRepo
      .createQueryBuilder("tax")
      .orderBy(body.sortList)
      .skip(query.limit * query.offset)
      .take(query.limit);
  
      if (body.is_activated !== undefined)
      queryBuild.andWhere("tax.is_activated = :IsActive", {
        IsActive: body.is_activated,
      });   
      
      const Data = await queryBuild.getMany();
      const Total = await queryBuild.getCount();
      return {data:Data,total:Total};
      }
      async findTaxById(param:{id: number}) {
        const queryBuild = await this.taxRepo
        .createQueryBuilder("tax")
        .where("tax.id = :id", { id: param.id })
        .getOne();
        if(queryBuild !== undefined ){
          return {data:queryBuild};
        }else{
          throw new HttpException("Tax Not Found!",HttpStatus.BAD_REQUEST);
        }
      }
      async createTax(body:CreateTaxDto) {
        const result= await this.taxRepo.save(body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        return result; 
      }
      async updatedTax(param: {id:number}, body:UpdateTaxDto) {
        const result= await this.taxRepo.update({id:param.id},body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        if(result.affected !== 0){
      
        const queryBuild = await this.taxRepo
        .createQueryBuilder("tax")
        .where("tax.id = :id", { id: param.id })
        .getOne();
      
        return {data:queryBuild};  
        }
        else{
         throw new HttpException("Tax Not Found!",HttpStatus.BAD_REQUEST);
        }
      }
      async updateTaxStatus(param:{id:number},body :{is_activated:number}) {
        const result= await this.taxRepo.update({id:param.id},body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        if(result.affected !== 0){
    
        const queryBuild = await this.taxRepo
        .createQueryBuilder("tax")
        .where("tax.id = :id", { id: param.id })
        .getOne();
    
        return {data:queryBuild};  
        }
        else{
         throw new HttpException("Tax Not Found!",HttpStatus.BAD_REQUEST);
        }
      }
      async updateTaxBulkStatus(body1:{ids:number[]},body2 :{is_activated:number}) {
        const queryBuild =  await this.taxRepo
        .createQueryBuilder()
        .update(Tax)
        .set({
          is_activated: body2.is_activated
        })
        .where('id IN (:ids)', { ids:body1.ids })
        .execute();
      
        if(body1.ids.length !== queryBuild.affected){
          throw new HttpException(`${queryBuild.affected} rows has been updated`,HttpStatus.PARTIAL_CONTENT);
        }
        else{
        return {statusCode:HttpStatus.OK,message:`${queryBuild.affected} rows has been updated`};
        }
      }
}
