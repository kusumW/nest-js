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
      user_id: user.id,
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
    console.log(user)
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
  
    const isValidPassword = await user.validatePassword(password);
    console.log(isValidPassword);
    
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    return user;
  }
  

  async update(userId: number, imageUrl: string): Promise<void> {
    try {
      await User.update(userId, { profileImage: imageUrl });
    } catch (error) {
      throw error;
    }
  }
}
