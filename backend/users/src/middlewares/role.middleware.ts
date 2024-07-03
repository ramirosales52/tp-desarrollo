import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  
  constructor(private reflactor: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    
    const role = this.reflactor.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!role) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return role === user.role;

  }
}
