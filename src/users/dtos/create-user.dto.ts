import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString()
  FullName: string;

  @IsEmail()
  Email: string;

  @IsString()
  Password: string;

  @IsOptional()
  @IsString()
  AvatarURL?: string;

  @IsEnum(['customer', 'employee', 'admin'])
  Role: 'customer' | 'employee' | 'admin';
}
