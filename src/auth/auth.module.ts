import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/Users/user.module';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { jwtstrategy } from './guards/jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { from } from 'rxjs';

import { OtpModule } from 'src/otp/otp.module';
import { RoleGuard } from 'src/Users/role/role.guard';

@Module({
  imports: [
    UserModule,
    PassportModule,
    OtpModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: 'SPI',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, jwtstrategy],
})
export class AuthModule {}
