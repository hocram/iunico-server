import { AutoMap } from "@automapper/classes";
import { IsString, MaxLength } from "class-validator";

export class RoleCreateDto {

    @AutoMap()
    @IsString()
    @MaxLength(100)
    name: string;

}