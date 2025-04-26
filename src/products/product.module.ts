import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from 'src/databases/entities/product-image.entity';
import { Product } from 'src/databases/entities/product.entity';
import { ProductService } from './service/product.service';
import { ProductController } from './controller/products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
