import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('ProductVariants')
export class ProductVariant {
  @PrimaryGeneratedColumn()
  VariantID: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'ProductID' })
  Product: Product;

  @Column()
  VariantName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  Price: number;

  @Column('int', { default: 0 })
  StockQuantity: number;

  @Column({ type: 'boolean', default: true })
  IsAvailable: boolean;
}
