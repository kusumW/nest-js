import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { OtpDto } from 'src/otp/dto/otpDto';
import { MailerService } from '@nestjs-modules/mailer';
import { OtpService } from './otp.service';
import { Otp } from 'src/otp/entities/otp';
import { UserService } from 'src/Users/user.service';

@Controller('otp')
export class OtpController {
  constructor(
    private mailservice: MailerService,
    private otpservice: OtpService,
    private userservice: UserService,
  ) {}
  @Post('forgot')
  async forgotPassword(@Body('email') email: string) {
    //  await Otp.create(otpDto);
    // Step 1: Validate the email address
    // const { email,password}=authLoginDto;
    const user = await this.userservice.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      // Step 2: Generate a password reset token and send it to the user's email
      // const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      // send email with resetToken

      //const { email,token}=OtpDto;
      const otp = randomBytes(2).toString('hex');
      console.log(otp);

      const newotp = await this.otpservice.create({
        email,
        otp,
      });

      const url = 'OTP=' + otp;
      const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

      // await this.userservice.update(user.id, {
      //     resetToken,
      //     email: user.email,
      //     password: user.password,
      //     id: user.id
      // } );

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
    @Body('otp') otp: string,
    @Body('password') password: string,
    @Body('password_comfirm') password_comfirm: string,
  ) {
    if (password !== password_comfirm) {
      throw new HttpException('password not matched', HttpStatus.NOT_FOUND);
    }
    const passwordReset: any = await this.otpservice.findOne({ otp });

    // return passwordReset;
    const User = await this.userservice.findByEmail({
      email: passwordReset.email,
    });

    //  if(!User){
    //   throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    //  }

    await this.userservice.update(User.id, {
      password: User.password,
      email: User.email,
      id: User.id,
      role: User.role,
      age: User.age,
      profileImage:User.profileImage
    });
    return {
      message: 'success',
    };
  }
  //     Step 3: Store the password reset token in the database
}
