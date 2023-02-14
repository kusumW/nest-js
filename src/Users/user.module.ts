import { Module } from '@nestjs/common';
import { UserService } from './user.service';
// import { UsersEntity } from './user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { RoleGuard } from './role/role.guard';
import { jwtstrategy } from 'src/auth/guards/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[PassportModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService,RoleGuard,jwtstrategy],
})
export class UserModule {}
