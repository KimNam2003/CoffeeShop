import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/user.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { Order } from 'src/databases/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Order])],
  controllers: [UserController],
  providers: [UserService],
})
export class UsertModule {}
