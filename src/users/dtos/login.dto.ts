import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @IsString()
  @IsNotEmpty()
  Password: string;
}
