import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { CreateProductPromotionDto } from '../dtos/product-promotion.dto';
import { ProductPromotion } from 'src/databases/entities/product-promotion.entity';
import { ProductPromotionService } from '../service/product-promotion.service';

@Controller('product-promotions')
export class ProductPromotionController {
  constructor(private readonly productPromotionService: ProductPromotionService) {}

  // Tạo khuyến mãi cho sản phẩm
  @Post()
  async create(
    @Body() createProductPromotionDto: CreateProductPromotionDto,
  ): Promise<ProductPromotion> {
    return this.productPromotionService.create(createProductPromotionDto);
  }

  // Lấy tất cả khuyến mãi của một sản phẩm
  @Get(':productId')
  async getPromotionsForProduct(
    @Param('productId') productId: number,
  ): Promise<ProductPromotion[]> {
    return this.productPromotionService.getPromotionsForProduct(productId);
  }

  // Lấy các khuyến mãi đang hoạt động cho sản phẩm
  @Get(':productId/active')
  async getActivePromotionsForProduct(
    @Param('productId') productId: number,
    @Query('now') now: string,
  ): Promise<ProductPromotion[]> {
    const currentTime = now ? new Date(now) : new Date();
    return this.productPromotionService.getActivePromotionsForProduct(
      productId,
      currentTime,
    );
  }

  // Xóa khuyến mãi của sản phẩm
  @Delete(':productId/:promotionId')
  async removeProductPromotion(
    @Param('productId') productId: number,
    @Param('promotionId') promotionId: number,
  ): Promise<void> {
    await this.productPromotionService.removeProductPromotion(
      productId,
      promotionId,
    );
  }

  // Kiểm tra xem sản phẩm có khuyến mãi đang áp dụng không
  @Get(':productId/is-under-promotion')
  async isProductUnderPromotion(
    @Param('productId') productId: number,
    @Query('now') now: string,
  ): Promise<boolean> {
    const currentTime = now ? new Date(now) : new Date();
    return this.productPromotionService.isProductUnderPromotion(
      productId,
      currentTime,
    );
  }

  // Lấy các khuyến mãi hết hạn
  @Get('expired')
  async getExpiredPromotions(@Query('now') now: string): Promise<ProductPromotion[]> {
    const currentTime = now ? new Date(now) : new Date();
    return this.productPromotionService.getExpiredPromotions(currentTime);
  }

  // Xóa các khuyến mãi hết hạn
  @Delete('expired')
  async removeExpiredPromotions(@Query('now') now: string): Promise<void> {
    const currentTime = now ? new Date(now) : new Date();
    await this.productPromotionService.removeExpiredPromotions(currentTime);
  }
}
