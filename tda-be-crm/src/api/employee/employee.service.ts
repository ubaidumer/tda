import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateEmployeeDto } from 'src/dto/employee/createEmployee.dto';
import { GetAllEmployeeDto } from 'src/dto/employee/getAllEmployee.dto';
import { UpdateEmployeeDto } from 'src/dto/employee/updateEmployee.dto';
import { getManager, Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepo: Repository<Employee>,
      ) {}
      async findEmployeeList(query:PaginationDto,body:GetAllEmployeeDto) {

        const queryBuild = await this.employeeRepo
        .createQueryBuilder("employee")
        .orderBy(body.sortList)
        .skip(query.limit * query.offset)
        .take(query.limit);
    
        if (body.is_activated !== undefined)
        queryBuild.andWhere("employee.is_activated = :IsActive", {
          IsActive: body.is_activated,
        });   
        
        const Data = await queryBuild.getMany();
        const Total = await queryBuild.getCount();
        return {data:Data,total:Total};
      }
      async findEmployeeById(param:{id: number}) {
        const queryBuild = await this.employeeRepo
        .createQueryBuilder("employee")
        .where("employee.id = :id", { id: param.id })
        .getOne();
        if(queryBuild !== undefined ){
          return {data:queryBuild};
        }else{
          throw new HttpException("Employee Not Found!",HttpStatus.BAD_REQUEST);
        }
      }
      async createEmployee(body:CreateEmployeeDto) {
        const result= await this.employeeRepo.save(body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        return result; 
      }
      async updateEmployeeStatus(param:{id:number},body :{is_activated:number}) {
        const result= await this.employeeRepo.update({id:param.id},body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        if(result.affected !== 0){
    
        const queryBuild = await this.employeeRepo
        .createQueryBuilder("employee")
        .where("employee.id = :id", { id: param.id })
        .getOne();
    
        return {data:queryBuild};  
        }
        else{
         throw new HttpException("Employee Not Found!",HttpStatus.BAD_REQUEST);
        }
      }
      async updatedEmployee(param: {id:number}, body:UpdateEmployeeDto) {
        const result= await this.employeeRepo.update({id:param.id},body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        if(result.affected !== 0){
      
        const queryBuild = await this.employeeRepo
        .createQueryBuilder("employee")
        .where("employee.id = :id", { id: param.id })
        .getOne();
      
        return {data:queryBuild};  
        }
        else{
         throw new HttpException("Employee Not Found!",HttpStatus.BAD_REQUEST);
        }
      }
      async updateEmployeeBulkStatus(body1:{ids:number[]},body2 :{is_activated:number}) {
        const queryBuild =  await this.employeeRepo
        .createQueryBuilder()
        .update(Employee)
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
