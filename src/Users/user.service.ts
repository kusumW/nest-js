import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  Repository,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserOtpDto } from 'src/auth/dto/createUserOtp.dto';
import { User } from './entities/user';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { OtpService } from 'src/otp/otp.service';
import { Otp } from 'src/otp/entities/otp';
@Injectable()
export class UserService {
  constructor() {}

  findUsers() {
    return User.find({ relations: ['otp'] });
  }
  async create(CreateUserDto: CreateUserDto) {
    if (await User.findOne({ email: CreateUserDto.email })) {
      throw new ConflictException('User already exist');
    }
    const user = User.create(CreateUserDto);
    await user.save();
    delete user.password;
    return user;
  }
  async showById(id: number): Promise<User> {
    const user = await this.findById(id);
    delete user.password;
    return user;
  }
  async findAll() {
    return await User.find();
  }
  async findById(id: number) {
    return await User.findOne(id);
  }

  async findByEmail(email: any) {
    return await User.findOne({ where: { email: email } });
  }

  //   async delete(id: number) {
  //     return await User.destroy({where:{id}});
  // }
  async update(id: number, data: CreateUserDto) {
    // const hashedPassword = await bcrypt.hash(data.password, 10);
    await User.update({ id }, data);
    return await User.findOne({ id });
  }

  async destroy(id: number) {
    await User.delete({ id });
    return { deleted: true };
  }

  async createUserOtp(id: number, userOtpDto: UserOtpDto) {
    const user = User.findOne({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // const newProfile= await Otp.create(userOtpDto);
    // const savedotp= await Otp.save(newProfile);
    // (await user).otp=savedotp;
    // await (await user).save();
    // return user;
    // user.otp=savedotp;
    // return User.save(Otp);
 }

 public async setAvatar(userId: number, avatarUrl: string){
  User.update(userId, {profileImage: avatarUrl});
}
}
