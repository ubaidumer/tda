import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { Stock } from '../stock/stock.entity';


enum LocationType {
  WAREHOUSE='Warehouse',
  STORE='Store',
}

@Entity()
@Unique(["name"])
export class Location {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 500 })
  name!: string;
  
  @Column()
  is_activated!: number;

  @Column({
    type: "enum",
    enum: LocationType,
    default: LocationType.STORE
  })
  location_type: LocationType;

  @Column({ nullable: true })
  address!: string;

  @Column({ nullable: true })
  city!: string;

  @Column({ nullable: true })
  postal_code!: string;

  /*RELATIONS BETWEEN TABLES*/

  @OneToMany(type => Stock, stock => stock.id)
  stock!:number;

  ////////////////////////////

  @Column('timestamp')
  created_at!: Date;

  @Column({ nullable: true })
  created_by!: string;

  @Column('timestamp', { nullable: true })
  updated_at!: Date;

  @Column({ nullable: true })
  updated_by!: string;
}

  