import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { Roles, RoleMatchingMode, Unprotected } from 'nest-keycloak-connect';
import { CreateClientValidationDecorator } from 'src/decorators/client/createClientValidation.decorator';
import { GetAllClientValidationDecorator } from 'src/decorators/client/getAllClientValidation.decorator';
import { UpdateClientActivateValidationDecorator } from 'src/decorators/client/updateClientActivateValidation.decorator';
import { UpdateClientValidationDecorator } from 'src/decorators/client/updateClientValidation.decorator';
import { IDSBulkValidationDecorator } from 'src/decorators/comman/idsBulkValidation.decorator copy';
import { IDValidationDecorator } from 'src/decorators/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorators/comman/paginationValidation.decorator';
import { ToggleStatusValidationDecorator } from 'src/decorators/comman/toggleStatusValidation.decorator';
import { CreateClientDto } from 'src/dto/client/createClient.dto';
import { GetAllClientDto } from 'src/dto/client/getAllClient.dto';
import { UpdateClientDto } from 'src/dto/client/updateClient.dto';
import { UpdateClientActivateDto } from 'src/dto/client/updateClientActivate.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}
    @Get()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getClientList(@PaginationValidationDecorator() query: PaginationDto,
    @GetAllClientValidationDecorator() body:GetAllClientDto) {
      return await this.clientService.findClientList(query,body);
    }
    @Get('Active')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getActiveClientList(@PaginationValidationDecorator() query: PaginationDto,
    @GetAllClientValidationDecorator() body:GetAllClientDto) {
      body.is_activated=1;
      return await this.clientService.findClientList(query,body);
    }
    @Get('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getClientById(@IDValidationDecorator() param: {id:number}) {
      return await this.clientService.findClientById(param);
    }
    @Post()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async postClient(@CreateClientValidationDecorator() body: CreateClientDto) {
      return await this.clientService.createClient(body);
    }
    @Patch('Activate/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putClientStatusById(@IDValidationDecorator() param: {id:number},@UpdateClientActivateValidationDecorator() body:UpdateClientActivateDto) {
      return await this.clientService.updateClientStatus(param,body);
    }
    @Patch('BulkActivate')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putClientBulkStatusByIds(@IDSBulkValidationDecorator() body1: {ids:number[]},@UpdateClientActivateValidationDecorator() body2:UpdateClientActivateDto) {
      return await this.clientService.updateClientBulkStatus(body1,body2);
    }
    @Put('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putClientById(@IDValidationDecorator() param: {id:number}, @UpdateClientValidationDecorator() body:UpdateClientDto) {
      return await this.clientService.updatedClient(param, body);
    }
    
}
