import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateLocationDto } from 'src/dto/location/createLocation.dto';
import { UpdateLocationDto } from 'src/dto/location/updateLocation.dto';
import { getManager, Repository } from 'typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(Location)
        private locationRepo: Repository<Location>,
      ) {}
      async findLocationList(query:PaginationDto) {
        const data = await this.locationRepo.query(
          `
                call tda.location_list(${query.limit}, ${query.offset}, @total, @result);
                `,
        );
        console.log(data[0][0]);
        return data[0][0];
      }
      async findLocationById(param:{id: number}) {
        const data = await this.locationRepo.query(
          `
                call tda.location_get(${param.id ? param.id : 1}, @result);
                `,
        );
        console.log(data[0][0]);
        return data[0][0];
      }
      async createLocation(body:CreateLocationDto) {
        const data = await this.locationRepo.query(
          "call tda.location_create('" +
            body.name +
            "','" +
            (body.location_type?body.location_type:'store') +
            "','" +
            (body.address?body.address:null) +
            "','" +
            (body.city?body.city:null) +
            "','" +
            (body.postal_code?body.postal_code:null) +
            "','" +
            (body.created_by?body.created_by:null) +
            "',1,@query_status); ",
        ).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
          return 'location created successfully';
        } else {
          return 'location creation unsuccessfull';
        }
      }
      async updateLocationStatus(param:{id:number},body :{is_activated:number}) {
        const data = await this.locationRepo.query(
          `
                call tda.location_toggle_status(${param.id},${body.is_activated},@query_status);
                `,
        );
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
          return 'location status updated successfully';
        } else {
          return 'location status updation unsuccessfull';
        }
      }
      async updatedLocation(param: {id:number}, body:UpdateLocationDto) {
        const data = await this.locationRepo.query(
          "call tda.location_update('" +
            param.id +
            "','" +
            body.name +
            "','" +
            body.location_type +
            "','" +
            body.address +
            "','" +
            body.city +
            "','" +
            body.postal_code +
            "','" +
            body.updated_by +
            "','" +
            body.is_activated +
            "',@query_status); ",
        ).catch(err => {
          throw new HttpException(err.message,HttpStatus.BAD_REQUEST);
        });
        console.log(data[0][0]);
        if (data[0][0].query_status == 1) {
          return 'location updated successfully';
        } else {
          return 'location updation unsuccessfull';
        }
      }
      async updateLocationBulkStatus(body1:{ids:number[]},body2 :{is_activated:number}) {
        console.log('ids:',body1.ids,'is_activated:',body2.is_activated);
      const response =  await getManager()
        .createQueryBuilder()
        .update(Location)
        .set({
          is_activated: body2.is_activated
        })
        .where('id IN (:ids)', { ids:body1.ids })
        .execute();
    
        return `${response.affected} rows has been updated`;
      }
}
