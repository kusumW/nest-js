import { Injectable } from '@nestjs/common';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { Leave } from './entities/leave.entity';

@Injectable()
export class LeaveService {
  async create(createLeaveDto: CreateLeaveDto) {
    Leave.create(createLeaveDto).save();
    
  }

  async findAll() {
    return await Leave.find();
  }

  async findOne(id: number) {
    return await Leave.findOne(+id);
  }

  async update(id: number, updateLeaveDto: UpdateLeaveDto) {
    await Leave.update({ id }, updateLeaveDto);
    return await Leave.findOne({ id });
  }

  async remove(id: number) {
    await Leave.delete({ id });
    return { deleted: true };
  }
}
