import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItemModule } from "src/cartItem/cartItem.module";
import { Cart } from "src/databases/entities/cart.entity";
import { CartController } from "./controller/cart.controller";
import { CartService } from "./service/cart.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    forwardRef(() => CartItemModule), // ✅ cần thiết
  ],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}

