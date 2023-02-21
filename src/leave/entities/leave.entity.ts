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

  @Column({ name: 'leave reason' })
  leavereason: string;

  @Column({ name: 'assigned work status' })
  assignedworkstatus: string;

  @Column({ name: 'HR status' ,default:'pending'})
  status: string;

  @Column({ name: 'action taken on' })
  actiontakenon: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @CreateDateColumn()
  updateddAt: Date;
}
