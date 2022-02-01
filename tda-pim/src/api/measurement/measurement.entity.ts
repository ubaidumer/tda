import { local } from 'src/config/local/local.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Product_Attributes } from '../product-attributes/product-attributes.entity';

@Entity()
@Unique(["short_name"])
export class Measurement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('json')
  name!: local;

  @Column({ length: 100 })
  short_name!: string;

  @Column({ nullable: true })
  is_master!: number;

  @Column({ nullable: true })
  parent_id!: number;

  @Column({default:0})
  is_activated!: number;

  /*RELATIONS BETWEEN TABLES*/

  @OneToMany(type => Product_Attributes, product_attribute => product_attribute.id)
  product_attributes!:number;

  ////////////////////////////

  @CreateDateColumn()
  created_at!: Date;

  @Column({ nullable: true })
  created_by!: string;

  @UpdateDateColumn()
  updated_at!: Date;

  @Column({ nullable: true })
  updated_by!: string;
}
