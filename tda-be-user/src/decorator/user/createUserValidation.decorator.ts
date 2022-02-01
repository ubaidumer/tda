import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as Validator from 'validatorjs';

export const CreateUserValidationDecorator = createParamDecorator(
 async (data,ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
      first_name:['required','string'],
      last_name:['required','string'],
      email:['required','email'],
      gender:['in:Male,Female','required'],
      address:['string'],
      city:['string'],
      country:['string'],
      postal_code:['string'],
      user_type:['in:Customer,Admin','required'],
      is_activated:['required','numeric','min:0','max:1'],
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
