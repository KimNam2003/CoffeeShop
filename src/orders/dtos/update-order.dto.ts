import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(['Pending', 'Shipped', 'Delivered', 'Cancelled'])
  status?: string;

  @IsOptional()
  @IsEnum(['CreditCard', 'CashOnDelivery'])
  paymentMethod?: string;
}
