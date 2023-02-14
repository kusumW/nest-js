import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { get } from 'http';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { forgotPassworDto } from './dto/forgotpassword-dto';
import { MailerService } from '@nestjs-modules/mailer';
import { IsEmail } from 'class-validator';
import { Roles } from 'src/Users/roles/roles.decorator';
import Role from 'src/Users/enum/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/Users/role/role.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return await this.authService.login(authLoginDto);
  }

  @Post('signup')
  async signUp(@Body() authLoginDto: AuthLoginDto) {
    return await this.authService.create(authLoginDto);
  }

  //   @Post('forgot-password')
  // async forgotPassword(@Body() authLoginDto:AuthLoginDto): Promise<void> {
  //   var isEmailSent= this.authService.forgotPassword(authLoginDto);
  //   if(isEmailSent){
  //     throw new HttpException("LOGIN.EMAIL_SENT", null);
  //   } else {
  //     throw new HttpException("REGISTRATION.ERROR.MAIL_NOT_SENT",null);
  //   }
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'sucess login';
  }
}
