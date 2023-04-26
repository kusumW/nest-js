import { Module } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports:[EmployeesModule],
  controllers: [LeaveController],
  providers: [LeaveService],
  exports:[LeaveService ]
})
export class LeaveModule {}
