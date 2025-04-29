import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('Addresses')
export class Address {
  @PrimaryGeneratedColumn()
  AddressID: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'UserID' })
  User: User;

  @Column()
  Address: string;

  @Column()
  PhoneNumber: string;

  @Column({ type: 'boolean', default: false })
  IsPrimary: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  UpdatedAt: Date;
}
