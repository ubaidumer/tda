import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as Validator from 'validatorjs';

export const UpdateSupplierValidationDecorator = createParamDecorator(
 async (data,ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
      email:['email'],
      phone_num:['numeric'],
      mobile:['numeric'],
      tax_number:['string'],
      coc_number:['string'],
      is_a_company:['numeric'],
      address:['string'],
    };   
    const messages = {
      "required": ":attribute is required!",
      "string": ":attribute must be string!",
      "numeric": ":attribute must be numeric!"
    };
    let validate = await new Validator(body,rules,messages);
    const result=validate.passes()
    if(result == false){
      throw new HttpException(validate.errors, HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
  },
);
