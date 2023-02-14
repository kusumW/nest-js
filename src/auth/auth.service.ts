import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/Users/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from 'src/Users/entities/user';
import { forgotPassworDto } from './dto/forgotpassword-dto';
import { use } from 'passport';

import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDto } from 'src/Users/dto/create-user.dto';
import { randomBytes } from 'crypto';
@Injectable()
export class AuthService {
  constructor(
    private userservice: UserService,
    private jwtservice: JwtService,
    private mailservice: MailerService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);
    const payload = {
      userId: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      age: user.age,
    };
    return {
      user,
      acess_token: this.jwtservice.sign(payload),
    };
  }

  async create(authLoginDto: AuthLoginDto) {
    //const token = Math.floor(1000 + Math.random() * 9000).toString();
    const user = User.create(authLoginDto);
    await user.save();
    delete user.password;
    //await this.mailservice.plainTextEmail(user, token);
    return user;
  }

  async validateUser(authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;
    const user = await this.userservice.findByEmail(email);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }
    return user;
  }

  // async forgotPassword(authLoginDto:AuthLoginDto): Promise<void> {
  //     // Step 1: Validate the email address
  //     const { email,password}=authLoginDto;
  //     const user = await this.userservice.findByEmail(email);
  //     if (!user) {
  //       throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //     }
  //     else{

  //     // Step 2: Generate a password reset token and send it to the user's email
  //     // const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  //     // send email with resetToken
  //     const otp = randomBytes(2).toString('hex');
  //     console.log(otp);

  //     const url = 'OTP='+otp;
  //     const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

  //     // await this.userservice.update(user.id, {
  //     //     resetToken,
  //     //     email: user.email,
  //     //     password: user.password,
  //     //     id: user.id
  //     // } );

  //     return this.mailservice.sendMail({
  //         to: email,
  //         from:'kusum.wappnet@gmail.com',
  //         subject: 'Email confirmation',
  //         text,
  //       })
  //     }
  // //     Step 3: Store the password reset token in the database
  //   }
}
