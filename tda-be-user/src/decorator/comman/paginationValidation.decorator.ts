import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as Validator from 'validatorjs';

export const PaginationValidationDecorator = createParamDecorator(
 async (data,ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    const body = request.body;
    if(query.limit == undefined){
      query.limit='10';
    }
    if(query.offset == undefined){
      query.offset='0';
    }
    const rules = {
      limit:['numeric','min:1','max:100'],
      offset:['numeric','min:0','max:100']
    }
    let validate = await new Validator(query,rules);
    const result=validate.passes()
    if(result == false){
      throw new HttpException(validate.errors, HttpStatus.NOT_ACCEPTABLE);
    }
    return query;
  },
);
