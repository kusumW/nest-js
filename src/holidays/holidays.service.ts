import { Injectable } from '@nestjs/common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { Holiday } from './entities/holiday.entity';

@Injectable()
export class HolidaysService {
  async create(createHolidayDto: CreateHolidayDto) {
    const user = Holiday.create(createHolidayDto);
    await user.save();
    return user;
  }

  async findAll() {
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
}
