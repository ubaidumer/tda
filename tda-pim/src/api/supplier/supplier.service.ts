import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateSupplierDto } from 'src/dto/supplier/createSupplier.dto';
import { GetAllSupplierDto } from 'src/dto/supplier/getAllSupplier.dto';
import { UpdateSupplierDto } from 'src/dto/supplier/updateSupplier.dto';
import { getManager, Repository } from 'typeorm';
import { Supplier } from './supplier.entity';

@Injectable()
export class SupplierService {
    constructor(
        @InjectRepository(Supplier)
        private supplierRepo: Repository<Supplier>,
      ) {}


      async findSupplierList(query:PaginationDto,body:GetAllSupplierDto) {
        const queryBuild = await this.supplierRepo
        .createQueryBuilder("supplier")
        .orderBy(body.sortList)
        .skip(query.limit * query.offset)
        .take(query.limit);
    
        if (body.is_activated !== undefined)
        queryBuild.andWhere("supplier.is_activated = :IsActive", {
          IsActive: body.is_activated,
        });   
        
        const Data = await queryBuild.getMany();
        const Total = await queryBuild.getCount();
        return {data:Data,total:Total};
      }


      async findSupplierById(param:{id: number}) {
        const queryBuild = await this.supplierRepo
        .createQueryBuilder("supplier")
        .where("supplier.id = :id", { id: param.id })
        .getOne();
        if(queryBuild !== undefined ){
          return {data:queryBuild};
        }else{
          throw new HttpException("Supplier Not Found!",HttpStatus.BAD_REQUEST);
        }
      }


      async createSupplier(body:CreateSupplierDto) {
        const result= await this.supplierRepo.save(body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        return result; 
    }


    async updatedSupplier(param: {id:number}, body:UpdateSupplierDto) {
      const result= await this.supplierRepo.update({id:param.id},body).catch(err => {
        throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
      });
      if(result.affected !== 0){
    
      const queryBuild = await this.supplierRepo
      .createQueryBuilder("supplier")
      .where("supplier.id = :id", { id: param.id })
      .getOne();
    
      return {data:queryBuild};  
      }
      else{
       throw new HttpException("Supplier Not Found!",HttpStatus.BAD_REQUEST);
      }
      }


      async updateSupplierStatus(param:{id:number},body :{is_activated:number}) {
        const result= await this.supplierRepo.update({id:param.id},body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        if(result.affected !== 0){
    
        const queryBuild = await this.supplierRepo
        .createQueryBuilder("supplier")
        .where("supplier.id = :id", { id: param.id })
        .getOne();
    
        return {data:queryBuild};  
        }
        else{
         throw new HttpException("Supplier Not Found!",HttpStatus.BAD_REQUEST);
        }
      }  

      
      async updateSupplierBulkStatus(body1:{ids:number[]},body2 :{is_activated:number}) {
        const queryBuild =  await this.supplierRepo
        .createQueryBuilder()
        .update(Supplier)
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
