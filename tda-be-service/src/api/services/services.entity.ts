import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Services {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({length: 200})
  name!:String;

  @Column({type:"text",nullable:true})
  description!:String;

  @Column({default:0})
  parent_id!: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default:0.0})
  price!: number;

  @Column({type:"int"})
  estimated_service_time!: number;

  @Column()
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
