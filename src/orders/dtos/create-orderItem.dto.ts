
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDetailDto {
  @IsInt()
  productId: number;  // Mã sản phẩm

  @IsInt()
  @IsOptional()
  variantId?: number;  // Mã biến thể sản phẩm (nếu có)

  @IsInt()
  quantity: number;  // Số lượng sản phẩm

  // Giá của sản phẩm


}