import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as Validator from 'validatorjs';

export const UpdateServicesValidationDecorator = createParamDecorator(
 async (data,ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    Validator.register('mod', function(value, modvalue, attribute) {
      console.log("here",value,modvalue)
      if(value % modvalue == 0){
        return true;
      }else{
        return false;
      }

    }, 'The :attribute must be divisible to :mod.');
    const rules = {
      name:['string'],
      description:['string'],
      parent_id:['numeric'],
      price:['numeric'],
      estimated_service_time:['numeric','mod:5'],
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
