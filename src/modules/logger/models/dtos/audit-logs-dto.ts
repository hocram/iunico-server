import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class AuditLogDto {

    @AutoMap()
    id: number;

    @AutoMap()
    message: string;
    
}
