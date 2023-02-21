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
} from '@nestjs/common';
import { Response } from 'express';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/Users/role/role.guard';
import { Roles } from 'src/Users/roles/roles.decorator';
import Role from 'src/Users/enum/role.enum';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.User)
  @Post()
  async create(@Body() createLeaveDto: CreateLeaveDto) {
    return this.leaveService.create(createLeaveDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.Admin)
  @Get()
  findAll(@Res() res: Response) {
    const user = this.leaveService.findAll();
    if (user) {
      return res.send({ user });
    } else {
      res.status(404).send({ msg: 'not able to fetch' });
    }
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const user = this.leaveService.findOne(+id);
    if ((user) => user.id == id) {
      return res.send({ user });
    } else {
      res.status(404).send({ msg: 'not found' });
    }
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaveDto: UpdateLeaveDto) {
    const { status, actiontakenon } = updateLeaveDto;
    const user = this.leaveService.update(+id, { status, actiontakenon });
    return `You have ${status} the leave and ${actiontakenon} action taken`;
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const user = this.leaveService.remove(+id);
    if ((user) => user.id == id) {
      return res.send({ user });
    } else {
      res.status(404).send({ msg: 'not found' });
    }
  }
}
