import { IsNumber, IsPositive, IsOptional } from 'class-validator';

export class CartItemDTO {

  @IsOptional() 
  @IsNumber()
  @IsPositive()
  cartId: number;

  @IsNumber()
  @IsPositive()
  productId: number;

  @IsNumber()
  @IsPositive()
  variantId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()  
  total: number;  

}
