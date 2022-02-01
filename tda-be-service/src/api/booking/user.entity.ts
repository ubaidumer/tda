import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToOne, ManyToOne, OneToMany } from 'typeorm';
import { Booking } from './booking.entity';

@Entity({synchronize:false})
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  /*RELATIONS BETWEEN TABLES*/

  @OneToMany(type => Booking, booking => booking.user)
  booking!:number;

  ////////////////////////////

}
