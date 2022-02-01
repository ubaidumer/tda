import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateLocationDto } from 'src/dto/location/createLocation.dto';
import { UpdateLocationDto } from 'src/dto/location/updateLocation.dto';
import { LocationService } from './location.service';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    getLocationList(query: PaginationDto): Promise<any>;
    getLocationById(param: {
        id: number;
    }): Promise<any>;
    postLocation(body: CreateLocationDto): Promise<"location created successfully" | "location creation unsuccessfull">;
    putLocationStatusById(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<"location status updated successfully" | "location status updation unsuccessfull">;
    putLocationById(param: {
        id: number;
    }, body: UpdateLocationDto): Promise<"location updated successfully" | "location updation unsuccessfull">;
    putLocationBulkStatusByIds(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<string>;
}
