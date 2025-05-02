import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItemModule } from "src/cartItem/cartItem.module";
import { PromotionService } from "./service/promotion.service";
import { PromotionController } from "./controller/promotion.controller";
import { Product } from "src/databases/entities/product.entity";
import { Promotion } from "src/databases/entities/promotion.entity";
import { ProductPromotion } from "src/databases/entities/product-promotion.entity";
import { ProductPromotionController } from "./controller/product-promotion.service";
import { ProductPromotionService } from "./service/product-promotion.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product,Promotion,ProductPromotion]),
  ],
  providers: [PromotionService,ProductPromotionService],
  controllers: [PromotionController,ProductPromotionController],
})
export class PromotionModule {}

