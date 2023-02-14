import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';

import bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserOtpDto } from 'src/auth/dto/createUserOtp.dto';
import { Roles } from './roles/roles.decorator';
import Role from './enum/role.enum';
import { RoleGuard } from './role/role.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get()
  @Roles(Role.Admin)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('get')
  getUsers() {
    return this.userService.findUsers();
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.Admin)
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.userService.showById(+id);
  }

  @Get('/email')
  async findByEmail(email: string) {
    return this.userService.findByEmail(email);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.Admin)
  @Post('create')
  async create(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.create(CreateUserDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: CreateUserDto) {
    return this.userService.update(id, data);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async destroy(@Param('id') id: number) {
    return this.userService.destroy(id);
  }

  @Post(':id/otp')
  createUserOtp(@Param('id') id: number, @Body() userOtpDto: UserOtpDto) {
    console.log('sdas');
    return this.userService.createUserOtp(id, userOtpDto);
  }
}
