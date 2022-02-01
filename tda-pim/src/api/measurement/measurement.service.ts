import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateMeasurementDto } from 'src/dto/measurement/createMeasurement.dto';
import { GetAllMeasurementDto } from 'src/dto/measurement/getAllMeasurement.dto';
import { UpdateMeasurementDto } from 'src/dto/measurement/updateMeasurement.dto';
import { getManager, Repository } from 'typeorm';
import { Measurement } from './measurement.entity';

@Injectable()
export class MeasurementService {
    constructor(
        @InjectRepository(Measurement)
        private measurementRepo: Repository<Measurement>,
      ) {}
      async findMeasurementList(query:PaginationDto,body:GetAllMeasurementDto) {
        const queryBuild = await this.measurementRepo
        .createQueryBuilder("measurement")
        .orderBy(body.sortList)
        .skip(query.limit * query.offset)
        .take(query.limit);
    
        if (body.is_activated !== undefined)
        queryBuild.andWhere("measurement.is_activated = :IsActive", {
          IsActive: body.is_activated,
        });   
        
        const Data = await queryBuild.getMany();
        const Total = await queryBuild.getCount();
        return {data:Data,total:Total};
      }
      async findMeasurementById(param:{id: number}) {
        const queryBuild = await this.measurementRepo
        .createQueryBuilder("measurement")
        .where("measurement.id = :id", { id: param.id })
        .getOne();
        if(queryBuild !== undefined ){
          return {data:queryBuild};
        }else{
          throw new HttpException("Measurement Not Found!",HttpStatus.BAD_REQUEST);
        }
      }
      async createMeasurement(body:CreateMeasurementDto) {
        const result= await this.measurementRepo.save(body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        return result; 
    }
    async updatedMeasurement(param: {id:number}, body:UpdateMeasurementDto) {
      const result= await this.measurementRepo.update({id:param.id},body).catch(err => {
        throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
      });
      if(result.affected !== 0){
    
      const queryBuild = await this.measurementRepo
      .createQueryBuilder("measurement")
      .where("measurement.id = :id", { id: param.id })
      .getOne();
    
      return {data:queryBuild};  
      }
      else{
       throw new HttpException("Measurement Not Found!",HttpStatus.BAD_REQUEST);
      }
      }
      async updateMeasurementStatus(param:{id:number},body :{is_activated:number}) {
        const result= await this.measurementRepo.update({id:param.id},body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        if(result.affected !== 0){
    
        const queryBuild = await this.measurementRepo
        .createQueryBuilder("measurement")
        .where("measurement.id = :id", { id: param.id })
        .getOne();
    
        return {data:queryBuild};  
        }
        else{
         throw new HttpException("Measurement Not Found!",HttpStatus.BAD_REQUEST);
        }
      }
      async updateMeasurementBulkStatus(body1:{ids:number[]},body2 :{is_activated:number}) {
        const queryBuild =  await this.measurementRepo
        .createQueryBuilder()
        .update(Measurement)
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
