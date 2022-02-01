import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as Validator from 'validatorjs';

export const UpdateUserValidationDecorator = createParamDecorator(
 async (data,ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
      first_name:['string'],
      last_name:['string'],
      email:['email'],
      gender:['in:Male,Female'],
      address:['string'],
      city:['string'],
      country:['string'],
      postal_code:['string'],
      user_type:['in:Customer,Admin'],
      is_activated:['numeric','min:0','max:1'],
    }
    const messages = {
      "required": ":attribute is required!",
      "string": ":attribute must be string!",
      "date":":attribute must be date!"
    }
    let validate = await new Validator(body,rules,messages);
    const result=validate.passes()
    if(result == false){
      throw new HttpException(validate.errors, HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
  },
);
