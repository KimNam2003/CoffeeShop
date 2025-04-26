import { IsNotEmpty, IsOptional, IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreateProductImageDto {
  @IsNotEmpty()
  @IsNumber()
  ProductID: number;

  @IsOptional()
  @IsBoolean()
  IsMain?: boolean;
}
