import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import Holidays from '../enum/holiday.enum';
import { Type as TransformType } from 'class-transformer';

export class CreateHolidayDto {
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  date: Date;

  isOptional: Holidays;

  status: Holidays;
}
