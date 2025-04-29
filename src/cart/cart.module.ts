import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/databases/entities/cart.entity';
import { CartItem } from 'src/databases/entities/cart-item.entity';
import { Product } from 'src/databases/entities/product.entity';  // Nếu cần liên kết với các sản phẩm
import { CartService } from './service/cart.service';
import { CartController } from './controller/cart.controller';
import { ProductVariant } from 'src/databases/entities/product-variant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem, Product,ProductVariant]),  // Đảm bảo đã import các entity cần thiết
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
