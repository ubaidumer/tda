import { HttpService } from '@nestjs/axios';
export declare class AdminService {
    private httpService;
    constructor(httpService: HttpService);
    private KeycloakUrl;
    accessToken(loginData: any): Promise<any>;
    refreshToken(UserData: any): Promise<any>;
    createUserWithKeycloak(UserData: any, token: any): Promise<"SUCCESSFULLY CREATED USER WITH ROLES" | "SUCCESSFULLY CREATE USER WITHOUT ROLES">;
}
