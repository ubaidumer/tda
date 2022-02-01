import { HttpStatus } from '@nestjs/common';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateUserDto } from 'src/dto/user/createUser.dto';
import { GetAllUserDto } from 'src/dto/user/getAllUser.dto';
import { UpdateUserDto } from 'src/dto/user/updateUser.dto';
import { UpdateUserActivateDto } from 'src/dto/user/updateUserActivate.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    createUser(body: CreateUserDto): Promise<never>;
    findUserList(query: PaginationDto, body: GetAllUserDto): Promise<{
        data: User[];
        total: number;
    }>;
    updatedUserActivate(param: {
        id: number;
    }, body: UpdateUserActivateDto): Promise<{
        data: User;
    }>;
    findUserById(param: {
        id: number;
    }): Promise<{
        data: User;
    }>;
    updatedUser(param: {
        id: number;
    }, body: UpdateUserDto): Promise<{
        data: User;
    }>;
    updatedBulkUserActivate(body1: {
        ids: number[];
    }, body2: UpdateUserActivateDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    getBulkKeycloakIds(body: {
        ids: number[];
    }): Promise<any>;
}
