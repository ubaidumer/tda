import { local } from 'src/config/local/local.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, UpdateDateColumn, CreateDateColumn, JoinColumn } from 'typeorm';
import { Catalog } from '../catalog/catalog.entity';
import { Category } from '../category/category.entity';
import { Product_Attributes } from '../product-attributes/product-attributes.entity';
import { Stock } from '../stock/stock.entity';
import { Supplier } from '../supplier/supplier.entity';
import { Tax } from '../tax/tax.entity';


enum Type {
  GROUPED='Grouped',
  PRODUCT='Product',
  DOWNLOAD='Download'
}

@Entity()
@Unique(["ean"])
@Unique(["sku"])
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('json')
  title!: local;

  @Column('json', { nullable: true})
  description!: local;

  @Column('text', { nullable: true})
  description_short!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2})
  price!:number;

  @Column({ type: 'decimal', precision: 10, scale: 2})
  price_sale!:number;

  @Column({ nullable: true })
  is_shippable!:number;

  @Column({
    type: "enum",
    enum: Type,
    default: null
  })
  type: Type;

  @Column({ nullable: true })
  tag_ids!: string;

  @Column({ nullable: true })
  is_taxed!:number;

  @Column({default:1})
  minimum_order!:number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable:true})
  weight!:number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable:true})
  size_height!:number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable:true})
  size_length!:number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable:true})
  size_width!:number;

  @Column({ length: 500, nullable:true })
  up_sell!: string;

  @Column({ length: 500, nullable:true })
  cross_sell!: string;

  @Column({ length: 50})
  ean!: string;

  @Column({ length: 50,nullable:true})
  sku!: string;

  @Column({ nullable: true })
  back_order!:number;

  @Column({nullable:true})
  min_stock!:number;

  @Column({default:0})
  is_activated!: number;

  @Column()
  supplier_id!:number;

  @Column()
  catalog_id!:number;

  @Column()
  product_category_id!:number;

  @Column()
  tax_class_id!:number;

  /*RELATIONS BETWEEN TABLES*/

  //@ManyToOne()
  //shipping_class_!:number;

  @ManyToOne(type => Supplier, supplier => supplier.product) // left
  @JoinColumn({name:'supplier_id'})
  supplier_!:number;

  @ManyToOne(type => Catalog, catalog => catalog.product) // inner
  @JoinColumn({name:'catalog_id'})
  catalog_!:number;
  
  @ManyToOne(type => Category, category => category.product) //left
  @JoinColumn({name:'product_category_id'})
  product__category_!:number;

  @ManyToOne(type => Tax, tax => tax.product) //left
  @JoinColumn({name:'tax_class_id'})
  tax__class_!:number;

  @OneToMany(type => Stock, stock => stock.id)
  stock!:number;

  @OneToMany(type => Product_Attributes, product_attribute => product_attribute.id)
  product_attributes!:number;

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
