// order.entity.ts
import { User } from './user.entity';
import { Address } from './address.entity';
import { OrderDetail } from './orderDetai.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Orders')
export class Order {
  @PrimaryGeneratedColumn()
  OrderID: number;

  @ManyToOne(() => User, (user) => user.Orders)
  @JoinColumn({ name: 'UserID' })
  User: User;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'ShippingAddressID' })
  ShippingAddress: Address;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  OrderDate: Date;

  @Column({ type: 'enum', enum: ['Pending', 'Completed', 'Canceled', 'InProgress'], default: 'Pending' })
  Status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  TotalAmount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  DiscountAmount: number;

  @Column({ type: 'enum', enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' })
  PaymentStatus: string;

  @Column({ type: 'enum', enum: ['Delivery', 'Pickup'], default: 'Delivery' })
  ShippingType: string;

  @Column({ type: 'enum', enum: ['Cash', 'CreditCard', 'E-Wallet', 'BankTransfer'], default: 'Cash' })
  PaymentMethod: string;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.Order)
  OrderDetails: OrderDetail[];
}
