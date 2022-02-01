import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as Validator from 'validatorjs';

export const GetAllServicesValidationDecorator = createParamDecorator(
 async (data,ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    if(body.sortList == undefined){
        body.sortList={"services.id":"ASC"};
    }
    if(body.is_activated == undefined){
        body.is_activated='1';
    }
    const rules = {
      is_activated:['required','numeric','min:0','max:1'],
    }
    const messages = {
      "numeric":":attribute must be numeric!"
    }
    let validate = await new Validator(body,rules,messages);
    const result=validate.passes()
    if(result == false){
      throw new HttpException(validate.errors, HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
  },
);
