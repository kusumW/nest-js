import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { Response } from 'express';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { Roles } from 'src/Users/roles/roles.decorator';
import Role from 'src/Users/enum/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/Users/role/role.guard';
import { Holiday } from './entities/holiday.entity';

@Controller('holidays')
export class HolidaysController {
  constructor(private readonly holidaysService: HolidaysService) {}

  @Roles(Role.Admin,Role.HR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post()
  async create(@Body() createHolidayDto: CreateHolidayDto,@Res() res: Response) {
    const holiday= await this.holidaysService.create(createHolidayDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'Holiday added',
      data: holiday,
    });
  }

  @Roles(Role.Admin,Role.HR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get()
  async findAll(@Res() res: Response){
    const holiday = await this.holidaysService.findAll();
    return res.status(HttpStatus.OK).json({
      message: 'holiday list',
      data: holiday,
    });
  }

  @Roles(Role.Admin,Role.HR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get(':id')
  async findOne(@Param('id') id: string,@Res() res: Response) {
    const holiday = await this.holidaysService.findOne(+id);
    if (!holiday) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'holiday not found',
        data: {},
      });
  }
  return res.status(HttpStatus.OK).json({
    message: 'holiday list',
    data: holiday,
  });
  }
  @Roles(Role.Admin,Role.HR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateHolidayDto: UpdateHolidayDto,@Res() res: Response) {
    const holiday = await this.holidaysService.findOne(+id);
    if (!holiday) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'holiday not found',
        data: {},
      });
    }
    const updateHoliday= await this.holidaysService.update(+id, updateHolidayDto);
    return res.status(HttpStatus.OK).json({
      message: 'holiday details updated',
      data: updateHoliday,
    });
  
  }

  @Roles(Role.Admin,Role.HR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Delete(':id')
  async remove(@Param('id') id: string,@Res() res: Response) {
    const holiday = await this.holidaysService.findOne(+id);
    if (!holiday) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'holiday not found',
        data: {},
      });
    }
    const deleteHoliday = await this.holidaysService.remove(+id);
    return res.status(HttpStatus.OK).json({
      message: 'holiday deleted',
      data: deleteHoliday,
    });
  }
}
