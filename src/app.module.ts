import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
 import { User } from './Users/entities/user';

import { UserModule } from './Users/user.module';
import { Entity } from 'typeorm';
import { AuthModule } from './auth/auth.module';
;
import { MailerModule } from '@nestjs-modules/mailer';
import { Otp } from './otp/entities/otp';
import { OtpModule } from './otp/otp.module';
import { EmployeesModule } from './employees/employees.module';
import { Employee } from './employees/entities/employee.entity';
import { RoleGuard } from './Users/role/role.guard';
import { DepartmentModule } from './department/department.module';
import { Department } from './department/entities/department.entity';
import { ConfigModule } from '@nestjs/config';


const entities=[User,Otp,Employee,Department];
@Module({
  imports: [ ConfigModule.forRoot(),MailerModule.forRoot({
    transport:{
      host:process.env.Host,
      auth:{
        user:process.env.USER,
        pass:process.env.PASS
      }
    }
  }),TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'nestjs_mysql_crud_app',
    entities: entities,
    synchronize: true,
  }), UserModule, AuthModule, OtpModule, EmployeesModule, DepartmentModule],
  controllers: [AppController],
  providers: [AppService,RoleGuard]

})
export class AppModule {}
