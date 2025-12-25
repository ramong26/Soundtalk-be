import { IsEmail, IsString } from 'class-validator';
import { IsPassword } from '../decorators/password.validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsPassword()
  password: string;

  @IsPassword()
  passwordConfirm: string;

  @IsString()
  nickname: string;
}
