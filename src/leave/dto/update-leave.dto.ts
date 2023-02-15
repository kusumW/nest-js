import { PartialType } from '@nestjs/mapped-types';
import Leaves from '../enum/leave.enum';
import { CreateLeaveDto } from './create-leave.dto';

export class UpdateLeaveDto extends PartialType(CreateLeaveDto) {
  subject: string;

  name: string;

  description: string;

  startDate: Date;

  endDate: Date;

  leavereason: Date;

  assignedworkstatus: Date;

  status: Leaves;
}
