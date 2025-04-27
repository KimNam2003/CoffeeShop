import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'shippingAddressId' })
  shippingAddress: Address;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @Column({ type: 'enum', enum: ['Pending', 'Completed', 'Canceled', 'InProgress'], default: 'Pending' })
  status: 'Pending' | 'Completed' | 'Canceled' | 'InProgress';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discountAmount: number;

  @Column({ type: 'enum', enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' })
  paymentStatus: 'Pending' | 'Paid' | 'Failed';

  @Column({ type: 'enum', enum: ['Delivery', 'Pickup'], default: 'Delivery' })
  shippingType: 'Delivery' | 'Pickup';

  @Column({ type: 'enum', enum: ['Cash', 'CreditCard', 'E-Wallet', 'BankTransfer'], default: 'Cash' })
  paymentMethod: 'Cash' | 'CreditCard' | 'E-Wallet' | 'BankTransfer';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
