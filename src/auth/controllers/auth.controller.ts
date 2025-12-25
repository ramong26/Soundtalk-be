import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.services';
import { SignupRequest } from '../dtos/requests/signup.requests';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() request: SignupRequest) {
    const { email, password, passwordConfirm, nickname } = request;
    return this.authService.signup(email, password, passwordConfirm, nickname);
  }
}
