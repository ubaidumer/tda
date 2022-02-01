import { local } from 'src/config/local/local.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { BicycleAttribute } from '../bicycle-attribute/bicycle-attribute.entity';

@Entity()
export class BicycleAttributeDetail {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('json')
  name!: local;

  @Column('json',{nullable:true})
  description!:local;

  @Column({default:0})
  quantity!: number;

  @Column('json',{nullable:true})
  per_day_price!:local;

  @Column({ length: 200,nullable:true })
  logo!: string;

  @Column()
  bicycle_attribute_id!: number 

  /*RELATIONS BETWEEN TABLES*/

  @ManyToOne(type => BicycleAttribute, b => b.id) //left
  @JoinColumn({name: 'bicycle_attribute_id'})
  bicycle_attribute!:number;

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
