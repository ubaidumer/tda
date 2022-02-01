import { HttpStatus } from '@nestjs/common';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateEmployeeDto } from 'src/dto/employee/createEmployee.dto';
import { GetAllEmployeeDto } from 'src/dto/employee/getAllEmployee.dto';
import { UpdateEmployeeDto } from 'src/dto/employee/updateEmployee.dto';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
export declare class EmployeeService {
    private employeeRepo;
    constructor(employeeRepo: Repository<Employee>);
    findEmployeeList(query: PaginationDto, body: GetAllEmployeeDto): Promise<{
        data: Employee[];
        total: number;
    }>;
    findEmployeeById(param: {
        id: number;
    }): Promise<{
        data: Employee;
    }>;
    createEmployee(body: CreateEmployeeDto): Promise<CreateEmployeeDto & Employee>;
    updateEmployeeStatus(param: {
        id: number;
    }, body: {
        is_activated: number;
    }): Promise<{
        data: Employee;
    }>;
    updatedEmployee(param: {
        id: number;
    }, body: UpdateEmployeeDto): Promise<{
        data: Employee;
    }>;
    updateEmployeeBulkStatus(body1: {
        ids: number[];
    }, body2: {
        is_activated: number;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
