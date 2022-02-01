import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateServicesDto } from 'src/dto/services/createServices.dto';
import { GetAllServicesDto } from 'src/dto/services/getAllServices.dto';
import { UpdateServicesDto } from 'src/dto/services/updateServices.dto';
import { UpdateServicesActivateDto } from 'src/dto/services/updateServicesActivate.dto';
import { Repository } from 'typeorm';
import { Services } from './services.entity';

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Services)
        private servicesRepo: Repository<Services>,
      ) {}
    async createServices(body:CreateServicesDto) {
        const result= await this.servicesRepo.save(body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        return result;        
    }
    async findServicesList(query:PaginationDto,body:GetAllServicesDto) {
      console.log(query,body);
      const queryBuild = await this.servicesRepo
      .createQueryBuilder("services")
      .orderBy(body.sortList)
      .skip(query.limit * query.offset)
      .take(query.limit);

      if (body.is_activated !== undefined)
      queryBuild.andWhere("services.is_activated = :IsActive", {
        IsActive: body.is_activated,
      });
      const Data = await queryBuild.getMany();
      const Total = await queryBuild.getCount();
      return {data:Data,total:Total};
  }
  async findServicesById(param:{id: number}) {
    const queryBuild = await this.servicesRepo
    .createQueryBuilder("services")
    .where("services.id = :id", { id: param.id })
    .getOne();
    if(queryBuild !== undefined ){
      return {data:queryBuild};
    }else{
      throw new HttpException("Services Not Found!",HttpStatus.BAD_REQUEST);
    }
  }
  async updatedServicesActivate(param: {id:number}, body:UpdateServicesActivateDto) {
    const result= await this.servicesRepo.update({id:param.id},body).catch(err => {
      throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
    });
    if(result.affected !== 0){

    const queryBuild = await this.servicesRepo
    .createQueryBuilder("services")
    .where("services.id = :id", { id: param.id })
    .getOne();

    return {data:queryBuild};  
    }
    else{
     throw new HttpException("Services Not Found!",HttpStatus.BAD_REQUEST);
    }
 }
 async updatedBulkServicesActivate(body1: {ids:number[]}, body2:UpdateServicesActivateDto) {
  const queryBuild =  await this.servicesRepo
  .createQueryBuilder()
  .update(Services)
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
async updatedServices(param: {id:number}, body:UpdateServicesDto) {
  const result= await this.servicesRepo.update({id:param.id},body).catch(err => {
    throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
  });
  if(result.affected !== 0){

  const queryBuild = await this.servicesRepo
  .createQueryBuilder("services")
  .where("services.id = :id", { id: param.id })
  .getOne();

  return {data:queryBuild};  
  }
  else{
   throw new HttpException("Services Not Found!",HttpStatus.BAD_REQUEST);
  }
 }
}
