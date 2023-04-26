import { IsEmail, IsInt, IsNotEmpty, IsNumber, isNumber, IsOptional, IsString } from 'class-validator';
import Role from '../enum/role.enum';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  role:Role;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

}
export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  age: number;

}

