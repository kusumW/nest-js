import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { EmployeesModule } from 'src/employees/employees.module';
import { RoleGuard } from 'src/Users/role/role.guard';

@Module({
  imports:[EmployeesModule],
  controllers: [DepartmentController],
  providers: [DepartmentService,RoleGuard]
})
export class DepartmentModule {}
