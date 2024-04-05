import { SetMetadata } from '@nestjs/common';
import { PermissionDto } from "../models/dtos/permissions/permission-dto";

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: PermissionDto[]) => 
    SetMetadata(PERMISSIONS_KEY, permissions);

export const PERMISSIONS_NAME_KEY = 'permissions_name';
export const PermissionsName = (...permissions: string[]) => 
    SetMetadata(PERMISSIONS_NAME_KEY, permissions);