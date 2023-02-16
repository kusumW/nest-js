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
  
  @Entity('profile')
  export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({name:"First Name"})
    firstName: string;
  
    @Column({name:"Last Name"})
    lastName: string;
 
    @Column({nullable:true})
    profilePicture:string
    
    @Column({nullable:true})
    imagePath:string

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @CreateDateColumn()
    updateddAt: Date;
   
  }
  
