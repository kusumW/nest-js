import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profile')
export class userPhoto {
  static findOne(arg0: { firstName: string; lastName: string; }) {
    throw new Error('Method not implemented.');
  }
  static save(user: any) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  profilePicture: string;
}