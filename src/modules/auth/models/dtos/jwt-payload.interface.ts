import { RoleDto } from "src/modules/user/models/dtos/roles/role-dto";

export interface JwtPayload {
    sub: string;
    iat: number;
    exp: number;
    iss: string;
    //
    userId: number;
    username: string;
    //
    //roles: RoleDto[]
}