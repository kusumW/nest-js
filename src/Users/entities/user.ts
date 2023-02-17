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
import { Otp } from 'src/otp/entities/otp';
import Role from '../enum/role.enum';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
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
  role: string[];

  @Column({ nullable: true })
  profileImage?: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;



  // @OneToOne(() => Otp,{
  //   eager:true,
  //   cascade: true
  // })
  // @JoinColumn()
  //   public otp: Otp

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
