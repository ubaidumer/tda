import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as Validator from 'validatorjs';

export const UpdateProductValidationDecorator = createParamDecorator(
 async (data,ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const rules = {
      title:['required','string'],
      description:['string'],
      description_short:['string'],
      price:['required','numeric'],
      price_sale:['required','numeric'],
      is_shippable:['numeric'],
      type:['required','string'],
      tag_ids:['string'],
      is_taxed:['numeric'],
      minimum_order:['numeric','min:1'],
      weight:['numeric'],
      size_height:['numeric'],
      size_width:['numeric'],
      size_length:['numeric'],
      up_sell:['string'],
      cross_sell:['string'],
      ean:['required','string'],
      sku:['required_if:type,Grouped','string'],
      back_order:['numeric'],
      min_stock:['numeric'],
      supplier_id:['numeric'],
      catalog_id:['numeric'],
      product_category_id:['numeric'],
      tax_class_id:['numeric']
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
