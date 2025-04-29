// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Order } from './order.entity';
import { Cart } from './cart.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  UserID: number;

  @Column({ length: 255 })
  FullName: string;

  @Column({ unique: true, length: 255 })
  Email: string;

  @Column({ length: 255 })
  Password: string;

  @Column({ nullable: true })
  AvatarURL: string;

  @Column({
    type: 'enum',
    enum: ['customer', 'employee', 'admin'],
    default: 'customer',
  })
  Role: string;

  @CreateDateColumn({ type: 'datetime' })
  CreatedAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  UpdatedAt: Date;

  // @OneToMany(() => Order, order => order.User)
  // Orders: Order[];
  
  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;
}
