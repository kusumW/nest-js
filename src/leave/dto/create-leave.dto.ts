import { IsNotEmpty } from 'class-validator';
import Leaves from '../enum/leave.enum';

export class CreateLeaveDto {
  subject: string;

  @IsNotEmpty()
  name: string;

  description: string;

  startDate: Date;

  endDate: Date;

  leavereason: Date;

  assignedworkstatus: Date;

  status: Leaves;
}
