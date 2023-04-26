import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { RoleGuard } from '../Users/role/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { jwtstrategy } from 'src/auth/guards/jwt.strategy';
import { UserModule } from 'src/Users/user.module';
import { DepartmentModule } from 'src/department/department.module';

@Module({
  imports:[UserModule,],
  controllers: [EmployeesController],
  providers: [EmployeesService, RoleGuard, JwtAuthGuard, jwtstrategy],
  exports: [EmployeesService]
})
export class EmployeesModule {}
