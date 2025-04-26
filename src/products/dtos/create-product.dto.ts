import { IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  Name: string;

  @IsOptional()
  @IsString()
  Description?: string;

  @IsNotEmpty()
  @IsNumber()
  Price: number;

  @IsOptional()
  @IsBoolean()
  IsAvailable?: boolean;

  @IsOptional()
  @IsNumber()
  StockQuantity?: number;

  @IsOptional()
  @IsBoolean()
  IsActive?: boolean;
}
