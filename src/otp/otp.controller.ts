import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { OtpDto, ResetPasswordDto } from 'src/otp/dto/otpDto';
import { MailerService } from '@nestjs-modules/mailer';
import { OtpService } from './otp.service';
import { Otp } from 'src/otp/entities/otp';
import { UserService } from 'src/Users/user.service';
import * as bcrypt from 'bcrypt';


@Controller('otp')
export class OtpController {
  constructor(
    private mailservice: MailerService,
    private otpservice: OtpService,
    private userservice: UserService,
  ) {}
  @Post('forgot')
  async forgotPassword(@Body('email') email: string) {
    const user = await this.userservice.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      let otpEntity = await this.otpservice.findOne({email});
    let otp;
    if(!otpEntity) {
      otp = randomBytes(2).toString('hex');
      otpEntity = await this.otpservice.create({
        email,
        otp,
      });
    } else {
      otp = otpEntity.otp;
    }
    const url = 'OTP=' + otp;
      const text = `${url}`;

      return this.mailservice.sendMail({
        to: email,
        from: 'kusum.wappnet@gmail.com',
        subject: 'Email confirmation',
        text,
      });
    }
  }

  @Post('reset')
  async resetPassword(
    @Body('email') email: string,
    @Body('otp') otp: string,
    @Body('password') password: string,
  ) {
    const user = await this.userservice.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  
    const passwordReset = await this.otpservice.findOne({ email });
    if (!passwordReset || passwordReset.otp !== otp) {
      throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    }
    const isOldPasswordValid = await user.validatePassword(password);
    if (isOldPasswordValid) {
      throw new HttpException('New password cannot be the same as old password',HttpStatus.BAD_REQUEST);
    }
    user.password = password;
  await user.hashPassword();
  await user.save();
    return { message: 'Password reset successfully' };
  }
  
}
