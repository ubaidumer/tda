import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBicycleFrameDto } from 'src/dto/bicycleFrame/createBicycleFrame.dto';
import { GetAllBicycleFrameDto } from 'src/dto/bicycleFrame/getAllBicycleFrame.dto';
import { UpdateBicycleFrameDto } from 'src/dto/bicycleFrame/updateBicycleFrame.dto';
import { UpdateBicycleFrameActivateDto } from 'src/dto/bicycleFrame/updateBicycleFrameActivate.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { Repository } from 'typeorm';
import { BicycleFrame } from './bicycle-frame.entity';
const fs = require('fs');

@Injectable()
export class BicycleFrameService {
    constructor(
        @InjectRepository(BicycleFrame)
        private bicycleFrameRepo: Repository<BicycleFrame>,
      ) {}
    private fileDirectory="/media/ubaid/ExtraSpace1/tda-crm/tda-be-bicycle/uploads/";

    async createBicycleFrame(body:CreateBicycleFrameDto,file:Express.Multer.File) {
      const b=JSON.parse(JSON.stringify(body));
      if(file){
        b.logo=file.filename;
    }
        const result= await this.bicycleFrameRepo.save(b).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        return result;        
    }
    async findBicycleFrameById(param:{id: number}) {
        const queryBuild = await this.bicycleFrameRepo
        .createQueryBuilder("bicycle_frame")
        .where("bicycle_frame.id = :id", { id: param.id })
        .getOne();
        if(queryBuild !== undefined ){
          return {data:queryBuild};
        }else{
          throw new HttpException("Bicycle frame Not Found!",HttpStatus.BAD_REQUEST);
        }
    }
    async findBicycleFrameList(query:PaginationDto,body:GetAllBicycleFrameDto) {
      const queryBuild = await this.bicycleFrameRepo
      .createQueryBuilder("bicycle_frame")
      .orderBy(body.sortList)
      .skip(query.limit * query.offset)
      .take(query.limit);

      if (body.is_activated !== undefined)
      queryBuild.andWhere("bicycle_frame.is_activated = :IsActive", {
        IsActive: body.is_activated,
      });   
      
      const Data = await queryBuild.getMany();
      const Total = await queryBuild.getCount();
      return {data:Data,total:Total};
  }
  async updatedBicycleFrameActivate(param: {id:number}, body:UpdateBicycleFrameActivateDto) {
    const result= await this.bicycleFrameRepo.update({id:param.id},body).catch(err => {
      throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
    });
    if(result.affected !== 0){

    const queryBuild = await this.bicycleFrameRepo
    .createQueryBuilder("bicycle_frame")
    .where("bicycle_frame.id = :id", { id: param.id })
    .getOne();

    return {data:queryBuild};  
    }
    else{
     throw new HttpException("Bicycle Frame Not Found!",HttpStatus.BAD_REQUEST);
    }
 }
 async updatedBulkBicycleFrameActivate(body1: {ids:number[]}, body2:UpdateBicycleFrameActivateDto) {
  const queryBuild =  await this.bicycleFrameRepo
  .createQueryBuilder()
  .update(BicycleFrame)
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
async updatedBicycleFrame(param: {id:number}, body:UpdateBicycleFrameDto,file) {
  const b=JSON.parse(JSON.stringify(body));
  if(file){
      b.logo=file.filename;
      const getlogolink = await this.bicycleFrameRepo
      .createQueryBuilder("bicycle_frame")
      .select("bicycle_frame.logo")
      .where("bicycle_frame.id = :id", { id: param.id })
      .getOne();
      const filePath = `${this.fileDirectory}${getlogolink.logo}` 
      try {
          fs.unlinkSync(filePath)
          //file removed
        } catch(err) {
          console.error(err)
        }
  }
  const result= await this.bicycleFrameRepo.update({id:param.id},body).catch(err => {
    throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
  });
  if(result.affected !== 0){

  const queryBuild = await this.bicycleFrameRepo
  .createQueryBuilder("bicycle_frame")
  .where("bicycle_frame.id = :id", { id: param.id })
  .getOne();

  return {data:queryBuild};  
  }
  else{
   throw new HttpException("Bicycle Frame Not Found!",HttpStatus.BAD_REQUEST);
  }
 }
}
