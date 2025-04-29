import { Body, Controller, Param, Post, Get, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { CartItemDTO } from '../dtos/create-cartItem.dto';
import { CartItem } from 'src/databases/entities/cart-item.entity';
import { Cart } from 'src/databases/entities/cart.entity';
import { CartService } from '../service/cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // 1. Thêm sản phẩm vào giỏ hàng
  @Post('add-item/:userId')
  async addItemToCart(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() cartItemData: CartItemDTO,
  ): Promise<CartItem> {
    return this.cartService.addItemToCart(userId, cartItemData);
  }

  // 2. Lấy giỏ hàng của người dùng
  @Get(':userId')
  async getCartByUser(@Param('userId') userId: number): Promise<Cart> {
    return this.cartService.getCartByUser(userId);
  }

  // 3. Cập nhật số lượng sản phẩm trong giỏ hàng
  @Put('update-item/:cartItemId')
  async updateItemQuantity(
    @Param('cartItemId') cartItemId: number,
    @Body('quantity') quantity: number,
  ): Promise<CartItem> {
    return this.cartService.updateItemQuantity(cartItemId, quantity);
  }

  // 4. Xóa sản phẩm khỏi giỏ hàng
  @Delete('remove-item/:cartItemId')
  async removeItemFromCart(
    @Param('cartItemId') cartItemId: number,
  ): Promise<void> {
    return this.cartService.removeItemFromCart(cartItemId);
  }

  // 5. Xóa toàn bộ giỏ hàng (sau khi thanh toán)
  @Delete('clear-cart/:cartId')
  async clearCart(@Param('cartId') cartId: number): Promise<void> {
    return this.cartService.clearCart(cartId);
  }

  // 6. Tạo giỏ hàng mới cho người dùng nếu chưa có
  @Post('create-cart/:userId')
  async createCart(@Param('userId') userId: number): Promise<Cart> {
    return this.cartService.createCart(userId);
  }
}
