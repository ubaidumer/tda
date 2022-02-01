import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateOrgDto } from 'src/dto/org/createOrg.dto';
import { GetAllOrgDto } from 'src/dto/org/getAllOrgdto';
import { UpdateOrgDto } from 'src/dto/org/updateOrg.dto';
import { getManager, Repository } from 'typeorm';
import { Org } from './org.entity';

@Injectable()
export class OrgService {
    constructor(
        @InjectRepository(Org)
        private orgRepo: Repository<Org>,
      ) {}
      async findOrgList(query:PaginationDto,body:GetAllOrgDto) {
        const queryBuild = await this.orgRepo
        .createQueryBuilder("org")
        .orderBy(body.sortList)
        .skip(query.limit * query.offset)
        .take(query.limit);
    
        if (body.is_activated !== undefined)
        queryBuild.andWhere("org.is_activated = :IsActive", {
          IsActive: body.is_activated,
        });   
        
        const Data = await queryBuild.getMany();
        const Total = await queryBuild.getCount();
        return {data:Data,total:Total};
      }
      async findOrgById(param:{id: number}) {
        const queryBuild = await this.orgRepo
        .createQueryBuilder("org")
        .where("org.id = :id", { id: param.id })
        .getOne();
        if(queryBuild !== undefined ){
          return {data:queryBuild};
        }else{
          throw new HttpException("Org Not Found!",HttpStatus.BAD_REQUEST);
        }
      }
      async createOrg(body:CreateOrgDto) {
        const result= await this.orgRepo.save(body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        return result; 
      }
      async updateOrgStatus(param:{id:number},body :{is_activated:number}) {
        const result= await this.orgRepo.update({id:param.id},body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        if(result.affected !== 0){
    
        const queryBuild = await this.orgRepo
        .createQueryBuilder("org")
        .where("org.id = :id", { id: param.id })
        .getOne();
    
        return {data:queryBuild};  
        }
        else{
         throw new HttpException("Org Not Found!",HttpStatus.BAD_REQUEST);
        }
      }
      async updatedOrg(param: {id:number}, body:UpdateOrgDto) {
        const result= await this.orgRepo.update({id:param.id},body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        if(result.affected !== 0){
      
        const queryBuild = await this.orgRepo
        .createQueryBuilder("org")
        .where("org.id = :id", { id: param.id })
        .getOne();
      
        return {data:queryBuild};  
        }
        else{
         throw new HttpException("Org Not Found!",HttpStatus.BAD_REQUEST);
        }
      }
      async updateOrgBulkStatus(body1:{ids:number[]},body2 :{is_activated:number}) {
        const queryBuild =  await this.orgRepo
        .createQueryBuilder()
        .update(Org)
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
