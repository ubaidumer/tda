import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as Validator from 'validatorjs';

export const GetAllBicycleTypeValidationDecorator = createParamDecorator(
 async (data,ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    if(body.sortList == undefined){
        body.sortList={"bicycle_type.id":"ASC"};
    }

    const rules = {
      is_activated:['numeric','min:0','max:1'],
      logo:['string'],
      static_price:['numeric']
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