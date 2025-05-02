import { IsString, IsEnum, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  name: string;

  @IsEnum(['Percentage', 'FixedPrice'])
  discountType: 'Percentage' | 'FixedPrice';
  
  @IsNumber()
  discountValue: number;

 
}

export class UpdatePromotionDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(['Percentage', 'FixedPrice'])
  @IsOptional()
  discountType?: string;

  @IsNumber()
  @IsOptional()
  discountValue?: number;
}
