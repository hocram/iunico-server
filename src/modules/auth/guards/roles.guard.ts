
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PermissionDto } from 'src/modules/user/models/dtos/permissions/permission-dto';
import { UsersService } from 'src/modules/user/services/users.service';

//import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
      private reflector: Reflector,
      private userService: UsersService
    ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log("context roles:", context);
    //const { user }: { user: UserActivation } = context.switchToHttp().getRequest();
    const { user } = context.switchToHttp().getRequest();
    console.log("user roles:", user);
    if(!user || !user.id){
      return false;
    }
    //let permissions: PermissionDto[] = this.userService.getUserPermission(user.id);
    /*
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user }: { user: User } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role?.includes(role));
    */
    return true;
  }
}