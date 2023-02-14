import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "src/employees/entities/employee.entity";
import { isNotEmpty } from "class-validator";


@Entity('department')
export class Department extends BaseEntity{

    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
 
    Department:string;



 

}
