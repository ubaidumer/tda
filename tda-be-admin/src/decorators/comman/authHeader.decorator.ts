import { BadRequestException, createParamDecorator, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
export const AuthHeader = createParamDecorator(
    async (data, context: ExecutionContext) => {
        const ctx = context.switchToHttp().getRequest();
        console.log(ctx);
        const header = ctx.headers;
        console.log(header);
        const { authorization } = header;
            if (!authorization) {
                throw new BadRequestException(`TOKEN NOT FOUND`);
            }
            return  authorization;
        }

);