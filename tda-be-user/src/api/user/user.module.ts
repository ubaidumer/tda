import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeycloakService } from '../keycloak/keycloak.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [HttpModule.register({  }),TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,KeycloakService]
})
export class UserModule {}
