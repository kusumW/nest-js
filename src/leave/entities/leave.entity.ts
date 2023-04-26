export enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

import { Employee } from 'src/employees/entities/employee.entity';
import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity('leave')
export class Leave extends BaseEntity {
  @PrimaryGeneratedColumn({type:'bigint'})
  id: number;

  @Column({length:70})
  subject: string;

  @Column({length:70})
  name: string;

  @Column({type:'text',nullable:true})
  description: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({ name: 'leave reason' ,length:100})
  reason: string;

  @Column({ name: 'assigned work status' ,nullable:true,length:70})
  assignedworkstatus: string;

  @Column({default:Status.PENDING,type: 'enum',
  enum: Status,})
  status: Status;

  @Column({ name: 'action taken on',default:'none',length:10 })
  actiontakenon: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(()=>Employee,{nullable:false})
  @JoinColumn({ name:'employee_id', referencedColumnName: 'id'})
  employee_id:number;
}
