import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';


export const KeycloakUpdateUserValidationDecorator = createParamDecorator(
 async (data,ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;

    let keycloakUserData:any={};
    if(body.email){
      keycloakUserData.email=body.email;
      keycloakUserData.username=body.email;
    }
    if(body.first_name){
      keycloakUserData.firstName=body.first_name;
    }
    if(body.last_name){
      keycloakUserData.lastName=body.last_name;
    }
    return keycloakUserData;
  },
);
