// order-detail.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { ProductVariant } from './product-variant.entity';

@Entity('OrderDetails')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  OrderDetailID: number;

  @ManyToOne(() => Order, order => order.OrderDetails)
  @JoinColumn({ name: 'OrderID' })
  Order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'ProductID' })
  Product: Product;

  @ManyToOne(() => ProductVariant)
  @JoinColumn({ name: 'VariantID' })
  Variant: ProductVariant;

  @Column('int')
  Quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  Price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  Total: number;





}
