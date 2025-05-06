import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

    async signIn(FullName: string, Password: string): Promise<{ access_token: string }> {
      const user = await this.userRepository.findOne({where :{ FullName}});
      if (!user) throw new UnauthorizedException('Email or password Invalid');
      const isPasswordValid = await bcrypt.compare(Password, user.Password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Email or password Invalidd');
      }
      const payload = { sub: user.UserID, username: user.FullName };
      return {
        access_token: await this.jwtService.signAsync(payload),
      }
    }
  }
