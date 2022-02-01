import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToOne, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

enum Status {
    PENDING='Pending',
    IN_PROGRESS='In_Progress',
    CANCELLED='Cancelled',
    COMPLETED='Completed'
  }

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING
  })
  status: Status;

  @Column({type:"time"})
  start_time:String;

  @Column({type:"time"})
  end_time:String;

  @Column()
  booking_date:Date;

  @Column()
  user_id:number;


  /*RELATIONS BETWEEN TABLES*/

  @ManyToOne(type => User, user => user.id) //left
  @JoinColumn({name: 'user_id'})
  user!:number;

  ////////////////////////////

  @Column()
  is_activated!: number;

  @CreateDateColumn()
  created_at!: Date;

  @Column({ nullable: true })
  created_by!: string;

  @UpdateDateColumn()
  updated_at!: Date;

  @Column({ nullable: true })
  updated_by!: string;
}
