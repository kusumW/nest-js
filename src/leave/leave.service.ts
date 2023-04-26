import { Injectable } from '@nestjs/common';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/create-leave.dto';
import { Leave } from './entities/leave.entity';

@Injectable()
export class LeaveService {
  async create(createLeaveDto: CreateLeaveDto) {
    const user = Leave.create(createLeaveDto);
    await user.save();
    return user;
  }

  async findAll() {
    return await Leave.find();
  }

  async findOne(id: number) {
    return await Leave.findOne(+id);
  }

  async find(query: object) {
    return await Leave.findOne(query);
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
