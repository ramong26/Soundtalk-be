import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { IsPassword } from '../../decorators/password.validator';
import { Match } from '../../decorators/match.decorator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsPassword()
  password: string;

  @IsPassword()
  @Match('password', { message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' })
  passwordConfirm: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  nickname: string;
}
