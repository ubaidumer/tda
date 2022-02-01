import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as Validator from 'validatorjs';

export const GetAllOrgValidationDecorator = createParamDecorator(
 async (data,ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    if(body.sortList == undefined){
        body.sortList={"org.id":"ASC"};
    }

    const rules = {
      is_activated:['numeric','min:0','max:1'],
      name:['string'],
      description:['string'],
      street:['string'],
      street_num:['string'],
      postal_code:['string'],
      city:['string'],
      province:['string'],
      country:['string'],
      phone_num:['string'],
      mobile:['string'],
      website:['string'],
      email:['string']
    }
    const messages = {
      "string": ":attribute must be string!",
      "date":":attribute must be date!",
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
