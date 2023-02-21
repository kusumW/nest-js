import { IsEmail, IsNotEmpty } from 'class-validator';
import Role from '../../Users/enum/role.enum';
import employees from '../enum/employee.enum';
export class CreateEmployeeDto {
  id: number;

  @IsNotEmpty()
  Name: string;

  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @IsNotEmpty()
  @IsEmail()
  PersonalEmail: string;

  @IsNotEmpty()
  Age: number;

  @IsNotEmpty()
  JoiningDate: Date;

  Status: employees;

  createdAt: Date;

  Department: string;
  
  Birthdate: Date;
}
