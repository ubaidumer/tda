import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBicycleAttributeDto } from 'src/dto/bicycleAttribute/createBicycleAttribute.dto';
import { GetAllBicycleAttributeDto } from 'src/dto/bicycleAttribute/getAllBicycleAttribute.dto';
import { UpdateBicycleAttributeDto } from 'src/dto/bicycleAttribute/updateBicycleAttribute.dto';
import { UpdateBicycleAttributeActivateDto } from 'src/dto/bicycleAttribute/updateBicycleAttributeActivate.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { Repository } from 'typeorm';
import { BicycleAttribute } from './bicycle-attribute.entity';

@Injectable()
export class BicycleAttributeService {
    constructor(
        @InjectRepository(BicycleAttribute)
        private bicycleAttributeRepo: Repository<BicycleAttribute>,
      ) {}
    async createBicycleAttribute(body:CreateBicycleAttributeDto) {
        const result= await this.bicycleAttributeRepo.save(body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        return result;        
    }
    async findBicycleAttributeById(param:{id: number}) {
        const queryBuild = await this.bicycleAttributeRepo
        .createQueryBuilder("bicycle_attribute")
        .where("bicycle_attribute.id = :id", { id: param.id })
        .getOne();
        if(queryBuild !== undefined ){
          return {data:queryBuild};
        }else{
          throw new HttpException("Bicycle Attribute Not Found!",HttpStatus.BAD_REQUEST);
        }
    }
    async findBicycleAttributeList(query:PaginationDto,body:GetAllBicycleAttributeDto) {
        const queryBuild = await this.bicycleAttributeRepo
        .createQueryBuilder("bicycle_attribute")
        .orderBy(body.sortList)
        .skip(query.limit * query.offset)
        .take(query.limit);
  
        if (body.is_activated !== undefined)
        queryBuild.andWhere("bicycle_attribute.is_activated = :IsActive", {
          IsActive: body.is_activated,
        });   
        
        const Data = await queryBuild.getMany();
        const Total = await queryBuild.getCount();
        return {data:Data,total:Total};
    }
    async updatedBicycleAttributeActivate(param: {id:number}, body:UpdateBicycleAttributeActivateDto) {
        const result= await this.bicycleAttributeRepo.update({id:param.id},body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        if(result.affected !== 0){
    
        const queryBuild = await this.bicycleAttributeRepo
        .createQueryBuilder("bicycle_attribute")
        .where("bicycle_attribute.id = :id", { id: param.id })
        .getOne();
    
        return {data:queryBuild};  
        }
        else{
         throw new HttpException("Bicycle Attribute Not Found!",HttpStatus.BAD_REQUEST);
        }
     }
     async updatedBulkBicycleAttributeActivate(body1: {ids:number[]}, body2:UpdateBicycleAttributeActivateDto) {
      const queryBuild =  await this.bicycleAttributeRepo
      .createQueryBuilder()
      .update(BicycleAttribute)
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
    async updatedBicycleAttribute(param: {id:number}, body:UpdateBicycleAttributeDto) {
        const result= await this.bicycleAttributeRepo.update({id:param.id},body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        if(result.affected !== 0){
      
        const queryBuild = await this.bicycleAttributeRepo
        .createQueryBuilder("bicycle_attribute")
        .where("bicycle_attribute.id = :id", { id: param.id })
        .getOne();
      
        return {data:queryBuild};  
        }
        else{
         throw new HttpException("Bicycle Attribute Not Found!",HttpStatus.BAD_REQUEST);
        }
       }
}
