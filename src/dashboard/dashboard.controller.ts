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
  @Roles(Role.Admin,Role.HR,Role.Employee,Role.Manager)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('upcoming/holiday')
  async getUpcomingHolidays() {
    const user = await this.dashboardService.getUpcomingHolidays();
    return { 'upcoming holiday in week': user };
  }

  @Roles(Role.Admin,Role.HR,Role.Employee,Role.Manager)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('upcoming/holiday/in-year')
  async getUpcomingHoliday() {
    const user = await this.dashboardService.getUpcomingHoliday();
    return { 'upcoming holiday in year': user };
  }

  @Roles(Role.Admin, Role.HR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('upcoming/birthday')
  async getUpcomingBirthdays() {
    const user = await this.dashboardService.getUpcomingBirthdays();
    return { 'upcoming birthday in month': user };
  }

  @Roles(Role.Admin,Role.HR,Role.Employee,Role.Manager)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('today/leaves')
  async TodaysLeave() {
    const user = await this.dashboardService.TodaysLeave();
    return { "Today's leave": user };
  }

  @Roles(Role.Admin,Role.HR,Role.Manager)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('pending-leaves')
  async getAllPendingLeaves() {
    const user = await this.dashboardService.getPendingLeaves();
     return { "Pending leaves": user };
  }
}
