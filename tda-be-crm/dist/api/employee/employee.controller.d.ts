import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateEmployeeDto } from 'src/dto/employee/createEmployee.dto';
import { GetAllEmployeeDto } from 'src/dto/employee/getAllEmployee.dto';
import { UpdateEmployeeDto } from 'src/dto/employee/updateEmployee.dto';
import { UpdateEmployeeActivateDto } from 'src/dto/employee/updateEmployeeActivate.dto';
import { EmployeeService } from './employee.service';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    getEmployeeList(query: PaginationDto, body: GetAllEmployeeDto): Promise<{
        data: import("./employee.entity").Employee[];
        total: number;
    }>;
    getActiveEmployeeList(query: PaginationDto, body: GetAllEmployeeDto): Promise<{
        data: import("./employee.entity").Employee[];
        total: number;
    }>;
    getEmployeeById(param: {
        id: number;
    }): Promise<{
        data: import("./employee.entity").Employee;
    }>;
    postEmployee(body: CreateEmployeeDto): Promise<CreateEmployeeDto & import("./employee.entity").Employee>;
    putEmployeeStatusById(param: {
        id: number;
    }, body: UpdateEmployeeActivateDto): Promise<{
        data: import("./employee.entity").Employee;
    }>;
    putEmployeeById(param: {
        id: number;
    }, body: UpdateEmployeeDto): Promise<{
        data: import("./employee.entity").Employee;
    }>;
    putEmployeeBulkStatusByIds(body1: {
        ids: number[];
    }, body2: UpdateEmployeeActivateDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
