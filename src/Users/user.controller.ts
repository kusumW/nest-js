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
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './roles/roles.decorator';
import Role from './enum/role.enum';
import { RoleGuard } from './role/role.guard';
import { Response } from 'express';
import { Not } from 'typeorm';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  // @Roles(Role.Admin,Role.HR)
  @Post('create')
  async create(@Body() CreateUserDto: CreateUserDto,@Res() res: Response) {
    const user = await this.userService.create(CreateUserDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'employee created',
      data: user,
    });
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get()
  @Roles(Role.HR,Role.Admin)
  async findAll( @Res() res: Response) {
    const user= await this.userService.findAll();
    return res.status(HttpStatus.OK).json({
      message: 'user list',
      data: user,
    });
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.HR,Role.Admin)
  @Get('/:id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const user = await this.userService.findById({ id });

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'user not found',
        data: {},
      });
    }
    return res.status(HttpStatus.OK).json({
      message: 'user list',
      data: user,
    });
  }

  @Get('/email')
  async findByEmail(email: string) {
    return this.userService.findByEmail(email);
  }


  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.HR,Role.Admin)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.userService.findById({ id });

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'user not found',
        data: {},
      });
    }

    const findemail = await this.userService.findBy({
      where:
        {  email:data.email,
          id:Not(id)
        }
        
      });

    if (findemail) {
      return res.status(HttpStatus.CONFLICT).json({
        message: 'email already exist',
        data: {},
      });
    }
    const update= await this.userService.update(id, data);
    return res.status(HttpStatus.OK).json({
      message: 'user details updated',
      data: update,
    });
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.Admin,Role.HR)
  @Delete(':id')
  async destroy(@Param('id') id: number, @Res() res: Response) {
    const user = await this.userService.findById({ id });
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'user not found',
        data: {},
      });
    }
    await this.userService.destroy(id);
    return res.status(HttpStatus.OK).json({
      message: 'user deleted',
      data: user,
    });
  }
}
