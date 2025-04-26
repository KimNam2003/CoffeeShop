import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { Email } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { Email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  // Lấy tất cả người dùng
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Lấy người dùng theo ID
  async findOneUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { UserID: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Cập nhật thông tin người dùng
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneUser(id);
  
    Object.assign(user, updateUserDto);  // Update thẳng luôn vì DTO đã không có Email
    return this.userRepository.save(user);
  }
  
  // Xóa người dùng
  async removeUser(id: number): Promise<void> {
    const user = await this.findOneUser(id);
    await this.userRepository.remove(user);
  }
}