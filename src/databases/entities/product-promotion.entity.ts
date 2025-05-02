import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';
import { Promotion } from './promotion.entity';

@Entity('ProductPromotions')
export class ProductPromotion {
  @PrimaryColumn({name: 'ProductID'})
  productId: number;

  @PrimaryColumn({name: 'PromotionID'})
  promotionId: number;

  @ManyToOne(() => Product, (product) => product.productPromotions)
  @JoinColumn({ name: 'ProductID' })
  product: Product;

  @ManyToOne(() => Promotion, (promotion) => promotion.productPromotions)
  @JoinColumn({ name: 'PromotionID' })
  promotion: Promotion;

  @Column({ name: 'StartDate',type: 'datetime' })
  startDate: Date;

  @Column({ name: 'EndDate',type: 'datetime' })
  endDate: Date;
}
