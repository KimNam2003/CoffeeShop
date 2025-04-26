import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  Name?: string;

  @IsString()
  @IsOptional()
  Description?: string;

  @IsNumber()
  @IsOptional()
  Price?: number;

  @IsBoolean()
  @IsOptional()
  IsAvailable?: boolean;

  @IsNumber()
  @IsOptional()
  StockQuantity?: number;

  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;
}
