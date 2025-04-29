import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './product.entity';
import { ProductVariant } from './product-variant.entity';

@Entity('CartItems')
export class CartItem {
  @PrimaryGeneratedColumn({ name: 'CartItemID' })
  cartItemId: number;

  @Column({ name: 'CartID' })
  cartId: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'CartID' })
  cart: Cart;

  @Column({ name: 'ProductID' })
  productId: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'ProductID' })
  product: Product;

  @Column({ name: 'VariantID' })  
  variantId: number;

  @ManyToOne(() => ProductVariant)
  @JoinColumn({ name: 'VariantID' })
  variant: ProductVariant;

  @Column({ name: 'Quantity' })
  quantity: number;

  @Column('decimal', {name :'Price', precision: 10, scale: 2 } )
  price: number;

  @Column('decimal', {name :'Total', precision: 10, scale: 2 } )
  total: number;

  @Column({ name: 'CreatedAt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'UpdatedAt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
