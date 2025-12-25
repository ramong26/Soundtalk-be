import { Injectable, ConflictException } from '@nestjs/common';
import { UserService } from 'src/user/services/user.services';
import * as bcrypt from 'bcrypt';
import { Provider } from 'src/common/enums/provider.enum';
import { Account } from 'src/user/entities/account.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(email: string, password: string, passwordConfirm: string, nickname: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    let hashedPassword: string;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch {
      throw new Error('Error hashing password');
    }

    try {
      const newUser = await this.userService.create({
        nickname,
        account: {
          accountName: nickname,
          email,
          password: hashedPassword,
          passwordConfirm: '',
          provider: Provider.LOCAL,
          providerId: '',
        } as Partial<Account>,
      });

      if (newUser.account) {
        delete newUser.account.password;
      }

      return newUser;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY' || error.code === '23505') {
        throw new ConflictException('이메일이 이미 등록되었습니다');
      }
      throw new Error('Error creating user: ' + error.message);
    }
  }
}
