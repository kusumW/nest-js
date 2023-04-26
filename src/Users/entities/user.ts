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
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
// import {BaseEntity} from 'typeorm'
import * as bcrypt from 'bcryptjs';

import * as crypto from 'crypto';
import { Otp } from 'src/otp/entities/otp';
import Role from '../enum/role.enum';
import { Employee } from 'src/employees/entities/employee.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({type:'bigint'})
  id: number;

  @Column({length:70})
  name: string;

  @Column({length:40})
  email: string;

  @Column()
  age: number;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: [Role.Admin],
  })
  role: Role;

  @Column({ nullable: true })
  profileImage?: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Employee, (roles) => roles.user_id)
  user_id: Employee[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
  
  
}
