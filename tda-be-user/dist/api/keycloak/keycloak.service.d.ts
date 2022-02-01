import { HttpService } from '@nestjs/axios';
export declare class KeycloakService {
    private httpService;
    constructor(httpService: HttpService);
    private KeycloakUrl;
    accessToken(loginData: any): Promise<any>;
    refreshToken(UserData: any): Promise<any>;
    createUserWithKeycloak(UserData: any, token: any): Promise<{
        message: string;
        keycloak_id: any;
    }>;
    getUserWithEmailKeycloak(email: any, token: any): Promise<import("axios").AxiosResponse<any, any>>;
    updateUserWithKeycloak(id: any, body: any, token: any): Promise<{
        message: string;
        keycloak_id: any;
    }>;
    updateUserStatusWithKeycloak(id: any, status: any, token: any): Promise<{
        message: string;
        keycloak_id: any;
    }>;
    updateBulkUserStatusWithKeycloak(ids: any, status: any, token: any): Promise<{
        message: string;
        keycloak_ids: any;
    }>;
}
