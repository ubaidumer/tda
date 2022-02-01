import { Body, Controller, Get, HttpException, Patch, Post, Put } from '@nestjs/common';
import { RoleMatchingMode, Roles, Unprotected } from 'nest-keycloak-connect';
import CONFIG from 'src/config/config';
import { AuthHeader } from 'src/decorator/comman/authHeader.decorator';
import { IDSBulkValidationDecorator } from 'src/decorator/comman/idsBulkValidation.decorator';
import { IDValidationDecorator } from 'src/decorator/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorator/comman/paginationValidation.decorator';
import { KeycloakCreateUserValidationDecorator } from 'src/decorator/keycloak/keycloakCreateUserValidation.decorator';
import { KeycloakUpdateUserValidationDecorator } from 'src/decorator/keycloak/keycloakUpdateUserValidation.decorator';
import { CreateUserValidationDecorator } from 'src/decorator/user/createUserValidation.decorator';
import { GetAllUserValidationDecorator } from 'src/decorator/user/getAllUserValidation.decorator';
import { UpdateUserActivateValidationDecorator } from 'src/decorator/user/updateUserActivateValidation.decorator';
import { UpdateUserValidationDecorator } from 'src/decorator/user/updateUserValidation.decorator';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { UserAccessTokenWithCredentials } from 'src/dto/keycloak/userAccessTokenWithCredentials.dto';
import { CreateUserDto } from 'src/dto/user/createUser.dto';
import { GetAllUserDto } from 'src/dto/user/getAllUser.dto';
import { UpdateUserDto } from 'src/dto/user/updateUser.dto';
import { UpdateUserActivateDto } from 'src/dto/user/updateUserActivate.dto';
import { KeycloakService } from '../keycloak/keycloak.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,private readonly keycloakService: KeycloakService) {}
    @Post()
    @Unprotected()
    async postUser(
    @CreateUserValidationDecorator() body: CreateUserDto,
    @KeycloakCreateUserValidationDecorator() keycloakUserData ,
    @AuthHeader() token,) {
      const getkeycloakuser = await this.keycloakService.getUserWithEmailKeycloak(body.email,token);  
      if(getkeycloakuser.data[0] !== undefined){
          throw new HttpException("email already exists",400);
      } 
      const keycloakuser    = await this.keycloakService.createUserWithKeycloak(keycloakUserData,token);
      body.keycloak_id=keycloakuser.keycloak_id;
      const mysqluser       = await this.userService.createUser(body);
      return {mysql_response:mysqluser,keycloak_response:keycloakuser};

    }
    @Post('/loginWithCred')
    @Unprotected()
    loginWithCredentials(@Body() body: UserAccessTokenWithCredentials) {
      return this.keycloakService.accessToken(body);
    } 
    @Post('/refreshToken')
    @Unprotected()
    refreshToken(
        @Body() body:{refreshToken:string}) {
        const userData = {
        refresh_token: `${body.refreshToken}`,
        grant_type: `refresh_token`,
        client_id: `${CONFIG.KEYCLOAK_CLIENT}`,
        client_secret: `${CONFIG.KEYCLOAK_CLIENT_SECRET}`,
        }
        return this.keycloakService.refreshToken(userData);
    }
    @Get()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getUserList(@PaginationValidationDecorator() query: PaginationDto,@GetAllUserValidationDecorator() body:GetAllUserDto) {
      return await this.userService.findUserList(query,body);
    }
    @Patch('Activate/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async patchUserActivateById(
     @IDValidationDecorator() param: {id:number,},
     @UpdateUserActivateValidationDecorator() body:UpdateUserActivateDto,
     @AuthHeader() token,) {
      
    const getmysqluser = await this.userService.findUserById(param);

    if(getmysqluser.data == undefined){
      throw new HttpException("User Not Found!",400);
    } 

    let keycloakUserEnableStatus;
    if(body.is_activated == 1){
      keycloakUserEnableStatus=true;
    }else{
      keycloakUserEnableStatus=false;
    }
    const keycloakuser = await this.keycloakService.updateUserStatusWithKeycloak(getmysqluser.data.keycloak_id,keycloakUserEnableStatus,token);
    const mysqluser    = await this.userService.updatedUserActivate(param, body);

    return {mysql_response:mysqluser,keycloak_response:keycloakuser};

    }
    @Get('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getUserById(@IDValidationDecorator() param: {id:number}) {
      return await this.userService.findUserById(param);
    }
    @Put('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putUserById(
      @IDValidationDecorator() param: {id:number},
      @UpdateUserValidationDecorator() body:UpdateUserDto,
      @KeycloakUpdateUserValidationDecorator() keycloakUserData,
      @AuthHeader() token,) {
        console.log(body,keycloakUserData)
      
        if(body.email !==undefined){
        const getkeycloakuser = await this.keycloakService.getUserWithEmailKeycloak(body.email,token);  
        if(getkeycloakuser.data[0] !== undefined){
            throw new HttpException("email already exists",400);
        } 
      }
      const getmysqluser = await this.userService.findUserById(param);

      if(getmysqluser.data == undefined){
        throw new HttpException("User Not Found!",400);
      } 
      const keycloakuser = await this.keycloakService.updateUserWithKeycloak(getmysqluser.data.keycloak_id,keycloakUserData,token);
      const mysqluser    = await this.userService.updatedUser(param, body);
      return {mysql_response:mysqluser,keycloak_response:keycloakuser};
    }
    @Patch('BulkActivate')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async patchUserBulkActivateById(
     @IDSBulkValidationDecorator() body1: {ids:number[]},
     @UpdateUserActivateValidationDecorator() body2:UpdateUserActivateDto,
     @AuthHeader() token,) {
      const keycloak_ids= await this.userService.getBulkKeycloakIds(body1);
      if(keycloak_ids.length !== body1.ids.length){
        throw new HttpException("Found an incorrect id!",400);
      }
      let keycloakUserEnableStatus;
      if(body2.is_activated == 1){
        keycloakUserEnableStatus=true;
      }else{
        keycloakUserEnableStatus=false;
      }

      const keycloakuser = await this.keycloakService.updateBulkUserStatusWithKeycloak(keycloak_ids,keycloakUserEnableStatus,token);
      const mysqluser = await this.userService.updatedBulkUserActivate(body1, body2);
      return {mysql_response:mysqluser,keycloak_response:keycloakuser};
    }
}
