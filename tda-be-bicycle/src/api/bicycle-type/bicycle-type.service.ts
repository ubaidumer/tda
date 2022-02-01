import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBicycleTypeDto } from 'src/dto/bicycleType/createBicycleType.dto';
import { GetAllBicycleTypeDto } from 'src/dto/bicycleType/getAllBicycleType.dto';
import { UpdateBicycleTypeDto } from 'src/dto/bicycleType/updateBicycleType.dto';
import { UpdateBicycleTypeActivateDto } from 'src/dto/bicycleType/updateBicycleTypeActivate.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { Repository } from 'typeorm';
import { BicycleType } from './bicycle-type.entity';
const fs = require('fs');

@Injectable()
export class BicycleTypeService {
    constructor(
        @InjectRepository(BicycleType)
        private bicycleTypeRepo: Repository<BicycleType>,
      ) {}
    private fileDirectory="/media/ubaid/ExtraSpace1/tda-crm/tda-be-bicycle/uploads/";

    async createBicycleType(body:CreateBicycleTypeDto,file:Express.Multer.File) {
      const b=JSON.parse(JSON.stringify(body));
      if(file){
        b.logo=file.filename;
    }
        const result= await this.bicycleTypeRepo.save(b).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        return result;        
    }
    async updatedBicycleType(param: {id:number}, body:UpdateBicycleTypeDto,file) {
      const b=JSON.parse(JSON.stringify(body));
      if(file){
          b.logo=file.filename;
          const getlogolink = await this.bicycleTypeRepo
          .createQueryBuilder("bicycle_type")
          .select("bicycle_type.logo")
          .where("bicycle_type.id = :id", { id: param.id })
          .getOne();
          const filePath = `${this.fileDirectory}${getlogolink.logo}` 
          try {
              fs.unlinkSync(filePath)
              //file removed
            } catch(err) {
              console.error(err)
            }
      }
        const result= await this.bicycleTypeRepo.update({id:param.id},body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        if(result.affected !== 0){
      
        const queryBuild = await this.bicycleTypeRepo
        .createQueryBuilder("bicycle_type")
        .where("bicycle_type.id = :id", { id: param.id })
        .getOne();
      
        return {data:queryBuild};  
        }
        else{
         throw new HttpException("Bicycle Type Not Found!",HttpStatus.BAD_REQUEST);
        }
       }
       async findBicycleTypeList(query:PaginationDto,body:GetAllBicycleTypeDto) {
        const queryBuild = await this.bicycleTypeRepo
        .createQueryBuilder("bicycle_type")
        .orderBy(body.sortList)
        .skip(query.limit * query.offset)
        .take(query.limit);
  
        if (body.is_activated !== undefined)
        queryBuild.andWhere("bicycle_type.is_activated = :IsActive", {
          IsActive: body.is_activated,
        });   
        
        const Data = await queryBuild.getMany();
        const Total = await queryBuild.getCount();
        return {data:Data,total:Total};
    }
    async findBicycleTypeById(param:{id: number}) {
      const queryBuild = await this.bicycleTypeRepo
      .createQueryBuilder("bicycle_type")
      .where("bicycle_type.id = :id", { id: param.id })
      .getOne();
      if(queryBuild !== undefined ){
        return {data:queryBuild};
      }else{
        throw new HttpException("Bicycle Type Not Found!",HttpStatus.BAD_REQUEST);
      }
  }
  async updatedBicycleTypeActivate(param: {id:number}, body:UpdateBicycleTypeActivateDto) {
    const result= await this.bicycleTypeRepo.update({id:param.id},body).catch(err => {
      throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
    });
    if(result.affected !== 0){

    const queryBuild = await this.bicycleTypeRepo
    .createQueryBuilder("bicycle_type")
    .where("bicycle_type.id = :id", { id: param.id })
    .getOne();

    return {data:queryBuild};  
    }
    else{
     throw new HttpException("Bicycle Type Not Found!",HttpStatus.BAD_REQUEST);
    }
 }
 async updatedBulkBicycleTypeActivate(body1: {ids:number[]}, body2:UpdateBicycleTypeActivateDto) {
  const queryBuild =  await this.bicycleTypeRepo
  .createQueryBuilder()
  .update(BicycleType)
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
