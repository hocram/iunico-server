import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { RoleDto } from "../roles/role-dto";

export class UserDto {

  @ApiProperty({
    description: 'Id of the user',
    type: Number
  })
  @AutoMap()
  id: number;

  @ApiProperty({
    description: 'Username of the user',
    type: String,
    maxLength: 20,
    required: true
  })
  @MaxLength(20)
  @IsAlphanumeric()
  @IsNotEmpty()
  @AutoMap()
  username: string;

  @ApiProperty({
    description: 'Email of the user',
    type: String,
    maxLength: 254,
    required: true
  })
  @MaxLength(254)
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  email: string;

  @ApiProperty()
  @AutoMap()
  lastIpLogin: string;

  @ApiProperty()
  @AutoMap()
  lastDateLogin: Date;

  @ApiProperty()
  @AutoMap()
  createdAt: Date;
  
  @ApiProperty()
  @AutoMap()
  public roles: RoleDto[];
  
}