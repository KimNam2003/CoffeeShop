import { forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/databases/entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItemService } from '../../cartItem/service/cartItem.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,

    @Inject(forwardRef(() => CartItemService)) // ✅ BẮT BUỘC
    private readonly cartItemService: CartItemService,
  ) {}


    async createCart(userId: number): Promise<Cart> {
      const existingCart = await this.cartRepository.findOne({ where: { userId: userId } });
      if (existingCart) {
        return existingCart; // hoặc throw new ConflictException('User already has a cart');
      }
  
      try {
        const cart = this.cartRepository.create({ userId: userId });
        return await this.cartRepository.save(cart);
      } catch (error) {
        throw new InternalServerErrorException('Could not create cart');
      }
    }

 
  
  // 3. Lấy giỏ hàng theo user
  async getCartByUser(userId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { userId: userId },
      relations: ['items'],
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

    // Xóa toàn bộ giỏ hàng
    async clearCart(userId: number): Promise<void> {
      const cart = await this.getCartByUser(userId);
      if (cart) {
        await this.cartItemService.clearItems(cart.cartId);
      }
    }
  
    // Tính tổng tiền giỏ hàng (nếu không dùng column generated)
    async calculateCartTotal(cartId: number): Promise<number> {
      const items = await this.cartItemService.getItemsByCartId(cartId);
      return items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  
}
