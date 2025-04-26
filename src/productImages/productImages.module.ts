import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from 'src/databases/entities/product-image.entity';
import { ProductImageService } from './service/productImage.service';
import { Product } from 'src/databases/entities/product.entity';
import { ProductImageController } from './controller/productImage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product,ProductImage])],
  providers: [ProductImageService],
  controllers: [ProductImageController],
})
export class ProductImageModule {}
