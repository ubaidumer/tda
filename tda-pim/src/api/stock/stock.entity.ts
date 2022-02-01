import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToOne, ManyToOne } from 'typeorm';
import { Location } from '../location/location.entity';
import { Product } from '../product/product.entity';
import { Supplier } from '../supplier/supplier.entity';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2})
  price_per_unit!:number;

  @Column()
  total_products!: number;

  @Column({nullable:true})
  delivery_date:Date;

  @Column()
  is_activated!: number;

  /*RELATIONS BETWEEN TABLES*/

  @ManyToOne(type => Product, product => product.stock) //no of pro Left
  product_!:number;

  @ManyToOne(type => Location, location => location.stock) //left  
  location_!:number;
  
  @ManyToOne(type => Supplier, supplier => supplier.stock) //left
  supplier_!:number;

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
