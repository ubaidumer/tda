import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as Validator from 'validatorjs';

export const CreateStockValidationDecorator = createParamDecorator(
 async (data,ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
      price_per_unit:['required','numeric'],
      total_products:['required','numeric'],
      product_id:['numeric'],
      location_id:['numeric'],
      supplier_id:['numeric'],
      delivery_date:['date']
    };
    const messages = {
      "required": ":attribute is required!",
      "numeric": ":attribute must be numeric!",
      "date":":attribute must be date!"
    };
    let validate = await new Validator(body,rules,messages);
    const result=validate.passes()
    if(result == false){
      throw new HttpException(validate.errors, HttpStatus.NOT_ACCEPTABLE);
    }
    return body;
  },
);
