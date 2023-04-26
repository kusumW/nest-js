import { Department } from 'src/department/entities/department.entity';
import { Leave } from 'src/leave/entities/leave.entity';
import { User } from 'src/Users/entities/user';
import { Entity,BaseEntity,CreateDateColumn,Column, PrimaryGeneratedColumn, BeforeInsert, Repository, OneToOne, JoinColumn, ManyToOne, UpdateDateColumn, OneToMany} from 'typeorm';
import employees from '../../employees/enum/employee.enum';


@Entity('employees')
export class Employee extends BaseEntity {
 
  @PrimaryGeneratedColumn({type:'bigint'})
  id: number;

  @Column({length:70})
  name: string;

  @Column({length:70})
  email: string;

  @Column({length:70})
  personal_email: string;

  @Column()
  age: number;

  @Column()
  birth_date:Date;

  @Column()
  joining_date:Date;

  @Column({ default: employees.Enabled ,type: 'enum',
  enum: employees,})
  status:employees;

  @Column({ default: employees.NO,type: 'enum',
  enum: employees, })
  suspended:employees;

  @Column()
  @CreateDateColumn()
  created_at:Date;

  @Column()
  @UpdateDateColumn()
  updated_at:Date;

  @OneToOne(()=>User,{nullable:false})
  @JoinColumn({ name:'user_id', referencedColumnName: 'id'})
  user_id:number;

  @ManyToOne(()=>Department,{nullable:false})
  @JoinColumn({ name:'department_id', referencedColumnName: 'id'})
  department_id:number;

  @OneToMany(() => Leave, (employee) => employee.employee_id)
  employee_id: Leave[];



}



