import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
  Param,
  Res,
  Req,
  HttpStatus,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/Users/entities/user';
import { UserService } from 'src/Users/user.service';
import { of } from 'rxjs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userservice: UserService,
  ) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return await this.authService.login(authLoginDto);
  }

  @Post('signup')
  async signUp(@Body() authLoginDto: AuthLoginDto) {
    return await this.authService.create(authLoginDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'sucess login';
  }

  @Post(':userid/profile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './profile',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadProfile(@Param('userid') userId: string,@Res() res: Response, @UploadedFile() file: any) {
    try {
      const user = await this.userservice.findById({where:{id:Number(userId)}});
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'User not found',
          data: null,
        });
      }
      if (!file) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'No file uploaded',
          data: null,
        });
      }
      await this.userservice.setAvatar(Number(userId), `${file.path}`);
      return res.status(HttpStatus.OK).json({
        message: 'File uploaded successfully',
        data: { fileUrl: `${file.path}` },
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to upload file',
        data: null,
      });
    }
  }
  
  @Get('avatars/:fileId')
  async serveProfile(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'avatars' });
  }
}
