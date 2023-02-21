import { PartialType } from '@nestjs/mapped-types';
import Role from '../../Users/enum/role.enum';
import employees from '../enum/employee.enum';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  Name: string;
  Email: string;
  PersonalEmail: string;
  Age: number;
  JoiningDate: Date;
  Department:string;
  Birthdate:Date;
  Status:employees;
}
