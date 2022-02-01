import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as Validator from 'validatorjs';

export const CreateClientValidationDecorator = createParamDecorator(
 async (data,ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
      first_name:['required','string'],
      last_name:['required','string'],
      street:['string'],
      street_num:['string'],
      province:['string'],
      country:['string'],
      postal_code:['string'],
      city:['string'],
      email:['required','email'],
      website:['required','string'],
      phone_num:['required','numeric'],
      mobile:['required','numeric'],
      tag_ids:['string'],
      is_activated:['numeric','max:1',"min:0"]
    };
    const messages = {
      "required": ":attribute is required!",
      "string": ":attribute must be string!",
      "numeric": ":attribute must be numeric!"
    }
    let validate = await new Validator(body,rules,messages);
    const result=validate.passes()
    if(result == false){
      throw new HttpException(validate.errors, HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
  },
);
