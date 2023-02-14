import { Injectable } from '@nestjs/common';
import { Employee } from 'src/employees/entities/employee.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  async create(createDepartmentDto: CreateDepartmentDto) {
    const user = Department.create(createDepartmentDto);
    await user.save();
    return user;
  }

  async findAll() {
    return await Department.find();
  }

  async findOne(id: number) {
    return await Department.findOne(+id, { relations: ['employees'] });
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    await Department.update({ id }, updateDepartmentDto);
    return await Department.findOne({ id });
  }

  async remove(id: number) {
    await Department.delete({ id });
    return { deleted: true };
  }
}
