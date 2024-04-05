import { SetMetadata } from '@nestjs/common';
import { RoleDto } from '../models/dtos/roles/role-dto';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleDto[]) => 
    SetMetadata(ROLES_KEY, roles);