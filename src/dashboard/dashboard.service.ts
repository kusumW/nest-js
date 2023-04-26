import { Injectable } from '@nestjs/common';
import { Employee } from 'src/employees/entities/employee.entity';
import employees from 'src/employees/enum/employee.enum';
import { Holiday } from 'src/holidays/entities/holiday.entity';
import Holidays from 'src/holidays/enum/holiday.enum';
import { Leave, Status } from 'src/leave/entities/leave.entity';
import { Between } from 'typeorm';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Injectable()
export class DashboardService {
  async getUpcomingHolidays(): Promise<Holiday[]> {
    const current_date = new Date();
    const nextWeek = new Date(current_date.getTime() + 7 * 24 * 60 * 60 * 1000);

    const upcomingHolidays = await Holiday.find({
      where: {
        date: Between(current_date, nextWeek),
        status: Holidays.Enabled,
      },
    });
    return upcomingHolidays;
  }

  async getUpcomingHoliday(): Promise<Holiday[]> {
    const currentYear = new Date().getFullYear();
    const current_date = new Date(currentYear, 0, 1);
    const nextYear = new Date(currentYear + 1, 0, 1);
  
    const upcomingHolidays = await Holiday.find({
      where: {
        date: Between(current_date, nextYear),
        status: Holidays.Enabled,
      },
    });
    return upcomingHolidays;
  }
  

  async getUpcomingBirthdays(): Promise<Employee[]> {
    const current_date = new Date();
    const current_month = current_date.getMonth() + 1;
    const nextMonth = new Date(current_date.getFullYear(), current_month, 1);
  
    const UpcomingBirthdays = await Employee.find({
      where: {
        birth_date: Between(current_date, nextMonth),
        status: employees.Enabled,
      },
    });
  
    return UpcomingBirthdays;
  }
  

  async TodaysLeave(): Promise<Leave[]> {
    const today = new Date();
    const leave = await Leave.createQueryBuilder('leave')
      .where('DATE(leave.start_date) = DATE(:today)', { today })
      .getMany();
    return leave;
  }

  async getPendingLeaves(): Promise<Leave[]> {
    const query = await Leave.find({
      where: {
        status: Status.PENDING,
      },
    });
    return query;
  }
}
