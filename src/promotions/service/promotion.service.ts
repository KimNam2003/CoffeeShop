import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from 'src/databases/entities/promotion.entity';
import { Between, Repository } from 'typeorm';
import { CreatePromotionDto, UpdatePromotionDto } from '../dtos/promotion.dto';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
  ) {}

  // Create promotion
  async create(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    // Kiểm tra xem có Promotion với tên trùng lặp không
    const existingPromotion = await this.promotionRepository.findOne({
      where: { name: createPromotionDto.name },
    });
    if (existingPromotion) {
      throw new Error(`Promotion with name ${createPromotionDto.name} already exists`);
    }
  
  
    // Tạo đối tượng Promotion và lưu vào DB
    const promotion = this.promotionRepository.create({
        name: createPromotionDto.name,
        discountType: createPromotionDto.discountType,
        discountValue: createPromotionDto.discountValue,
    }) // Khởi tạo mảng rỗng cho productPromotions
    return this.promotionRepository.save(promotion);
  }
  
  // Get all promotions
  async findAll(): Promise<Promotion[]> {
    return this.promotionRepository.find();
  }

  async findOne(promotionId: number): Promise<Promotion> {
    const promotion = await this.promotionRepository.findOne({
      where: { promotionId },  
    });
  
    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${promotionId} not found`);
    }
  
    return promotion;
  }

  // Update promotion
  async update(id: number, updatePromotionDto: UpdatePromotionDto): Promise<Promotion> {
    const promotion = await this.findOne(id); // Check if promotion exists
    // Apply updates
    Object.assign(promotion, updatePromotionDto);
    return this.promotionRepository.save(promotion); // Save the updated entity
  }

  // Delete promotion
  async remove(id: number): Promise<void> {
    const promotion = await this.findOne(id); // Check if promotion exists
    await this.promotionRepository.remove(promotion); // Use remove to ensure it's deleted properly
  }


}
