import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, mapFrom, Mapper, MappingProfile, mapWith } from "@automapper/core";
import { RoleEntity } from '../entities/role-entity';
import { RoleCreateDto } from '../dtos/roles/role-create-dto';
import { RoleDto } from '../dtos/roles/role-dto';
import { PermissionDto } from '../dtos/permissions/permission-dto';
import { PermissionsEntity } from '../entities/permission-entity';

@Injectable()
export class RoleMapper extends AutomapperProfile { 

    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            //
            createMap(mapper, RoleEntity, RoleDto, forMember(
                (destination: RoleDto) => destination.permissions, mapWith( PermissionDto, PermissionsEntity, (source: RoleEntity) => source.permissions )
            ));
            createMap(mapper, RoleDto, RoleEntity);
            //
            createMap(mapper, RoleEntity, RoleCreateDto);
            createMap(mapper, RoleCreateDto, RoleEntity);
        }
    }

}