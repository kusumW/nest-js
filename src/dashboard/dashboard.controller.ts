import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { use } from 'passport';
import Role from 'src/Users/enum/role.enum';
import { RoleGuard } from 'src/Users/role/role.guard';
import { Roles } from 'src/Users/roles/roles.decorator';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('upcoming/holiday')
  async getUpcomingHolidays() {
    const user = await this.dashboardService.getUpcomingHolidays();
    return { 'upcoming holiday in week': user };
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('upcoming/birthday')
  async getUpcomingBirthdays() {
    const user = await this.dashboardService.getUpcomingBirthdays();
    return { 'upcoming birthday in week': user };
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('today/leaves')
  async TodaysLeave() {
    const user = await this.dashboardService.TodaysLeave();
    return { "Today's leave": user };
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('pending-leaves')
  async getAllPendingLeaves() {
    return this.dashboardService.getPendingLeaves();
  }
}
