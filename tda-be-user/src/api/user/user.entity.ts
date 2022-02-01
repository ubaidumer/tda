import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

enum Gender{
    MALE='Male',
    FEMALE='Female'
}

enum UserType{
    CUSTOMER='Customer',
    ADMIN='Admin'
}

@Entity()
@Unique(['keycloak_id'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  first_name!: string;

  @Column({ length: 200 })
  last_name!: string;

  @Column({ length: 100 })
  email!: string;

  @Column({
    type: "enum",
    enum: Gender,
    default: null,
    nullable:true
  })
  gender!:Gender;

  @Column({ nullable: true })
  address!: string;

  @Column({ nullable: true })
  city!: string;

  @Column({ nullable: true })
  country!: string;

  @Column({ nullable: true })
  postal_code!: string;

  @Column({
    type: "enum",
    enum: UserType,
    default: UserType.CUSTOMER
  })
  user_type!:UserType;

  @Column()
  keycloak_id:string;

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
