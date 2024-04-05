import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";
import { PermissionDto } from "../permissions/permission-dto";

export class RoleDto {

  @ApiProperty({
    description: '',
    type: Number
  })
  @AutoMap()
  id: number;

  @ApiProperty({
    description: '',
    type: String
  })
  @AutoMap()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty()
  @AutoMap()
  public permissions: PermissionDto[];

}