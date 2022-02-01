import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleMatchingMode, Roles, Unprotected } from 'nest-keycloak-connect';
import { AuthHeader } from 'src/decorators/comman/authHeader.decorator';
import { KeycloakCreateuser } from 'src/dto/comman/keycloakCreateUser.dto';
import { UserAccessTokenWithCredentials } from 'src/dto/comman/userAccessTokenWithCredentials.dto';
import { UserAccessTokenWithoutCredentials } from 'src/dto/comman/userAccessTokenWithoutCredentials.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService:AdminService,
    ){}
    @Post('/loginWithCred')
    @Unprotected()
    loginWithCredentials(@Body() body: UserAccessTokenWithCredentials) {
      return this.adminService.accessToken(body);
    }
    @Post('/loginWithoutCred')
    @Unprotected()
    loginWithoutCredentials(@Body() body: UserAccessTokenWithoutCredentials) {
      return this.adminService.accessToken(body);
    }
    @Post('/register')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    Registration(
      @AuthHeader() token,
      @Body() body:KeycloakCreateuser,
    ) {
        return this.adminService.createUserWithKeycloak(body,token);
 
    }
    @Post('/refreshToken')
    @Unprotected()
    refreshToken(
        @Body() body:{refreshToken:string}) {
        const userData = {
        refresh_token: `${body.refreshToken}`,
        grant_type: `refresh_token`,
        client_id: `${process.env.KEYCLOAK_CLIENT_ID}`,
        client_secret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
        }
        return this.adminService.refreshToken(userData);
    }
}
