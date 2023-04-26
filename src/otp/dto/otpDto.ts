import { IsEmail, IsNotEmpty } from 'class-validator';
import { identity } from 'rxjs';

export class OtpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  otp: string;
}

export class ResetPasswordDto {

  email: string;


  otp: string;

  password:string;
}
