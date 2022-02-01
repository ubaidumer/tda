import { local } from 'src/config/local/local.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { BicycleType } from '../bicycle-type/bicycle-type.entity';

@Entity()
export class BicycleFrame {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('json')
  name!: local;

  @Column('json',{nullable:true})
  description!:local;

  @Column({default:0})
  minimuim_product_alert!: number;

  @Column({default:0})
  turn_on_minimum_product_alert!: number;

  @Column({default:0})
  quantity!: number;

  @Column('json',{nullable:true})
  per_day_price!:local;

  @Column({ length: 200,nullable:true })
  logo!: string;

  @Column()
  bicycle_type_id!: number 

  /*RELATIONS BETWEEN TABLES*/

  @ManyToOne(type => BicycleType, b => b.id) //left
  @JoinColumn({name: 'bicycle_type_id'})
  bicycle_type!:number;

  ////////////////////////////

  @Column({default:0})
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
