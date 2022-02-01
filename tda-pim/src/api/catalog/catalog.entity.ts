import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
@Unique(["name"])
export class Catalog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 500 })
  name!: string;

  @Column()
  is_activated!: number;

  @Column({ nullable: true })
  is_master!: number;

  @Column({ nullable: true })
  tag_ids!: string;

  @Column({ nullable: true })
  parent_id!: number;

  /*RELATIONS BETWEEN TABLES*/

  @OneToMany(type => Product, product => product.id)
  product!:number;

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
