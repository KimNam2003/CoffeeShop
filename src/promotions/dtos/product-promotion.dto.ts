import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class CreateProductPromotionDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsNumber()
  productId: number;

  @IsNumber()
  promotionId: number;
}
