import { IsNumber, IsPositive, IsOptional } from 'class-validator';

export class UpdateCartItemDTO {

  @IsOptional() 
  @IsNumber()
  @IsPositive()
  cartId?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional() 
  productId: number;

  @IsNumber()
  @IsPositive()
  @IsOptional() 
  variantId: number;

  @IsNumber()
  @IsPositive()
  @IsOptional() 
  quantity: number;

  @IsNumber()
  @IsPositive()
  @IsOptional() 
  price: number;



}
