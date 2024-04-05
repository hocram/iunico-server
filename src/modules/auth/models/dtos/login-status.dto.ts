import { PermissionDto } from "src/modules/user/models/dtos/permissions/permission-dto";
import { UserDto } from "src/modules/user/models/dtos/users/user-dto";

/*
export const jwtConstants = {
    secret: 'secretKey',
    expiresIn: 3,
};
*/

export interface LoginStatusDto {  
    success: boolean;  
    token: string;
    user: UserDto;
    permissions?: PermissionDto[];
    //expiresIn: jwtConstants.expiresIn,
}