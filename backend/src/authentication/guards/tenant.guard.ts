import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Role } from 'src/users/Role';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId: number = request.user.id;

    const user = await this.usersService.findUserById(userId);

    console.log('user in guard', user);

    // This returns true if there is a user and
    // the user is an admin
    return user && user.role === Role.User;
  }
}
