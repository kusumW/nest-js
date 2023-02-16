import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  async create(createProfileDto: CreateProfileDto) {
    const user = Profile.create(createProfileDto);
    await user.save();
    return user;
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    const{imagePath}=updateProfileDto
   return Profile.update(id,{imagePath});
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
