import { IsEmail, IsNotEmpty } from 'class-validator';
import Role from '../../Users/enum/role.enum';
import employees from '../enum/employee.enum';
export class CreateEmployeeDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEmail()
  personal_email: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  joining_date: Date;

  Status: employees;

  createdAt: Date;
  
  birth_date: Date;

  @IsNotEmpty()
  user_id:number;
  
  @IsNotEmpty()
  department_id:number;
}
