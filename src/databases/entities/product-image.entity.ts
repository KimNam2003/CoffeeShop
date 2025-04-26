import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  ProductImageID: number;

  @Column({ type: 'varchar', length: 255 })
  ImageURL: string;

  @ManyToOne(() => Product, (product) => product.Images)
  product: Product;
}
