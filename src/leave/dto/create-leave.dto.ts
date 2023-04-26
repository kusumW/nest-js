import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseEntity } from 'typeorm';
import { Status } from '../entities/leave.entity';

export class CreateLeaveDto extends BaseEntity{
  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  start_date: Date;

  @IsNotEmpty()
  end_date: Date;

  @IsNotEmpty()
  reason: string;

  @IsNotEmpty()
  assignedworkstatus: string;
 
  @IsNotEmpty()
  employee_id: number;
}

export class UpdateLeaveDto extends BaseEntity{
  actiontakenon: string;
  
  @IsOptional()
  status: Status
}
