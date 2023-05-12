import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request as Request2,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AdminGuard } from './guards/admin.guard';
/* import { SuperAdminGuard } from './super-admin.guard'; */

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request2() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  async signup(@Request2() req) {
    console.log('body', req.body);

    return this.authService.signup(req.body);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('auth/signup-tenant')
  async signup_tenant(@Request2() req) {
    console.log('body', req.body);

    return this.authService.signup_tenant(req.body);
  }

  /*   @UseGuards(JwtAuthGuard, SuperAdminGuard) */
  @Post('auth/signup-board_member')
  async signup_board_member(@Request2() req) {
    console.log('body', req.body);

    return this.authService.signup_board_member(req.body);
  }
}
