import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { Cart } from 'src/databases/entities/cart.entity';
import { CartService } from '../service/cart.service';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
  ) {}

 
  // 2. Lấy giỏ hàng của người dùng
  @Get(':userId')
  async getCartByUser(@Param('userId') userId: number): Promise<Cart> {
    return this.cartService.getCartByUser(userId);
  }

    // 3. Xoá toàn bộ sản phẩm trong giỏ hàng (ví dụ sau khi thanh toán)
    @Delete('clear/:userId')
    async clearCart(
      @Param('userId', ParseIntPipe) userId: number,
    ): Promise<void> {
      return this.cartService.clearCart(userId);
    }
  
    // 4. Tính tổng tiền giỏ hàng
    @Get('total/:cartId')
    async calculateCartTotal(
      @Param('cartId', ParseIntPipe) cartId: number,
    ): Promise<number> {
      return this.cartService.calculateCartTotal(cartId);
    }

}
