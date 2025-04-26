import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from 'src/databases/entities/user.entity';
import { UserService } from '../service/user.service';

@Controller('users')  // Đường dẫn root cho tất cả các endpoint trong controller này
export class UserController {
  constructor(private userService: UserService) {}

  // Tạo người dùng mới
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  // Lấy tất cả người dùng
  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Lấy người dùng theo ID
  @Get(':id')
  async findOneUser(@Param('id') id: number): Promise<User> {
    return this.userService.findOneUser(id);
  }

  // Cập nhật thông tin người dùng
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  // Xóa người dùng
  @Delete(':id')
  async removeUser(@Param('id') id: number): Promise<void> {
    return this.userService.removeUser(id);
  }
}
