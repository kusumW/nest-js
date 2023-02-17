import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HolidaysService } from './holidays.service';
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

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post()
  create(@Body() createHolidayDto: CreateHolidayDto) {
    return this.holidaysService.create(createHolidayDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get()
  async findAll() :Promise<Holiday[]>{
    const user= await this.holidaysService.findAll();
    console.log(user.map(h => `${h.title} (${h.date.toLocaleString('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' })})`));
    return user;
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.holidaysService.findOne(+id);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHolidayDto: UpdateHolidayDto) {
    return this.holidaysService.update(+id, updateHolidayDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.holidaysService.remove(+id);
  }
  @Get('upcoming')
  async getUpcomingHolidays() {
    return this.holidaysService.getUpcomingHolidays();
  }
}
