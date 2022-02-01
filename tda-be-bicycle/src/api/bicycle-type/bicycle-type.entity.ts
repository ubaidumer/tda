import { local } from 'src/config/local/local.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class BicycleType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('json')
  name!: local;

  @Column('json',{nullable:true})
  description!:local;

  @Column({ length: 200,nullable:true })
  logo!: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default:0.0})
  static_price!: number;

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
