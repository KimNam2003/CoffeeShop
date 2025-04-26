import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  FullName?: string;

  @IsOptional()
  @IsString()
  Password?: string;

  @IsOptional()
  @IsString()
  AvatarURL?: string;

  @IsOptional()
  @IsEnum(['customer', 'employee', 'admin'])
  Role?: 'customer' | 'employee' | 'admin';
}
