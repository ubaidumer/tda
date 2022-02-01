import { KeycloakCreateuser } from 'src/dto/comman/keycloakCreateUser.dto';
import { UserAccessTokenWithCredentials } from 'src/dto/comman/userAccessTokenWithCredentials.dto';
import { UserAccessTokenWithoutCredentials } from 'src/dto/comman/userAccessTokenWithoutCredentials.dto';
import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    loginWithCredentials(body: UserAccessTokenWithCredentials): Promise<any>;
    loginWithoutCredentials(body: UserAccessTokenWithoutCredentials): Promise<any>;
    Registration(token: any, body: KeycloakCreateuser): Promise<"SUCCESSFULLY CREATED USER WITH ROLES" | "SUCCESSFULLY CREATE USER WITHOUT ROLES">;
    refreshToken(body: {
        refreshToken: string;
    }): Promise<any>;
}
