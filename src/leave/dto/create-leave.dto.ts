import { IsNotEmpty } from 'class-validator';

export class CreateLeaveDto {
  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  leavereason: string;

  @IsNotEmpty()
  assignedworkstatus: string;
}
