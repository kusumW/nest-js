import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import Role from '../enum/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const reruiredRoles = this.reflector.get<string[]>(
      'role',
      context.getHandler(),
    );
   // console.log(reruiredRoles);
    if (!reruiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
   // console.log(user);
    //  console.log(user.role);
    //  console.log(reruiredRoles);
    const userRoles = user.role.split(',');
   // console.log(userRoles);
    //  if (user.role !== reruiredRoles) {
    //    throw new ForbiddenException('Access denied');
    //  }

    const hasRequiredRole = reruiredRoles.some((role) =>
    userRoles.includes(role),
  );

  if (hasRequiredRole) {
    return true;
  } else {
    throw new ForbiddenException('Access denied');
      }
  }
}
