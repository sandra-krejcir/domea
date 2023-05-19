import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup_tenant(user: any) {
    return this.usersService.create_tenant(
      user.username,
      user.password,
      user.firstname,
      user.lastname,
      user.birthday,
    );
  }

  async signup_board_member(user: any) {
    return this.usersService.create_board_member(
      user.username,
      user.password,
      user.phone,
    );
  }
  async signup(user: any) {
    return this.usersService.create(user.username, user.password);
  }

  async findOne(username: string) {
    const result = await this.usersService.findOne(username);
    console.log('the service result', result);
    return result;
  }

  async findAdmins() {
    const result = await this.usersService.findAdmins();
    console.log('the admins service', result);
    return result;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log('user found', user);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log('user found removed password', result);

      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      id: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
    };
  }
}
