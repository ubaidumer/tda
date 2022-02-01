import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateLocationDto } from 'src/dto/location/createLocation.dto';
import { UpdateLocationDto } from 'src/dto/location/updateLocation.dto';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
export declare class LocationService {
    private locationRepo;
    constructor(locationRepo: Repository<Location>);
    findLocationList(query: PaginationDto): Promise<any>;
    findLocationById(param: {
        id: number;
    }): Promise<any>;
    createLocation(body: CreateLocationDto): Promise<"location created successfully" | "location creation unsuccessfull">;
    updateLocationStatus(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<"location status updated successfully" | "location status updation unsuccessfull">;
    updatedLocation(param: {
        id: number;
    }, body: UpdateLocationDto): Promise<"location updated successfully" | "location updation unsuccessfull">;
    updateLocationBulkStatus(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<string>;
}
