import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Request as Request2,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { TenantGuard } from './guards/tenant.guard';

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

  @Post('auth/signup-board_member')
  async signup_board_member(@Request2() req) {
    console.log('body', req.body);

    return this.authService.signup_board_member(req.body);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Post('getUser')
  async findOne(@Req() req) {
    const result = await this.authService.findOne(req.user.username);
    console.log('controller result', result);
    return result;
  }

  @Get('admins')
  async findAdmins(@Req() req) {
    const result = await this.authService.findAdmins();
    console.log('controller result admin', result);
    return result;
  }
}
