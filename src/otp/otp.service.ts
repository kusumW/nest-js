import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OtpDto } from 'src/otp/dto/otpDto';
import { Otp } from 'src/otp/entities/otp';

@Injectable()
export class OtpService {
  constructor(private mailservice: MailerService) {}
  async create(otpDto: OtpDto) {
    //return this Otp.save(otpDto);
    const user = Otp.create(otpDto);
    await user.save();
    return user;
  }

  async findOne(data: object) {
    return Otp.findOne(data);
  }
}
