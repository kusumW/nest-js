import { IsEmail, IsInt, IsNotEmpty, isNumber } from 'class-validator';
import Role from '../enum/role.enum';

export class CreateUserDto {
  role: string[];

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  id: number;
}
