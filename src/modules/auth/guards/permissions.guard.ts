
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PERMISSIONS_KEY, PERMISSIONS_NAME_KEY } from 'src/modules/user/decorators/permissions.decorator';
import { PermissionDto } from 'src/modules/user/models/dtos/permissions/permission-dto';
import { UsersService } from 'src/modules/user/services/users.service';

//import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
      private reflector: Reflector,
      private userService: UsersService
    ) {}

  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean> {
    console.log("context permissions:", context);
    //const { user }: { user: UserActivation } = context.switchToHttp().getRequest();
    const { user } = context.switchToHttp().getRequest();
    console.log("user permissions:", user);
    if(!user || !user.id){
      return false;
    }
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_NAME_KEY, [
        context.getHandler(),
        context.getClass(),
    ]);
    console.log("requiredPermissions:", requiredPermissions);
    if (!requiredPermissions) {
        return true;
    }
    let permissions = await this.userService.getUserPermission(user.id);
    console.log("permissions: ", permissions);
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