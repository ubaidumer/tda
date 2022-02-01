import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateUserDto } from 'src/dto/user/createUser.dto';
import { GetAllUserDto } from 'src/dto/user/getAllUser.dto';
import { UpdateUserDto } from 'src/dto/user/updateUser.dto';
import { UpdateUserActivateDto } from 'src/dto/user/updateUserActivate.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
      ) {}
    async createUser(body:CreateUserDto) {
        const result= await this.userRepo.save(body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        return result;        
    }
    async findUserList(query:PaginationDto,body:GetAllUserDto) {
      console.log(query,body);
      const queryBuild = await this.userRepo
      .createQueryBuilder("user")
      .orderBy(body.sortList)
      .skip(query.limit * query.offset)
      .take(query.limit);

      if (body.is_activated !== undefined)
      queryBuild.andWhere("user.is_activated = :IsActive", {
        IsActive: body.is_activated,
      });
      if (body.user_type !== undefined)
      queryBuild.andWhere("user.user_type = :UserType", {
        UserType: body.user_type,
      });      
      
      const Data = await queryBuild.getMany();
      const Total = await queryBuild.getCount();
      return {data:Data,total:Total};
  }
  async updatedUserActivate(param: {id:number}, body:UpdateUserActivateDto) {
    const result= await this.userRepo.update({id:param.id},body).catch(err => {
      throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
    });
    if(result.affected !== 0){

    const queryBuild = await this.userRepo
    .createQueryBuilder("user")
    .where("user.id = :id", { id: param.id })
    .getOne();

    return {data:queryBuild};  
    }
    else{
     throw new HttpException("User Not Found!",HttpStatus.BAD_REQUEST);
    }
 }
 async findUserById(param:{id: number}) {
  const queryBuild = await this.userRepo
  .createQueryBuilder("user")
  .where("user.id = :id", { id: param.id })
  .getOne();
  if(queryBuild !== undefined ){
    return {data:queryBuild};
  }else{
    throw new HttpException("User Not Found!",HttpStatus.BAD_REQUEST);
  }
}
async updatedUser(param: {id:number}, body:UpdateUserDto) {
  const result= await this.userRepo.update({id:param.id},body).catch(err => {
    throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
  });
  if(result.affected !== 0){

  const queryBuild = await this.userRepo
  .createQueryBuilder("user")
  .where("user.id = :id", { id: param.id })
  .getOne();

  return {data:queryBuild};  
  }
  else{
   throw new HttpException("User Not Found!",HttpStatus.BAD_REQUEST);
  }
 }
 async updatedBulkUserActivate(body1: {ids:number[]}, body2:UpdateUserActivateDto) {
  const queryBuild =  await this.userRepo
  .createQueryBuilder()
  .update(User)
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
async getBulkKeycloakIds(body:{ids:number[]}){
  const queryBuild = await this.userRepo
  .createQueryBuilder("user")
  .select("keycloak_id")
  .where('id IN (:ids)', { ids:body.ids })
  .execute();
  return queryBuild;
}

}
