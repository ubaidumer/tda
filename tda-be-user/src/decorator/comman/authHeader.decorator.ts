import { BadRequestException, createParamDecorator, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
export const AuthHeader = createParamDecorator(
    async (data, context: ExecutionContext) => {
        const ctx = context.switchToHttp().getRequest();
        const header = ctx.headers;
        const { authorization } = header;
            if (!authorization) {
                throw new BadRequestException(`TOKEN NOT FOUND`);
            }
            return  authorization;
        }

);