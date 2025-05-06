import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cart } from './cart.entity';
import { Order } from "./order.entity";
import { Exclude } from "class-transformer";


@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  UserID: number;

  @Column({ length: 255 })
  FullName: string;

  @Column({ unique: true, length: 255 })
  Email: string;
  @Exclude()
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

  @OneToMany(() => Order, order => order.User)
  Orders: Order[]
  
  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;
}
