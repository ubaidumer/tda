"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const idsBulkValidation_decorator_copy_1 = require("../../decorators/comman/idsBulkValidation.decorator copy");
const idValidation_decorator_1 = require("../../decorators/comman/idValidation.decorator");
const paginationValidation_decorator_1 = require("../../decorators/comman/paginationValidation.decorator");
const toggleStatusValidation_decorator_1 = require("../../decorators/comman/toggleStatusValidation.decorator");
const createEmployeeValidation_decorator_1 = require("../../decorators/employee/createEmployeeValidation.decorator");
const getAllEmployeeValidation_decorator_1 = require("../../decorators/employee/getAllEmployeeValidation.decorator");
const updateEmployeeActivateValidation_decorator_1 = require("../../decorators/employee/updateEmployeeActivateValidation.decorator");
const updateEmployeeValidation_decorator_1 = require("../../decorators/employee/updateEmployeeValidation.decorator");
const pagination_dto_1 = require("../../dto/comman/pagination.dto");
const createEmployee_dto_1 = require("../../dto/employee/createEmployee.dto");
const getAllEmployee_dto_1 = require("../../dto/employee/getAllEmployee.dto");
const updateEmployee_dto_1 = require("../../dto/employee/updateEmployee.dto");
const updateEmployeeActivate_dto_1 = require("../../dto/employee/updateEmployeeActivate.dto");
const employee_service_1 = require("./employee.service");
let EmployeeController = class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async getEmployeeList(query, body) {
        return await this.employeeService.findEmployeeList(query, body);
    }
    async getActiveEmployeeList(query, body) {
        body.is_activated = 1;
        return await this.employeeService.findEmployeeList(query, body);
    }
    async getEmployeeById(param) {
        return await this.employeeService.findEmployeeById(param);
    }
    async postEmployee(body) {
        return await this.employeeService.createEmployee(body);
    }
    async putEmployeeStatusById(param, body) {
        return await this.employeeService.updateEmployeeStatus(param, body);
    }
    async putEmployeeById(param, body) {
        return await this.employeeService.updatedEmployee(param, body);
    }
    async putEmployeeBulkStatusByIds(body1, body2) {
        return await this.employeeService.updateEmployeeBulkStatus(body1, body2);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllEmployeeValidation_decorator_1.GetAllEmployeeValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto,
        getAllEmployee_dto_1.GetAllEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployeeList", null);
__decorate([
    (0, common_1.Get)('Active'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, paginationValidation_decorator_1.PaginationValidationDecorator)()),
    __param(1, (0, getAllEmployeeValidation_decorator_1.GetAllEmployeeValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto,
        getAllEmployee_dto_1.GetAllEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getActiveEmployeeList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployeeById", null);
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, createEmployeeValidation_decorator_1.CreateEmployeeValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createEmployee_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "postEmployee", null);
__decorate([
    (0, common_1.Patch)('Activate/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateEmployeeActivateValidation_decorator_1.UpdateEmployeeActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateEmployeeActivate_dto_1.UpdateEmployeeActivateDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "putEmployeeStatusById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idValidation_decorator_1.IDValidationDecorator)()),
    __param(1, (0, updateEmployeeValidation_decorator_1.UpdateEmployeeValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateEmployee_dto_1.UpdateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "putEmployeeById", null);
__decorate([
    (0, common_1.Patch)('BulkActivate'),
    (0, nest_keycloak_connect_1.Roles)({ roles: ['realm:admin'], mode: nest_keycloak_connect_1.RoleMatchingMode.ANY }),
    __param(0, (0, idsBulkValidation_decorator_copy_1.IDSBulkValidationDecorator)()),
    __param(1, (0, updateEmployeeActivateValidation_decorator_1.UpdateEmployeeActivateValidationDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateEmployeeActivate_dto_1.UpdateEmployeeActivateDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "putEmployeeBulkStatusByIds", null);
EmployeeController = __decorate([
    (0, common_1.Controller)('employee'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeController);
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employee.controller.js.map