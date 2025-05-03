import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './service/order.sevice';
import { Order } from 'src/databases/entities/order.entity';
import { User } from 'src/databases/entities/user.entity';
import { OrderController } from './controller/order.controller';
import { OrderDetail } from 'src/databases/entities/orderDetai.entity';
import { Address } from 'src/databases/entities/address.entity';
import { Product } from 'src/databases/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ OrderDetail,Order,User,Address,Product])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
