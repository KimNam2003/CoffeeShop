import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsertModule } from './users/user.module';
import { ProductModule, } from './products/product.module';
import { ProductImageModule } from './productImages/productImages.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cartItem/cartItem.module';
import { PromotionModule } from './promotions/promotion.module';
import { OrderModule } from './orders/order.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './users/middleware/current-user.middleware';



@Module({
  imports:[ConfigModule.forRoot(),
    // Cấu hình TypeOrmModule để kết nối với cơ sở dữ liệu MySQL
    TypeOrmModule.forRoot({
      type: 'mysql', // Hoặc 'postgres', tùy vào DB bạn sử dụng
      host: process.env.DB_HOST, // Lấy từ biến môi trường
      port: parseInt(process.env.DB_PORT || '3306', 10), // Nếu không có DB_PORT thì dùng mặc định 3306
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, 
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), 
      serveRoot: '/public',
    }),UsertModule,ProductModule,ProductImageModule,CartModule,CartItemModule,PromotionModule,OrderModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) 
      .exclude(
        { path: 'auth/sign-in', method: RequestMethod.POST },
        { path: 'users/sign-out', method: RequestMethod.POST },
      )
      .forRoutes('*')
      }
  }

