import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { Roles, RoleMatchingMode } from 'nest-keycloak-connect';
import { IDSBulkValidationDecorator } from 'src/decorators/comman/idsBulkValidation.decorator copy';
import { IDValidationDecorator } from 'src/decorators/comman/idValidation.decorator';
import { PaginationValidationDecorator } from 'src/decorators/comman/paginationValidation.decorator';
import { ToggleStatusValidationDecorator } from 'src/decorators/comman/toggleStatusValidation.decorator';
import { CreateEmployeeValidationDecorator } from 'src/decorators/employee/createEmployeeValidation.decorator';
import { GetAllEmployeeValidationDecorator } from 'src/decorators/employee/getAllEmployeeValidation.decorator';
import { UpdateEmployeeActivateValidationDecorator } from 'src/decorators/employee/updateEmployeeActivateValidation.decorator';
import { UpdateEmployeeValidationDecorator } from 'src/decorators/employee/updateEmployeeValidation.decorator';
import { PaginationDto } from 'src/dto/comman/pagination.dto';
import { CreateEmployeeDto } from 'src/dto/employee/createEmployee.dto';
import { GetAllEmployeeDto } from 'src/dto/employee/getAllEmployee.dto';
import { UpdateEmployeeDto } from 'src/dto/employee/updateEmployee.dto';
import { UpdateEmployeeActivateDto } from 'src/dto/employee/updateEmployeeActivate.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}
    @Get()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getEmployeeList(@PaginationValidationDecorator() query: PaginationDto,
    @GetAllEmployeeValidationDecorator() body:GetAllEmployeeDto) {
      return await this.employeeService.findEmployeeList(query,body);
    }
    @Get('Active')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getActiveEmployeeList(@PaginationValidationDecorator() query: PaginationDto,
    @GetAllEmployeeValidationDecorator() body:GetAllEmployeeDto) {
      body.is_activated=1;
      return await this.employeeService.findEmployeeList(query,body);
    }
    @Get('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async getEmployeeById(@IDValidationDecorator() param: {id:number}) {
      return await this.employeeService.findEmployeeById(param);
    }
    @Post()
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async postEmployee(@CreateEmployeeValidationDecorator() body: CreateEmployeeDto) {
      return await this.employeeService.createEmployee(body);
    }
    @Patch('Activate/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putEmployeeStatusById(@IDValidationDecorator() param: {id:number},@UpdateEmployeeActivateValidationDecorator() body:UpdateEmployeeActivateDto) {
      return await this.employeeService.updateEmployeeStatus(param,body);
    }
    @Put('/:id')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putEmployeeById(@IDValidationDecorator() param: {id:number}, @UpdateEmployeeValidationDecorator() body:UpdateEmployeeDto) {  
      return await this.employeeService.updatedEmployee(param, body);
    }
    @Patch('BulkActivate')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ANY })
    async putEmployeeBulkStatusByIds(@IDSBulkValidationDecorator() body1: {ids:number[]},@UpdateEmployeeActivateValidationDecorator() body2:UpdateEmployeeActivateDto) {
      return await this.employeeService.updateEmployeeBulkStatus(body1,body2);
    }
}
