import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { Exclude } from 'class-transformer';

@Entity('ProductImages')
export class ProductImage {
  @PrimaryGeneratedColumn()
  ImageID: number;

  @Column()
  ProductID: number; 

  @Column({ length: 255 })
  ImageURL: string;

  @Column({ default: false })
  IsMain: boolean;

  @CreateDateColumn()
  CreatedAt: Date;

  @ManyToOne(() => Product, (product) => product.Images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ProductID' }) 
  @Exclude()
  product: Product;
}
