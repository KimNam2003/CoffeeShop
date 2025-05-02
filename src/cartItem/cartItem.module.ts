import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartModule } from "src/cart/cart.module";
import { CartItem } from "src/databases/entities/cart-item.entity";
import { Cart } from "src/databases/entities/cart.entity";
import { ProductVariant } from "src/databases/entities/product-variant.entity";
import { CartItemService } from "./service/cartItem.service";
import { CartItemController } from "./controller/cart-item.controller.ts";

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItem, Cart, ProductVariant]),
    forwardRef(() => CartModule), // 🔁 mối phụ thuộc vòng
  ],
  providers: [CartItemService],
  controllers: [CartItemController],
  exports: [CartItemService], // ✅ EXPORT ở đây để CartModule dùng được
})
export class CartItemModule {}
