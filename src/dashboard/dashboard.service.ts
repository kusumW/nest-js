import { Injectable } from '@nestjs/common';
import { Employee } from 'src/employees/entities/employee.entity';
import employees from 'src/employees/enum/employee.enum';
import { Holiday } from 'src/holidays/entities/holiday.entity';
import Holidays from 'src/holidays/enum/holiday.enum';
import { Leave } from 'src/leave/entities/leave.entity';
import { Between } from 'typeorm';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Injectable()
export class DashboardService {
  async getUpcomingHolidays(): Promise<Holiday[]> {
    const currentDate = new Date();
    const nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    const upcomingHolidays = await Holiday.find({
      where: {
        date: Between(currentDate, nextWeek),
        status: Holidays.Enabled,
      },
    });

    console.log(upcomingHolidays);
    return upcomingHolidays;
  }

  async getUpcomingBirthdays(): Promise<Employee[]> {
    const currentDate = new Date();
    const nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    const UpcomingBirthdays = await Employee.find({
      where: {
        Birthdate: Between(currentDate, nextWeek),
        Status: employees.Enabled,
      },
    });

    console.log(UpcomingBirthdays);
    return UpcomingBirthdays;
  }

  async TodaysLeave(): Promise<Leave[]> {
    const today = new Date();
    const leave = await Leave.createQueryBuilder('leave')
      .where('DATE(leave.startDate) = DATE(:today)', { today })
      .getMany();
    return leave;
  }

  async getPendingLeaves(): Promise<Leave[]> {
    const query = await Leave.find({
      where: {
        status: 'pending',
      },
    });
    console.log(query);
    return query;
  }
}
