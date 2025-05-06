import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  FullName: string;

  @IsString()
  @IsNotEmpty()
  Password: string;
}
