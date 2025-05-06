import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret:  process.env.JWT_SECRET,
      signOptions: { expiresIn: '240s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
