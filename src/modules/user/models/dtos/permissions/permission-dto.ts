import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class PermissionDto {

    @AutoMap()
    id: number;

    @AutoMap()
    name: string;
    
}