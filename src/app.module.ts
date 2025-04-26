import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './config/.env',  // Đọc từ file config/.env
      isGlobal: true, 
    }),

    // Cấu hình TypeOrmModule để kết nối với cơ sở dữ liệu MySQL
    TypeOrmModule.forRoot({
      type: 'mysql', // Hoặc 'postgres', tùy vào DB bạn sử dụng
      host: process.env.DB_HOST, // Lấy từ biến môi trường
      port: parseInt(process.env.DB_PORT || '3306', 10), // Nếu không có DB_PORT thì dùng mặc định 3306
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, 
      logging: true, // Hiển thị các truy vấn SQL trong console (chỉ nên dùng trong phát triển)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
