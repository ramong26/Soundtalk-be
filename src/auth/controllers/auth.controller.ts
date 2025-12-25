import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { AuthService } from '../services/auth.services';
import { RegisterDto } from '../dtos/requests/register.requests';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() request: RegisterDto) {
    const { email, password, passwordConfirm, nickname } = request;
    if (password !== passwordConfirm) {
      throw new BadRequestException('Passwords do not match');
    }
    return this.authService.signup(email, password, passwordConfirm, nickname);
  }
}
