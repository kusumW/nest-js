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
import Holidays from '../enum/holiday.enum';

@Entity('holiday')
export class Holiday extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: Date;

  @Column({ default: Holidays.YES })
  isOptional: Holidays;

  @Column({ default: Holidays.Enabled })
  status: Holidays;

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}
