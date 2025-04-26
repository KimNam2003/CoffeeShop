// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';


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
}
