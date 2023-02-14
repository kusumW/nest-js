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
} from 'typeorm';
// import {BaseEntity} from 'typeorm'
import * as bcrypt from 'bcryptjs';

import * as crypto from 'crypto';
import { User } from 'src/Users/entities/user';

@Entity('otp')
export class Otp extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  otp: string;
}
