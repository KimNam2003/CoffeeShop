import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { CreatePromotionDto, UpdatePromotionDto } from '../dtos/promotion.dto';
import { Promotion } from 'src/databases/entities/promotion.entity';
import { PromotionService } from '../service/promotion.service';

@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  // Tạo khuyến mãi
  @Post()
  async create(@Body() createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    return this.promotionService.create(createPromotionDto);
  }

  // Lấy tất cả khuyến mãi
  @Get()
  async findAll(): Promise<Promotion[]> {
    return this.promotionService.findAll();
  }

  // Lấy thông tin khuyến mãi theo ID
  @Get(':promotionId')
  async findOne(@Param('promotionId') promotionId: number): Promise<Promotion> {
    return this.promotionService.findOne(promotionId);
  }

  // Cập nhật khuyến mãi
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ): Promise<Promotion> {
    return this.promotionService.update(id, updatePromotionDto);
  }

  // Xóa khuyến mãi
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.promotionService.remove(id);
  }
}
