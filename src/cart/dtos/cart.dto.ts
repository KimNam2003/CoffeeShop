import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { CartItemDTO } from './create-cartItem.dto';

export class CartDTO {
  @IsNumber()
  @IsPositive()
  cartId: number;

  @IsNumber()
  @IsPositive()
  userId: number;

  @IsArray()
  @IsOptional()
  Items: CartItemDTO[]; 
}
