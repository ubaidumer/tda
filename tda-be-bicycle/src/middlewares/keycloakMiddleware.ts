import { BadGatewayException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwtDecode from 'jwt-decode';


@Injectable()
export class KeycloakMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
  //   await console.log('Request:',req);
     if(!req.headers.authorization){
       throw new BadGatewayException('Authorization token missing');
     }
     console.log(req.headers.authorization)
     const decodeTokenData = jwtDecode(req.headers.authorization);
     await console.log(decodeTokenData);
     next();
  }
}