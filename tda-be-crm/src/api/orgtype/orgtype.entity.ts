import { local } from 'src/config/local/local.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Orgtype {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('json')
  name!: local;

  @Column({default:0})
  is_activated!: number;

  @Column('json',{ nullable: true})
  description!: local;

  @CreateDateColumn()
  created_at!: Date;

  @Column({ nullable: true })
  created_by!: string;

  @UpdateDateColumn()
  updated_at!: Date;

  @Column({ nullable: true })
  updated_by!: string;
}
