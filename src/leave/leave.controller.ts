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
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/create-leave.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/Users/role/role.guard';
import { Roles } from 'src/Users/roles/roles.decorator';
import Role from 'src/Users/enum/role.enum';
import { EmployeesService } from 'src/employees/employees.service';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService,
    private readonly employeesService: EmployeesService,) {}

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.Employee,Role.Manager)
  @Post()
  async create(@Body() createLeaveDto: CreateLeaveDto,@Res() res: Response) {
    const user = await this.employeesService.find({where:{id:createLeaveDto.employee_id}});
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'employee does not exist',
        data: {},
      });
    }
    const leave= await this.leaveService.create(createLeaveDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'leave added',
      data: leave,
    });
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.Admin,Role.HR)
  @Get()
  async findAll(@Res() res: Response) {
    const leave = await this.leaveService.findAll();
    return res.status(HttpStatus.CREATED).json({
      message: 'leave list',
      data: leave,
    });
  
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.Admin,Role.HR)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const leave = await this.leaveService.findOne(+id);
    if (!leave) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'leave not found',
        data: {},
      });
  }
  return res.status(HttpStatus.OK).json({
    message: 'leave list',
    data: leave,
  });
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.Admin,Role.HR)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLeaveDto: UpdateLeaveDto,@Res() res: Response) { 
    const leave = this.leaveService.findOne(+id);
    if (!leave) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'leave not found',
        data: {},
      });
  }
    const updateleave = await this.leaveService.update(+id, updateLeaveDto);
    return res.status(HttpStatus.OK).json({
      message: 'leave details updated',
      data: updateleave,
    });
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.Admin,Role.HR,Role.Employee)
  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const leave = this.leaveService.findOne(+id);
    if (!leave) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'leave not found',
        data: {},
      });
  }
    const deleteLeave = this.leaveService.remove(+id);
    return res.status(HttpStatus.OK).json({
      message: 'leave deleted',
      data: deleteLeave,
    });
   
  }
}
