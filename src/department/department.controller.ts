import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import Role from 'src/Users/enum/role.enum';
import { RoleGuard } from 'src/Users/role/role.guard';
import { Roles } from 'src/Users/roles/roles.decorator';
import { Not } from 'typeorm';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Roles(Role.Admin,Role.HR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto,@Res() res: Response) {
    const isdepartment = await this.departmentService.find({where:{department:createDepartmentDto.department}});
    if (isdepartment) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'department already exist',
        data: {},
      });
    }
    
    const department= await this.departmentService.create(createDepartmentDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'Department created',
      data: department,
    });
  }

  @Roles(Role.Admin,Role.HR,Role.Manager)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get()
  async findAll(@Res() res: Response) {
    const department= await this.departmentService.findAll();
    return res.status(HttpStatus.OK).json({
      message: 'department list',
      data: department,
    });
  }


  @Roles(Role.Admin,Role.HR,Role.Manager)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get(':id')
  async findOne(@Param('id') id: number,@Res() res: Response) {
    const department = await this.departmentService.findOne(id);
    if (!department) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'department not found',
        data: {},
      });
    }
    return res.status(HttpStatus.OK).json({
      message: 'department list',
      data: department,
    });
  }

  
  @Roles(Role.Admin,Role.HR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Patch(':id')
  async update(@Param('id') id: string,@Res() res: Response, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.departmentService.findOne(+id);
    if (!department) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'department not found',
        data: {},
      });
    }
    const isdepartment = await this.departmentService.find({
      where:
        {  department:updateDepartmentDto.department,
          id:Not(id)
        }  
      });
      if (isdepartment) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'department already exist',
          data: {},
        });
      }
    const updateDepartment= await this.departmentService.update(+id, updateDepartmentDto);
    return res.status(HttpStatus.OK).json({
      message: 'department detials updated',
      data: updateDepartment,
    });
  }

  @Roles(Role.Admin,Role.HR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Delete(':id')
  async remove(@Param('id') id: string,@Res() res: Response) {
    const department = await this.departmentService.findOne(+id);
    if (!department) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'department not found',
        data: {},
      });
    }
    const deleteDepartment= await this.departmentService.remove(+id);
    return res.status(HttpStatus.OK).json({
      message: 'department deleted',
      data: deleteDepartment,
    });
  }
}
