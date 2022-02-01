import { HttpStatus } from '@nestjs/common';
import { CreateClientDto } from 'src/dto/client/createClient.dto';
import { GetAllClientDto } from 'src/dto/client/getAllClient.dto';
import { UpdateClientDto } from 'src/dto/client/updateClient.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
export declare class ClientService {
    private clientRepo;
    constructor(clientRepo: Repository<Client>);
    findClientList(query: PaginationDto, body: GetAllClientDto): Promise<{
        data: Client[];
        total: number;
    }>;
    findClientById(param: {
        id: number;
    }): Promise<{
        data: Client;
    }>;
    createClient(body: CreateClientDto): Promise<CreateClientDto & Client>;
    updateClientStatus(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<{
        data: Client;
    }>;
    updateClientBulkStatus(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    updatedClient(param: {
        id: number;
    }, body: UpdateClientDto): Promise<{
        data: Client;
    }>;
}
