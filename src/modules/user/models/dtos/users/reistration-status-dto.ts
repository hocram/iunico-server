import { UserDto } from "./user-dto";

export interface RegistrationStatusDto {  
    success: boolean;  
    message: string;
    user: UserDto;
}