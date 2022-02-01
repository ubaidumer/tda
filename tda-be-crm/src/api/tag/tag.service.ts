import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { getManager, Repository } from 'typeorm';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateTagDto } from 'src/dto/tag/createTag.dto';
import { UpdateTagDto } from 'src/dto/tag/updateTag.dto';
import { GetAllTagDto } from 'src/dto/tag/getAllTag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
  ) {}
  async findTagList(query:PaginationDto,body:GetAllTagDto) {
    const queryBuild = await this.tagRepo
    .createQueryBuilder("tag")
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
  async findTagById(param:{id: number}) {
    const queryBuild = await this.tagRepo
    .createQueryBuilder("tag")
    .where("tag.id = :id", { id: param.id })
    .getOne();
    if(queryBuild !== undefined ){
      return {data:queryBuild};
    }else{
      throw new HttpException("Tag Not Found!",HttpStatus.BAD_REQUEST);
    }
  }
  async createTag(body:CreateTagDto) {
    const result= await this.tagRepo.save(body).catch(err => {
      throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
    });
    return result;      
  }
  async updateTagStatus(param:{id:number},body :{is_activated:number}) {
    const result= await this.tagRepo.update({id:param.id},body).catch(err => {
      throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
    });
    if(result.affected !== 0){

    const queryBuild = await this.tagRepo
    .createQueryBuilder("tag")
    .where("tag.id = :id", { id: param.id })
    .getOne();

    return {data:queryBuild};  
    }
    else{
     throw new HttpException("Tag Not Found!",HttpStatus.BAD_REQUEST);
    }
  }
  async updatedTag(param: {id:number}, body:UpdateTagDto) {
    const result= await this.tagRepo.update({id:param.id},body).catch(err => {
      throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
    });
    if(result.affected !== 0){
  
    const queryBuild = await this.tagRepo
    .createQueryBuilder("tag")
    .where("tag.id = :id", { id: param.id })
    .getOne();
  
    return {data:queryBuild};  
    }
    else{
     throw new HttpException("Tag Not Found!",HttpStatus.BAD_REQUEST);
    }
  }
  async updateTagBulkStatus(body1:{ids:number[]},body2 :{is_activated:number}) {
    const queryBuild =  await this.tagRepo
    .createQueryBuilder()
    .update(Tag)
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