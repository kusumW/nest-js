import { Injectable } from '@nestjs/common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { Holiday } from './entities/holiday.entity';
import Holidays from './enum/holiday.enum';

@Injectable()
export class HolidaysService {
  async create(createHolidayDto: CreateHolidayDto) {
    const user = Holiday.create(createHolidayDto);
    await user.save();
    return user;
  }

  async findAll():Promise<Holiday[]> {
  
    return await Holiday.find();
  }

  async findOne(id: number) {
    return await Holiday.findOne(+id);
  }

  async update(id: number, updateHolidayDto: UpdateHolidayDto) {
    await Holiday.update({ id }, updateHolidayDto);
    return await Holiday.findOne({ id });
  }

  async remove(id: number) {
    await Holiday.delete({ id });
    return { deleted: true };
  }


   
  async getUpcomingHolidays(): Promise<any> {
    const currentDate = new Date();
    const upcomingHolidays = await Holiday
      .createQueryBuilder('holiday')
      .where('DATE(holiday.date) >= DATE(:date)', { date: currentDate })
      .andWhere('holiday.status = :status', { status: Holidays.Enabled })
      .orderBy('holiday.date', 'ASC')
      .select(['holiday.title', 'holiday.date'])
      .getMany();
    console.log(upcomingHolidays);
    return upcomingHolidays;
  }
  }