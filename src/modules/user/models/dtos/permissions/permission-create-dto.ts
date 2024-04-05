import { AutoMap } from "@automapper/classes";
import { IsString, MaxLength } from "class-validator";

export class PermissionCreateDto {

  @AutoMap()
  name: string;

}