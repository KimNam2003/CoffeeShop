import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
  } from '@nestjs/common';
import { CartItemDTO } from 'src/cart/dtos/create-cartItem.dto';
import { CartItemService } from 'src/cartItem/service/cartItem.service';
import { CartItem } from 'src/databases/entities/cart-item.entity';
  
  @Controller('cart-items')
  export class CartItemController {
    constructor(private readonly cartItemService: CartItemService) {}
  
    // 1. Thêm sản phẩm vào giỏ hàng
    @Post(':userId')
    async addItemToCart(
      @Param('userId', ParseIntPipe) userId: number,
      @Body() cartItemData: CartItemDTO,
    ): Promise<CartItem> {
      return this.cartItemService.addItemToCart(userId, cartItemData);
    }
  
  
    // 2. Lấy danh sách sản phẩm trong giỏ hàng theo cartId
    @Get('by-cart/:cartId')
    async getItemsByCartId(
      @Param('cartId', ParseIntPipe) cartId: number,
    ): Promise<CartItem[]> {
      return this.cartItemService.getItemsByCartId(cartId);
    }
  
    // 3. Cập nhật sản phẩm trong giỏ hàng
    @Put(':cartItemId')
    async updateItem(
      @Param('cartItemId', ParseIntPipe) cartItemId: number,
      @Body() updateData: CartItemDTO,
    ): Promise<CartItem> {
      return this.cartItemService.updateItem(cartItemId, updateData);
    }
  
    // 4. Xoá một sản phẩm khỏi giỏ
    @Delete(':cartItemId')
    async removeItem(@Param('cartItemId', ParseIntPipe) cartItemId: number): Promise<void> {
      return this.cartItemService.removeItem(cartItemId);
    }
  
    // 5. Xoá toàn bộ sản phẩm trong một giỏ hàng
    @Delete('clear/:cartId')
    async clearItems(@Param('cartId', ParseIntPipe) cartId: number): Promise<void> {
      return this.cartItemService.clearItems(cartId);
    }
  }
  