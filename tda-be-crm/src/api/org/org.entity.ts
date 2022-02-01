import { local } from 'src/config/local/local.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@Unique(["email"])
@Unique(["mobile"])
@Unique(["website"])
export class Org {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('json')
  name!: local;

  @Column({ length: 100 , nullable: true})
  street!: string;

  @Column({ length: 100 , nullable: true})
  street_num!: string;

  @Column({ length: 100 , nullable: true})
  postal_code!: string;

  @Column({ length: 100 , nullable: true})
  city!: string;

  @Column({ length: 100 , nullable: true})
  province!: string;

  @Column({ length: 100 , nullable: true})
  country!: string;

  @Column({ length: 100 })
  email!: string;

  @Column({ length: 100 })
  phone_num!: string;

  @Column({ length: 100 })
  mobile!: string;

  @Column({ length: 100 })
  website!: string;

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

  @Column({ nullable: true })
  tag_ids!:string;
}
