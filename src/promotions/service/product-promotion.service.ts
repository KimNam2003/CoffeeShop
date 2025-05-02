import { Product } from './../../databases/entities/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPromotion } from 'src/databases/entities/product-promotion.entity';
import { LessThan, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateProductPromotionDto } from '../dtos/product-promotion.dto';

@Injectable()
export class ProductPromotionService {
  constructor(
    @InjectRepository(ProductPromotion)
    private readonly productPromotionRepository: Repository<ProductPromotion>,
  ) {}



  // Create product promotion
  async create(createProductPromotionDto: CreateProductPromotionDto): Promise<ProductPromotion> {
    const productPromotion = this.productPromotionRepository.create(createProductPromotionDto);
    return this.productPromotionRepository.save(productPromotion);
  }

  async getPromotionsForProduct(productId: number): Promise<ProductPromotion[]> {
    return this.productPromotionRepository.find({
      where: { productId },
    });
  }

  // Get product promotion by ID
  async getActivePromotionsForProduct(productId: number, now: Date = new Date()): Promise<ProductPromotion[]> {
    return this.productPromotionRepository.find({
      where: {
        productId,
        startDate: LessThanOrEqual(now),
        endDate: MoreThanOrEqual(now),
      },
    });
  }
  
   
      // Delete product promotion
      async removeProductPromotion(productId: number, promotionId: number): Promise<void> {
        await this.productPromotionRepository.delete({
          productId,
          promotionId,
        });

        
  }
  async isPromotionActive(productId: number, promotionId: number, now: Date = new Date()): Promise<boolean> {
    const promotion = await this.productPromotionRepository.findOne({
      where: {
        productId,
        promotionId,
      },
    });
  
    if (!promotion) {
      return false; // Không có khuyến mãi cho sản phẩm này
    }
  
    return promotion.startDate <= now && promotion.endDate >= now;
  }
  async isProductUnderPromotion(productId: number, now: Date = new Date()): Promise<boolean> {
    const activePromotions = await this.productPromotionRepository.find({
      where: {
        productId,
        startDate: LessThanOrEqual(now),
        endDate: MoreThanOrEqual(now),
      },
    });
  
    return activePromotions.length > 0;
  }
  async getExpiredPromotions(now: Date = new Date()): Promise<ProductPromotion[]> {
    return this.productPromotionRepository.find({
      where: {
        endDate: LessThan(now), 
      },
    });
  }
  async removeExpiredPromotions(now: Date = new Date()): Promise<void> {
    const expiredPromotions = await this.getExpiredPromotions(now);
  
    for (const expiredPromotion of expiredPromotions) {
      await this.removeProductPromotion(expiredPromotion.productId, expiredPromotion.promotionId);
    }
}
}

 

