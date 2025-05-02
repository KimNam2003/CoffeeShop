import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { CartItem } from 'src/databases/entities/cart-item.entity';

@Entity('Carts')
export class Cart {
  @PrimaryGeneratedColumn({ name: 'CartID' })
  cartId: number;

  @Column({ name: 'UserID' })
  userId: number;

  @OneToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserID' })
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];

  @Column({ name: 'CreatedAt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'UpdatedAt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
