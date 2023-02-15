import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  Repository,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Leaves from '../enum/leave.enum';

@Entity('leave')
export class Leave extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ name: 'leave_reason' })
  leavereason: Date;

  @Column({ name: 'assigned_work_status' })
  assignedworkstatus: Date;

  @Column({ default: Leaves.Enabled })
  status: Leaves;

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}
