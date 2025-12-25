import { Injectable } from '@nestjs/common';
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

    const hashedPassword = await bcrypt.hash(password, 10);

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
  }
}
