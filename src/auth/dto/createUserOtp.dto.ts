import { IsEmail, IsNotEmpty } from 'class-validator';
import { identity } from 'rxjs';

export class UserOtpDto {
  @IsEmail()
  email: string;


  @IsNotEmpty()
  otp: string;
}
