import { IsString, IsEnum, IsNumber, IsArray, IsOptional, IsDate, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderDetailDto } from './create-orderItem.dto';

export class CreateOrderDto {
  @IsInt()
  userId: number;  // Mã người dùng (customer)

  @IsInt()
  shippingAddressId: number;  // Mã địa chỉ giao hàng

  @IsEnum(['Pending', 'Completed', 'Canceled', 'InProgress'])
  @IsOptional()
  status?:'Pending'|'Completed'|'Canceled'|'InProgress';  // Trạng thái đơn hàng

  @IsNumber()
  @IsOptional()
  discountAmount?: number;  // Giảm giá (nếu có)

  @IsEnum(['Pending', 'Paid', 'Failed'])
  paymentStatus: 'Pending'| 'Paid'| 'Failed';  // Trạng thái thanh toán

  @IsEnum(['Delivery', 'Pickup'])
  shippingType: 'Delivery'| 'Pickup';  // Phương thức giao hàng

  @IsEnum(['Cash', 'CreditCard', 'E-Wallet', 'BankTransfer'])
  paymentMethod: 'Cash'| 'CreditCard'| 'E-Wallet'| 'BankTransfer';  // Phương thức thanh toán

  @IsArray()
  @Type(() => CreateOrderDetailDto)
  orderDetails: CreateOrderDetailDto[]; 
}


