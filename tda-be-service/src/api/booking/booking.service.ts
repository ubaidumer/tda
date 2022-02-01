import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingDto } from 'src/dto/booking/createBooking.dto';
import { GetAllBookingDto } from 'src/dto/booking/getAllBooking.dto';
import { UpdateBookingActivateDto } from 'src/dto/booking/updateBookingActivate.dto';
import { UpdateBookingStatusDto } from 'src/dto/booking/updateBookingStatus.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { QueryBuilder, Repository } from 'typeorm';
import { Booking } from './booking.entity';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private bookingRepo: Repository<Booking>,
      ) {}
    async createBooking(body:CreateBookingDto) {
        const result= await this.bookingRepo.save(body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        return result;        
    }
    async findBookingList(query:PaginationDto,body:GetAllBookingDto) {
        console.log(query,body);
        const queryBuild = await this.bookingRepo
        .createQueryBuilder("booking")
        .leftJoinAndSelect("booking.user", "user")
        .orderBy(body.sortList)
        .skip(query.limit * query.offset)
        .take(query.limit);

        if (body.is_activated !== undefined)
        queryBuild.andWhere("booking.is_activated = :IsActive", {
          IsActive: body.is_activated,
        });
        if (body.status !== undefined)
        queryBuild.andWhere("booking.status = :Status", {
          Status: body.status,
        });

        if (body.start_date !== undefined && body.end_date !== undefined)
        queryBuild.andWhere(
          "booking.booking_date >= :after && booking.booking_date <= :before",
          {
            after: body.start_date,
            before: body.end_date + " " + "23:59:59.746877",
          }
        );        
        
        const Data = await queryBuild.getMany();
        const Total = await queryBuild.getCount();
        return {data:Data,total:Total};
    }
    async findBookingById(param:{id: number}) {
        const queryBuild = await this.bookingRepo
        .createQueryBuilder("booking")
        .leftJoinAndSelect("booking.user", "user")
        .where("booking.id = :id", { id: param.id })
        .getOne();
        if(queryBuild !== undefined ){
          return {data:queryBuild};
        }else{
          throw new HttpException("Booking Not Found!",HttpStatus.BAD_REQUEST);
        }
    }
    async updatedBookingStatus(param: {id:number}, body:UpdateBookingStatusDto) {
        const result= await this.bookingRepo.update({id:param.id},body).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        if(result.affected !== 0){

        const queryBuild = await this.bookingRepo
        .createQueryBuilder("booking")
        .leftJoinAndSelect("booking.user", "user")
        .where("booking.id = :id", { id: param.id })
        .getOne();

        return {data:queryBuild};  
        }
        else{
         throw new HttpException("Booking Not Found!",HttpStatus.BAD_REQUEST);
        }
    }
    async updatedBulkBookingStatus(body1: {ids:number[]}, body2:UpdateBookingStatusDto) {
      const queryBuild =  await this.bookingRepo
      .createQueryBuilder()
      .update(Booking)
      .set({
        status: body2.status
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
  async updatedBookingActivate(param: {id:number}, body:UpdateBookingActivateDto) {
    const result= await this.bookingRepo.update({id:param.id},body).catch(err => {
      throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
    });
    if(result.affected !== 0){

    const queryBuild = await this.bookingRepo
    .createQueryBuilder("booking")
    .leftJoinAndSelect("booking.user", "user")
    .where("booking.id = :id", { id: param.id })
    .getOne();

    return {data:queryBuild};  
    }
    else{
     throw new HttpException("Booking Not Found!",HttpStatus.BAD_REQUEST);
    }
 }
 async updatedBulkBookingActivate(body1: {ids:number[]}, body2:UpdateBookingActivateDto) {
  const queryBuild =  await this.bookingRepo
  .createQueryBuilder()
  .update(Booking)
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
