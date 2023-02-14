import { Department } from 'src/department/entities/department.entity';
import { Entity,BaseEntity,CreateDateColumn,Column, PrimaryGeneratedColumn, BeforeInsert, Repository, OneToOne, JoinColumn, ManyToOne} from 'typeorm';
import Role from '../../Users/enum/role.enum';
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
  JoiningDate:Date;
  @Column()
  Department:string;

  @Column({default:true})
  Status:boolean

  @Column({default:true})
  Suspended:Boolean

  @Column()
  @CreateDateColumn()
  createdAt:Date;
  length: number;


}



