import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "src/employees/entities/employee.entity";
import { isNotEmpty } from "class-validator";


@Entity('department')
export class Department extends BaseEntity{ 
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;

    @Column({length:70})
    department:string;

    @OneToMany(() => Employee, (department) => department.department_id)
    department_id: Employee[];

    @Column()
    @CreateDateColumn()
    created_at: Date;
  
    @Column()
    @UpdateDateColumn()
    updated_at: Date;
  



 

}
