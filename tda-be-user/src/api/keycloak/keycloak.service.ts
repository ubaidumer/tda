import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import CONFIG from 'src/config/config';
import { HttpService } from '@nestjs/axios';
import  jwt_decode  from 'jwt-decode';
import { Token } from 'src/dto/keycloak/token.dto';
const qs = require('querystring');
@Injectable()
export class KeycloakService {
    constructor(
        private httpService: HttpService,
    ){}
    private KeycloakUrl = `${CONFIG.KEYCLOAK_URL}/realms/${CONFIG.KEYCLOAK_REALM}/protocol/openid-connect/token`;

    async accessToken(loginData) {
        try {
          console.log("login data", loginData)
          const response = await lastValueFrom(this.httpService
            .post(this.KeycloakUrl, qs.stringify(loginData), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            })
            );
          console.log('response data', response.data);
          return response.data;
        } catch (err) {
          console.log(err);
          throw new BadRequestException('Error', err);
        }
      }
    async refreshToken(UserData) {
        console.log("user data", UserData)
        try {
          const response = await lastValueFrom(this.httpService
            .post(this.KeycloakUrl, qs.stringify(UserData), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            })
          );
          return response.data;
        } catch (err) {
          console.log("errorssss", err)
          if (err?.response?.status === 400) {
            throw new BadRequestException("BAD REQUEST")
          }
          if (err?.response?.status === 401) {
            throw new BadRequestException("Unauthorized")
          }
          throw new BadRequestException('Error', err);
        }
    }

    async createUserWithKeycloak(UserData, token) {
        const role= UserData.role;
        delete UserData.role;
        console.log(role.toLocaleLowerCase())
        const decodeTokenData: Token = jwt_decode(token);
        if (!decodeTokenData.realm_access.roles.includes('admin')) {
          throw new BadRequestException("Forbidden")
        }
        //step 1:create keycloak user
        const keycloakAllUser = `${CONFIG.KEYCLOAK_URL}/admin/realms/${CONFIG.KEYCLOAK_REALM}/users`
        const data = JSON.stringify(UserData);
        console.log(data,keycloakAllUser);
        try {
          const response = await lastValueFrom(this.httpService
            .post(keycloakAllUser, data, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
              },
            })
          );
          console.log('response data ', response);
          if (response.status === 201) {
            const findRealmRole = `${CONFIG.KEYCLOAK_URL}/admin/realms/${CONFIG.KEYCLOAK_REALM}/roles`;
            const resp = await lastValueFrom(this.httpService
              .get(findRealmRole, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `${token}`,
                },
              })
            );
            var kRealmRole = resp.data.find((roles, index) => {
              console.log("roles", roles)
              return JSON.stringify(roles.name.toLowerCase()) === JSON.stringify(role.toLowerCase())
            })
            //step 4: find clients in keycloak
            const findClient = `${CONFIG.KEYCLOAK_URL}/admin/realms/${CONFIG.KEYCLOAK_REALM}/clients`
            const respo = await lastValueFrom(this.httpService
              .get(findClient, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `${token}`,
                },
              })
            );
            var cl;
            if (role.toLocaleLowerCase() == 'admin') {
              cl = 'realm-management'
            } else {
              cl = `${process.env.KEYCLOAK_CLIENT_ID}`;
            }
            var kClient = respo.data.find((clients, index) => clients.clientId === cl)
            //step 5:find client roles in keycloak
            var cr;
            if (role.toLocaleLowerCase() == 'admin') {
              cr = 'realm-admin';
            } else {
              cr = `${role.toLocaleLowerCase()}`;
            }
            const findClientRoles = `${CONFIG.KEYCLOAK_URL}/admin/realms/${CONFIG.KEYCLOAK_REALM}/clients/${kClient.id}/roles`
            const respon = await lastValueFrom(this.httpService
              .get(findClientRoles, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `${token}`,
                },
              })
            );
            console.log("cr2", cr.toLowerCase())
            var kClientRoles = respon.data.find((roles, index) => {
              return roles.name.toLowerCase() === cr
            }
            )
            const loginData = {
              username: UserData.username,
              password: UserData.credentials[0].value,
              grant_type: "password",
              client_id: `${process.env.KEYCLOAK_CLIENT_ID}`,
              client_secret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
            }
            const loginUser = await this.accessToken(loginData)
            let decodeToken: any;
            if (loginUser.access_token) {
              decodeToken = jwt_decode(loginUser.access_token)
            }
            //step 6:set realm roles to user in keycloak
            const SetRealmRole = `${CONFIG.KEYCLOAK_URL}/admin/realms/${CONFIG.KEYCLOAK_REALM}/users/${decodeToken.sub}/role-mappings/realm`
            let str1 = `[{
              "id":"${kRealmRole.id}",
              "name":"${kRealmRole.name}"
              }]`
            const reaction = await lastValueFrom(this.httpService
              .post(SetRealmRole, str1, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `${token}`,
                },
              })
            );
            if (reaction?.status == 204) {
              console.log("Realm Role Set!");
            }
            //step 7: set client roles to user in keycloak
            var scr;
            if (role.toLocaleLowerCase() == 'admin') {
              scr = "realm-admin"
            } else {
              scr = kClientRoles.name;
            }
            const SetClientRole = `${CONFIG.KEYCLOAK_URL}/admin/realms/${CONFIG.KEYCLOAK_REALM}/users/${decodeToken.sub}/role-mappings/clients/${kClient.id}`
            let str2 = `[{
            "id":"${kClientRoles.id}",
            "name":"${scr}",
            "clientRole":"true"
            }]`
            const react = await lastValueFrom(this.httpService
              .post(SetClientRole, str2, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `${token}`,
                },
              })
            );
            if (react?.status == 204) {
              return {message:'SUCCESSFULLY CREATED USER WITH ROLES',keycloak_id:decodeToken.sub};
            }
            return {message:'SUCCESSFULLY CREATED USER WITH ROLES',keycloak_id:decodeToken.sub};
          }
          // return response.data;
        } catch (error) {
          console.log("errors 1", error)
          if (error) {
            throw new BadRequestException(error);
          }
          else {
            throw new BadRequestException('error', error);
          }
        }
    }
    async getUserWithEmailKeycloak(email,token){
        const keycloakGetUser = `${CONFIG.KEYCLOAK_URL}/admin/realms/${CONFIG.KEYCLOAK_REALM}/users/?email=${email}`;
        const response = await lastValueFrom(this.httpService
            .get(keycloakGetUser,{
              headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
              },
            })
          );
        return response;
    }
    async updateUserWithKeycloak(id,body,token){
      const keycloakUpdateUser = `${CONFIG.KEYCLOAK_URL}/admin/realms/${CONFIG.KEYCLOAK_REALM}/users/${id}`
      const response = await lastValueFrom(this.httpService
        .put(keycloakUpdateUser, body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        })
        );
      return {message:"Keycloak user has been updated successfully",keycloak_id:id};
    }
    async updateUserStatusWithKeycloak(id,status,token){
      const keycloakUpdateUser = `${CONFIG.KEYCLOAK_URL}/admin/realms/${CONFIG.KEYCLOAK_REALM}/users/${id}`
      const body = `{"enabled":${status}}`;
      const response = await lastValueFrom(this.httpService
        .put(keycloakUpdateUser, body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        })
        );
      return {message:"Keycloak user has been updated successfully",keycloak_id:id};
    }
    async updateBulkUserStatusWithKeycloak(ids,status,token){
      for (let i = 0; i < ids.length; i++) { 
       const response = await this.updateUserStatusWithKeycloak(ids[i].keycloak_id,status,token);
       if(!response.keycloak_id){
        throw new HttpException(`Found an incorrect keycloak id:${ids[i]}!`,400);
       }
      }
      return {message:"Keycloak user has been updated successfully",keycloak_ids:ids};
    }
}
