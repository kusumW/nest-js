import { Module } from '@nestjs/common';
import { UserService } from './user.service';
// import { UsersEntity } from './user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { RoleGuard } from './role/role.guard';
import { jwtstrategy } from 'src/auth/guards/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports:[PassportModule,ProfileModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService,RoleGuard,jwtstrategy],
})
export class UserModule {}
