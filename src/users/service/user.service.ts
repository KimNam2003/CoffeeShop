import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/databases/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import * as bcrypt from 'bcrypt'; 
import { instanceToPlain } from 'class-transformer';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
    // Tạo người dùng mới
    async createUser(createUserDto: CreateUserDto) {
      const { Email, Password } = createUserDto;
      const existingUser = await this.userRepository.findOne({ where: { Email } });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(Password, salt);
      createUserDto.Password = hashedPassword;

      const newUser = this.userRepository.create(createUserDto);
      return instanceToPlain(this.userRepository.save(newUser));
    }
  
  // Lấy tất cả người dùng (có phân trang)
  async findAll(page = 1, limit = 10): Promise<User[]> {
    return this.userRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { UserID: 'ASC' },
    });
  }

  // Lấy người dùng theo ID
  async findOneUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { UserID : id} });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  

  // Tìm người dùng theo email
  async findByEmail(Email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { Email } });
    if (!user) {
      throw new NotFoundException(`User with email ${Email} not found`);
    }
    return user;
  }

  // Cập nhật người dùng
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneUser(id);

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  // Xóa người dùng khỏi DB
  async removeUser(id: number): Promise<void> {
    const user = await this.findOneUser(id);
    await this.userRepository.remove(user);
  }

}
