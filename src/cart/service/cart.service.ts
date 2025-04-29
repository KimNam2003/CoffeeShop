import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/databases/entities/cart-item.entity';
import { Cart } from 'src/databases/entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItemDTO } from '../dtos/create-cartItem.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
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

  // 2. Thêm sản phẩm vào giỏ hàng
  async addItemToCart(userId: number, cartItemData: CartItemDTO): Promise<CartItem> {
    let cart = await this.cartRepository.findOne({
      where: { userId: userId },
    });
  
    if (!cart) {
      cart = await this.createCart(userId);
    }
  
    const existingItem = await this.cartItemRepository.findOne({
      where: {
        cartId: cart.cartId,
        productId: cartItemData.productId,
        variantId: cartItemData.variantId,
      },
    });
  
    if (existingItem) {
      existingItem.quantity += cartItemData.quantity;
      existingItem.price = cartItemData.price;
      existingItem.total = existingItem.quantity * existingItem.price;
  
    return await this.cartItemRepository.save(existingItem);
    }
  
    // Nếu sản phẩm chưa có trong giỏ, thêm mới
    const newItem = this.cartItemRepository.create({
      cartId: cart.cartId,
      productId: cartItemData.productId,
      variantId: cartItemData.variantId,
      quantity: cartItemData.quantity,
      price: cartItemData.price,
      total: cartItemData.quantity * cartItemData.price,
    });
  
    return await this.cartItemRepository.save(newItem);
  }
  
  // 3. Lấy giỏ hàng theo user
  async getCartByUser(userId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { userId: userId },
      relations: ['Items'],
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

  // 4. Cập nhật số lượng sản phẩm trong giỏ hàng
  async updateItemQuantity(cartItemId: number, quantity: number): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { cartItemId: cartItemId },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    cartItem.quantity = quantity;
    return await this.cartItemRepository.save(cartItem);
  }

  // 5. Xóa sản phẩm khỏi giỏ hàng
  async removeItemFromCart(cartItemId: number): Promise<void> {
    const result = await this.cartItemRepository.delete(cartItemId);

    if (result.affected === 0) {
      throw new NotFoundException('Cart item not found');
    }
  }

  // 6. Xóa toàn bộ giỏ hàng (ví dụ sau khi thanh toán)
  async clearCart(cartId: number): Promise<void> {
    await this.cartItemRepository.delete({ cartId: cartId });
  }
}
