import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBicycleAttributeDetailDto } from 'src/dto/bicycleAttributeDetail/createBicycleAttributeDetail.dto';
import { GetAllBicycleAttributeDetailDto } from 'src/dto/bicycleAttributeDetail/getAllBicycleAttributeDetail.dto';
import { UpdateBicycleAttributeDetailDto } from 'src/dto/bicycleAttributeDetail/updateBicycleAttributeDetail.dto';
import { UpdateBicycleAttributeDetailActivateDto } from 'src/dto/bicycleAttributeDetail/updateBicycleAttributeDetailActivate.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { Repository } from 'typeorm';
import { BicycleAttributeDetail } from './bicycle-attribute-detail.entity';
const fs = require('fs');
@Injectable()
export class BicycleAttributeDetailService {
    constructor(
        @InjectRepository(BicycleAttributeDetail)
        private bicycleAttributeDetailRepo: Repository<BicycleAttributeDetail>
      ) {}
    private fileDirectory="/media/ubaid/ExtraSpace1/tda-crm/tda-be-bicycle/uploads/";

    async createBicycleAttributeDetail(body:CreateBicycleAttributeDetailDto,file:Express.Multer.File) {
        const b=JSON.parse(JSON.stringify(body));
        if(file){
            b.logo=file.filename;
        }
        const result= await this.bicycleAttributeDetailRepo.save(b).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        return result;        
    }
    async updatedBicycleAttributeDetail(param: {id:number}, body:UpdateBicycleAttributeDetailDto,file) {
        const b=JSON.parse(JSON.stringify(body));
        if(file){
            b.logo=file.filename;
            const getlogolink = await this.bicycleAttributeDetailRepo
            .createQueryBuilder("bicycle_attribute_detail")
            .select("bicycle_attribute_detail.logo")
            .where("bicycle_attribute_detail.id = :id", { id: param.id })
            .getOne();
            const filePath = `${this.fileDirectory}${getlogolink.logo}` 
            try {
                fs.unlinkSync(filePath)
                //file removed
              } catch(err) {
                console.error(err)
              }
        }
        const result= await this.bicycleAttributeDetailRepo.update({id:param.id},b).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        if(result.affected !== 0){
      
        const queryBuild = await this.bicycleAttributeDetailRepo
        .createQueryBuilder("bicycle_attribute_detail")
        .where("bicycle_attribute_detail.id = :id", { id: param.id })
        .getOne();
      
        return {data:queryBuild};  
        }
        else{
         throw new HttpException("Bicycle Attribute Detail Not Found!",HttpStatus.BAD_REQUEST);
        }
       }
       async findBicycleAttributeDetailList(query:PaginationDto,body:GetAllBicycleAttributeDetailDto) {
        const queryBuild = await this.bicycleAttributeDetailRepo
        .createQueryBuilder("bicycle_attribute_detail")
        .orderBy(body.sortList)
        .skip(query.limit * query.offset)
        .take(query.limit);
  
        if (body.is_activated !== undefined)
        queryBuild.andWhere("bicycle_attribute_detail.is_activated = :IsActive", {
          IsActive: body.is_activated,
        });   
        
        const Data = await queryBuild.getMany();
        const Total = await queryBuild.getCount();
        return {data:Data,total:Total};
    }
    async findBicycleAttributeDetailById(param:{id: number}) {
      const queryBuild = await this.bicycleAttributeDetailRepo
      .createQueryBuilder("bicycle_attribute_detail")
      .where("bicycle_attribute_detail.id = :id", { id: param.id })
      .getOne();
      if(queryBuild !== undefined ){
        return {data:queryBuild};
      }else{
        throw new HttpException("Bicycle AttributeDetail Not Found!",HttpStatus.BAD_REQUEST);
      }
  }
  async updatedBicycleAttributeDetailActivate(param: {id:number}, body:UpdateBicycleAttributeDetailActivateDto) {
    const result= await this.bicycleAttributeDetailRepo.update({id:param.id},body).catch(err => {
      throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
    });
    if(result.affected !== 0){

    const queryBuild = await this.bicycleAttributeDetailRepo
    .createQueryBuilder("bicycle_attribute_detail")
    .where("bicycle_attribute_detail.id = :id", { id: param.id })
    .getOne();

    return {data:queryBuild};  
    }
    else{
     throw new HttpException("Bicycle AttributeDetail Not Found!",HttpStatus.BAD_REQUEST);
    }
 }
 async updatedBulkBicycleAttributeDetailActivate(body1: {ids:number[]}, body2:UpdateBicycleAttributeDetailActivateDto) {
  const queryBuild =  await this.bicycleAttributeDetailRepo
  .createQueryBuilder()
  .update(BicycleAttributeDetail)
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
