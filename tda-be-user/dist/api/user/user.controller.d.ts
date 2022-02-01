import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { UserAccessTokenWithCredentials } from 'src/dto/keycloak/userAccessTokenWithCredentials.dto';
import { CreateUserDto } from 'src/dto/user/createUser.dto';
import { GetAllUserDto } from 'src/dto/user/getAllUser.dto';
import { UpdateUserDto } from 'src/dto/user/updateUser.dto';
import { UpdateUserActivateDto } from 'src/dto/user/updateUserActivate.dto';
import { KeycloakService } from '../keycloak/keycloak.service';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    private readonly keycloakService;
    constructor(userService: UserService, keycloakService: KeycloakService);
    postUser(body: CreateUserDto, keycloakUserData: any, token: any): Promise<{
        mysql_response: never;
        keycloak_response: {
            message: string;
            keycloak_id: any;
        };
    }>;
    loginWithCredentials(body: UserAccessTokenWithCredentials): Promise<any>;
    refreshToken(body: {
        refreshToken: string;
    }): Promise<any>;
    getUserList(query: PaginationDto, body: GetAllUserDto): Promise<{
        data: import("./user.entity").User[];
        total: number;
    }>;
    patchUserActivateById(param: {
        id: number;
    }, body: UpdateUserActivateDto, token: any): Promise<{
        mysql_response: {
            data: import("./user.entity").User;
        };
        keycloak_response: {
            message: string;
            keycloak_id: any;
        };
    }>;
    getUserById(param: {
        id: number;
    }): Promise<{
        data: import("./user.entity").User;
    }>;
    putUserById(param: {
        id: number;
    }, body: UpdateUserDto, keycloakUserData: any, token: any): Promise<{
        mysql_response: {
            data: import("./user.entity").User;
        };
        keycloak_response: {
            message: string;
            keycloak_id: any;
        };
    }>;
    patchUserBulkActivateById(body1: {
        ids: number[];
    }, body2: UpdateUserActivateDto, token: any): Promise<{
        mysql_response: {
            statusCode: import("@nestjs/common").HttpStatus;
            message: string;
        };
        keycloak_response: {
            message: string;
            keycloak_ids: any;
        };
    }>;
}
