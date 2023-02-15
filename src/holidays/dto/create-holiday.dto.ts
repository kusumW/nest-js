import { IsNotEmpty } from 'class-validator';
import Holidays from '../enum/holiday.enum';

export class CreateHolidayDto {
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  isOptional: Holidays;

  status: Holidays;
}
