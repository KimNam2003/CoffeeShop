import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductPromotion } from './product-promotion.entity';

@Entity('Promotions')
export class Promotion {
  @PrimaryGeneratedColumn({name : 'PromotionID'})
  promotionId: number;

  @Column({name: 'Name', type: 'varchar', length: 255 })
  name: string;

  @Column({name : 'DiscountType', type: 'enum', enum: ['Percentage', 'FixedPrice'], default: 'Percentage' })
  discountType: 'Percentage' | 'FixedPrice';

  @Column({ name: 'DiscountValue',type: 'decimal', precision: 10, scale: 2 })
  discountValue: number;

  @OneToMany(() => ProductPromotion, (productPromotion) => productPromotion.promotion)
  productPromotions: ProductPromotion[];
}
