import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Holidays from '../enum/holiday.enum';

@Entity('holiday')
export class Holiday extends BaseEntity {
  @PrimaryGeneratedColumn({type:"bigint"})
  id: number;

  @Column({length:70})
  title: string;

  @Column()
  date: Date;

  @Column({ default: Holidays.YES,type: 'enum',
  enum: Holidays, })
  isOptional: Holidays;

  @Column({ default: Holidays.Enabled,type: 'enum',
  enum: Holidays, })
  status: Holidays;
  
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
