import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateOrgtypeDto } from 'src/dto/orgtype/createOrgtype.dto';
import { GetAllOrgTypeDto } from 'src/dto/orgtype/getAllOrgtypedto';
import { UpdateOrgtypeDto } from 'src/dto/orgtype/updateOrgtype.dto';
import { getManager, Repository } from 'typeorm';
import { Orgtype } from './orgtype.entity';

@Injectable()
export class OrgtypeService {
    constructor(
        @InjectRepository(Orgtype)
        private orgtypeRepo: Repository<Orgtype>,
      ) {}
      async findOrgtypeList(query:PaginationDto,body:GetAllOrgTypeDto) {
        const queryBuild = await this.orgtypeRepo
        .createQueryBuilder("orgtype")
        .orderBy(body.sortList)
        .skip(query.limit * query.offset)
        .take(query.limit);
    
        if (body.is_activated !== undefined)
        queryBuild.andWhere("orgtype.is_activated = :IsActive", {
          IsActive: body.is_activated,
        });   
        
        const Data = await queryBuild.getMany();
        const Total = await queryBuild.getCount();
        return {data:Data,total:Total};
      }
      async findOrgtypeById(param:{id: number}) {
        const queryBuild = await this.orgtypeRepo
        .createQueryBuilder("orgtype")
        .where("orgtype.id = :id", { id: param.id })
        .getOne();
        if(queryBuild !== undefined ){
          return {data:queryBuild};
        }else{
          throw new HttpException("Org Type Not Found!",HttpStatus.BAD_REQUEST);
        }
      }
      async createOrgtype(body:CreateOrgtypeDto) {
        const result= await this.orgtypeRepo.save(body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        return result;       
      }
      async updateOrgTypeStatus(param:{id:number},body :{is_activated:number}) {
        const result= await this.orgtypeRepo.update({id:param.id},body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        if(result.affected !== 0){
    
        const queryBuild = await this.orgtypeRepo
        .createQueryBuilder("orgtype")
        .where("orgtype.id = :id", { id: param.id })
        .getOne();
    
        return {data:queryBuild};  
        }
        else{
         throw new HttpException("Org Type Not Found!",HttpStatus.BAD_REQUEST);
        }
      }
      async updatedOrgtype(param: {id:number}, body:UpdateOrgtypeDto) {
        const result= await this.orgtypeRepo.update({id:param.id},body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        if(result.affected !== 0){
      
        const queryBuild = await this.orgtypeRepo
        .createQueryBuilder("orgtype")
        .where("orgtype.id = :id", { id: param.id })
        .getOne();
      
        return {data:queryBuild};  
        }
        else{
         throw new HttpException("Org Type Not Found!",HttpStatus.BAD_REQUEST);
        }
      }
      async updateOrgtypeBulkStatus(body1:{ids:number[]},body2 :{is_activated:number}) {
        const queryBuild =  await this.orgtypeRepo
        .createQueryBuilder()
        .update(Orgtype)
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
