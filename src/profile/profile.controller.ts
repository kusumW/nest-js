import { Request,Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {  Observable, of } from 'rxjs';
import{map, switchMap} from 'rxjs/operators'
import { pipe } from 'rxjs';
import {diskStorage} from 'multer';
import {v4 as uuidv4} from 'uuid';
import * as multer from 'multer';
import  Multer  from 'multer';
import { Express } from 'express';
import 'multer';



import parse from 'parse-json'
import path from 'path';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/Users/entities/user';
import { Profile } from './entities/profile.entity';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
    dest: './uploads',
  }))
  uploadFile(@UploadedFile() file:Express.Multer.File, @Request() req){
    const user:Profile=req.user.role;
    console.log(user);
    
    console.log(file);
    // return this.profileService.update(user.id,{profilePicture:file.filename}).pipe(
    //   switchMap((user:Profile)=>({profilePicture: user.profilePicture}))
    // )
  
    
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
