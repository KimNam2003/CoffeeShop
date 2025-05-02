import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItem } from "src/databases/entities/cart-item.entity";
import { Repository } from "typeorm";
import { CartItemDTO } from "../../cart/dtos/create-cartItem.dto";
import { CartService } from "src/cart/service/cart.service";

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem) 
    private cartItemRepository: Repository<CartItem>,
    @Inject(forwardRef(() => CartService))
    private cartService: CartService,
  ) {}

  // 1. Thêm sản phẩm vào giỏ hàng
  async addItemToCart(userId: number, cartItemData: CartItemDTO): Promise<CartItem> {
    let cart = await this.cartService.getCartByUser(userId);
  
    if (!cart) {
      cart = await this.cartService.createCart(userId);
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


  // Lấy danh sách sản phẩm trong giỏ
  async getItemsByCartId(cartId: number): Promise<CartItem[]> {
    return await this.cartItemRepository.find({
      where: { cartId },
      relations: ['product', 'variant'],
    });
  }

  // Cập nhật số lượng hoặc giá
  async updateItem(id: number, data: CartItemDTO): Promise<CartItem> {
    const item = await this.cartItemRepository.findOneBy({ cartItemId: id });
    if (!item) throw new NotFoundException('Cart item not found');

    Object.assign(item, data);
    item.total = item.quantity * item.price;

    return await this.cartItemRepository.save(item);
  }

  // Xóa 1 sản phẩm khỏi giỏ
  async removeItem(id: number): Promise<void> {
    await this.cartItemRepository.delete(id);
  }

  // Xóa toàn bộ sản phẩm theo cartId
  async clearItems(cartId: number): Promise<void> {
    await this.cartItemRepository.delete({ cartId });
  }
}

 
