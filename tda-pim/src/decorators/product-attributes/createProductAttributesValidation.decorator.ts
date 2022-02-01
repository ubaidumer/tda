import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as Validator from 'validatorjs';

export const CreateProductAttributesValidationDecorator = createParamDecorator(
 async (data,ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
      name:['required','string'],
      value:['required','string'],
      product_id:['numeric'],
      measuring_unit_id:['numeric'],
      type:['required','string'],
    };
    const messages = {
      "required": ":attribute is required!",
      "numeric": ":attribute must be numeric!",
      "string": ":attribute must be string!"
    };
    let validate = await new Validator(body,rules,messages);
    const result=validate.passes()
    if(result == false){
      throw new HttpException(validate.errors, HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
  },
);
