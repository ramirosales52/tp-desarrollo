import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request & { user: UserEntity } = context
        .switchToHttp()
        .getRequest();
      const token = request.headers.authorization;

      if (token == null) {
        throw new UnauthorizedException('No token provided');
      }
      
      const payload = this.authService.getPayload(token);
      const user = await this.usersService.findByEmail(payload.email);
      
      request.user = user;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(error?.message);
    }
  }
}
