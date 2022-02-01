import { local } from 'src/config/local/local.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Product } from '../product/product.entity';
import { Stock } from '../stock/stock.entity';

@Entity()
@Unique(["mobile"])
@Unique(["email"])
@Unique(["tax_number"])
@Unique(["coc_number"])
export class Supplier {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('json')
  name!: local;

  @Column({ length: 100 })
  phone_num!: string;

  @Column({ length: 100 })
  mobile!: string;

  @Column({ length: 100 })
  email!: string;

  @Column({ nullable: true })
  is_a_company!: number;

  @Column({ length: 100,nullable: true })
  address!: string;

  @Column({ length: 100 })
  coc_number!: string;

  @Column({ length: 100 })
  tax_number!: string;

  @Column({default:0})
  is_activated!: number;

  /*RELATIONS BETWEEN TABLES*/
  
  @OneToMany(type => Stock, stock => stock.id)
  stock!:number;

  @OneToMany(type => Product, product => product.id)
  product!:number;

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
