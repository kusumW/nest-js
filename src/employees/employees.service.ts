import { ConflictException, Injectable } from '@nestjs/common';
import { Department } from 'src/department/entities/department.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  async create(createEmployeeDto: CreateEmployeeDto) {
    if (await Employee.findOne({ Email: createEmployeeDto.Email })) {
      throw new ConflictException('User already exist');
    }
    const user = Employee.create(createEmployeeDto);
    await user.save();
    return user;
  }
  async findAll() {
    return await Employee.find();
  }
  async findOne(id: number) {
    return await Employee.findOne(+id);
  }


  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    await Employee.update({ id },updateEmployeeDto);
    return await Employee.findOne({ id });
  }

  async remove(id: number) {
    await Employee.delete({ id });
    return { deleted: true };
  }
}
