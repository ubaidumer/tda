import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne } from 'typeorm';
import { Measurement } from '../measurement/measurement.entity';
import { Product } from '../product/product.entity';

enum Type {
    LIST='List',
    TAG='Tag',
    COLOR='Color',
    SIZE='Size',
    WEIGHT='Weight',
    LENGTH='Length'
  }

@Entity()
@Unique(["name"])
export class Product_Attributes {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 500 })
  name!: string;

  @Column({ length: 100 })
  value!: string;
  
  @Column()
  is_activated!: number;

  @Column({
    type: "enum",
    enum: Type,
    default: null
  })
  type: Type;

  /*RELATIONS BETWEEN TABLES*/

  @ManyToOne(type => Product, product => product.product_attributes) //left
  product_!:number;

  @ManyToOne(type => Measurement, measurement => measurement.product_attributes) //left
  measuring__unit_!:number;

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

  