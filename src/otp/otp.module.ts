import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { UserModule } from 'src/Users/user.module';
@Module({
  imports:[UserModule],
  providers: [OtpService],
  controllers: [OtpController]
})
export class OtpModule {}
