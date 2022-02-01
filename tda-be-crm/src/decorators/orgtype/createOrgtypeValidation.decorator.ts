import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as Validator from 'validatorjs';

export const CreateOrgtypeValidationDecorator = createParamDecorator(
 async (data,ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
      name:['required'],
      is_activated:['numeric','max:1',"min:0"]
    };
    const messages = {
      "required": ":attribute is required!",
      "string": ":attribute must be string!",
    }
    let validate = await new Validator(body,rules,messages);
    const result=validate.passes()
    if(result == false){
      throw new HttpException(validate.errors, HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
  },
);
