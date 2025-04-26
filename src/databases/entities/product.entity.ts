import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ProductImage } from './product-image.entity';

@Entity('Products')
export class Product {
  @PrimaryGeneratedColumn()
  ProductID: number;

  @Column()
  Name: string;

  @Column({ nullable: true })
  Description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  Price: number;

  @Column({ default: true })
  IsAvailable: boolean;

  @Column( { default: 0 })
  StockQuantity: number;

  @Column({ default: true })
  IsActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  UpdatedAt: Date;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  Images: ProductImage[];

}
