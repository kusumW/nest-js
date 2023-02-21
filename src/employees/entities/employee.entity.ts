import { Department } from 'src/department/entities/department.entity';
import { Entity,BaseEntity,CreateDateColumn,Column, PrimaryGeneratedColumn, BeforeInsert, Repository, OneToOne, JoinColumn, ManyToOne} from 'typeorm';
import employees from '../../employees/enum/employee.enum';
// import {BaseEntity} from 'typeorm'


@Entity('employees')
export class Employee extends BaseEntity {
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column()
  Email: string;

  @Column()
  PersonalEmail: string;

  @Column()
  Age: number;

  @Column()
  Birthdate:Date;

  @Column()
  JoiningDate:Date;
  @Column()
  Department:string;

  @Column({ default: employees.Enabled })
  Status:string;

  @Column({ default: employees.NO })
  Suspended:string;

  @Column()
  @CreateDateColumn()
  createdAt:Date;
  length: number;


}



