import { CreateClientDto } from 'src/dto/client/createClient.dto';
import { GetAllClientDto } from 'src/dto/client/getAllClient.dto';
import { UpdateClientDto } from 'src/dto/client/updateClient.dto';
import { UpdateClientActivateDto } from 'src/dto/client/updateClientActivate.dto';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { ClientService } from './client.service';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    getClientList(query: PaginationDto, body: GetAllClientDto): Promise<{
        data: import("./client.entity").Client[];
        total: number;
    }>;
    getActiveClientList(query: PaginationDto, body: GetAllClientDto): Promise<{
        data: import("./client.entity").Client[];
        total: number;
    }>;
    getClientById(param: {
        id: number;
    }): Promise<{
        data: import("./client.entity").Client;
    }>;
    postClient(body: CreateClientDto): Promise<CreateClientDto & import("./client.entity").Client>;
    putClientStatusById(param: {
        id: number;
    }, body: UpdateClientActivateDto): Promise<{
        data: import("./client.entity").Client;
    }>;
    putClientBulkStatusByIds(body1: {
        ids: number[];
    }, body2: UpdateClientActivateDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    putClientById(param: {
        id: number;
    }, body: UpdateClientDto): Promise<{
        data: import("./client.entity").Client;
    }>;
}
