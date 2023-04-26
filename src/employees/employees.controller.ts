import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Roles } from '../Users/roles/roles.decorator';
import { RoleGuard } from '../Users/role/role.guard';
import Role from '../Users/enum/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/Users/user.service';
import { DepartmentService } from 'src/department/department.service';
import { Not } from 'typeorm';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService,
  private readonly userService: UserService,) {}
  

  @Roles(Role.Admin,Role.HR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post()
 async create(@Body() createEmployeeDto: CreateEmployeeDto,@Res() res: Response) {
    const user = await this.userService.findById({where:{id:createEmployeeDto.user_id}});
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'user does not exist',
        data: {},
      });
    }
    if (user.role !== 'Employee' && user.role !== 'Manager') {
      return res.status(HttpStatus.FORBIDDEN).json({
        message: 'user does not have the required role',
        data: {},
      });
    }
  
    const employee= await this.employeesService.create(createEmployeeDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'employee created',
      data: employee,
    });
  }

 
  @Roles(Role.Admin,Role.Manager,Role.HR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get()
  async findAll(@Res() res: Response) {
    const employee= await this.employeesService.findAll();
    return res.status(HttpStatus.OK).json({
      message: 'employee list',
      data: employee,
    });
  }

  @Roles(Role.Admin,Role.Manager,Role.HR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get(':id')
 async  findOne(@Param('id') id: number,@Res() res: Response) {
    const employee = await this.employeesService.findOne(id);

    if (!employee) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'employee not found',
        data: {},
      });
    }
    return res.status(HttpStatus.OK).json({
      message: 'employee list',
      data: employee,
    });
  }

  
  @Roles(Role.Admin,Role.HR,Role.Employee)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Patch(':id')
   async update(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,@Res() res: Response
  ) {
    const employee = await this.employeesService.findOne(id);
    if (!employee) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'employee does not exist',
        data: {},
      });
    }
    const findemail = await this.employeesService.find({
      where:
        {  email:updateEmployeeDto.email,
          id:Not(id)
        }
        
      });

    if (findemail) {
      return res.status(HttpStatus.CONFLICT).json({
        message: 'email already exist',
        data: {},
      });
    }
    const updateEmployee= await this.employeesService.update(+id, updateEmployeeDto);
    return res.status(HttpStatus.OK).json({
      message: 'employee details updated',
      data: updateEmployee,
    });
  }


  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.Admin,Role.HR)
  @Delete(':id')
   async remove(@Param('id') id: number,@Res() res: Response) {
    const employee = await this.employeesService.findOne(id);
    if (!employee) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'employee does not exist',
        data: {},
      });
    }
    const deleteEmployee= await this.employeesService.remove(+id);
    return res.status(HttpStatus.OK).json({
      message: 'employee deleted',
      data: deleteEmployee,
    });
  }
}
