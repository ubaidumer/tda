import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from 'src/dto/client/createClient.dto';
import { GetAllClientDto } from 'src/dto/client/getAllClient.dto';
import { UpdateClientDto } from 'src/dto/client/updateClient.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { getManager, Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private clientRepo: Repository<Client>,
      ) {}
      async findClientList(query:PaginationDto,body:GetAllClientDto) {
        const queryBuild = await this.clientRepo
        .createQueryBuilder("client")
        .orderBy(body.sortList)
        .skip(query.limit * query.offset)
        .take(query.limit);
    
        if (body.is_activated !== undefined)
        queryBuild.andWhere("client.is_activated = :IsActive", {
          IsActive: body.is_activated,
        });   
        
        const Data = await queryBuild.getMany();
        const Total = await queryBuild.getCount();
        return {data:Data,total:Total};
      }
      async findClientById(param:{id: number}) {
        // const queryBuild = await this.clientRepo
        // .createQueryBuilder("client")
        // .where("client.id = :id", { id: param.id })
        // .getOne();
        // if(queryBuild !== undefined ){
        //   return {data:queryBuild};
        // }else{
        //   throw new HttpException("Client Not Found!",HttpStatus.BAD_REQUEST);
        // }

          if(param==0){
              return 1*(param+1);
          }else{
              x(param-1);
          
      }
      }
      async createClient(body:CreateClientDto) {
        const result= await this.clientRepo.save(body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        return result; 
      }
      async updateClientStatus(param:{id:number},body :{is_activated:number}) {
        const result= await this.clientRepo.update({id:param.id},body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        if(result.affected !== 0){
    
        const queryBuild = await this.clientRepo
        .createQueryBuilder("client")
        .where("client.id = :id", { id: param.id })
        .getOne();
    
        return {data:queryBuild};  
        }
        else{
         throw new HttpException("Client Not Found!",HttpStatus.BAD_REQUEST);
        }
      }
      async updateClientBulkStatus(body1:{ids:number[]},body2 :{is_activated:number}) {
        const queryBuild =  await this.clientRepo
        .createQueryBuilder()
        .update(Client)
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
      async updatedClient(param: {id:number}, body:UpdateClientDto) {
        const result= await this.clientRepo.update({id:param.id},body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        if(result.affected !== 0){
      
        const queryBuild = await this.clientRepo
        .createQueryBuilder("client")
        .where("client.id = :id", { id: param.id })
        .getOne();
      
        return {data:queryBuild};  
        }
        else{
         throw new HttpException("Client Not Found!",HttpStatus.BAD_REQUEST);
        }
      }
}
