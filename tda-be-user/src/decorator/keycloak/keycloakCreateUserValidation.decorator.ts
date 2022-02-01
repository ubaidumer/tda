import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';


export const KeycloakCreateUserValidationDecorator = createParamDecorator(
 async (data,ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const keycloakUserData={
        username:body.email,
        enabled:true,
        emailVerified:true,
        firstName:body.first_name,
        email:body.email,
        lastName:body.last_name,
        credentials:[{
            type:"password",
            value:"ubaiddon123",
            temporary:false
        }],
        role:body.user_type
    }
    return keycloakUserData;
  },
);
