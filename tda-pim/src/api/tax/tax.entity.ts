import { local } from 'src/config/local/local.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
@Unique(["tax_code"])
export class Tax {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('json')
  name!: local;

  @Column({default:0})
  is_activated!: number;

  @Column({ length: 100 ,nullable:true})
  country!: string;

  @Column()
  percentage!: number;

  @Column()
  tax_code!: string;

  /*RELATIONS BETWEEN TABLES*/

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
