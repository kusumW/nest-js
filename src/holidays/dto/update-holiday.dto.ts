import { PartialType } from '@nestjs/mapped-types';
import Holidays from '../enum/holiday.enum';
import { CreateHolidayDto } from './create-holiday.dto';

export class UpdateHolidayDto extends PartialType(CreateHolidayDto) {
  id: number;

  title: string;

  startDate: Date;

  endDate: Date;

  isOptional: Holidays;

  status: Holidays;
}
