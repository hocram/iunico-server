import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, mapFrom, Mapper, MappingProfile } from "@automapper/core";
import { PermissionsEntity } from '../entities/permission-entity';
import { PermissionDto } from '../dtos/permissions/permission-dto';
import { PermissionCreateDto } from '../dtos/permissions/permission-create-dto';

@Injectable()
export class PermissionMapper extends AutomapperProfile { 

    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            //
            createMap(mapper, PermissionsEntity, PermissionDto);
            createMap(mapper, PermissionDto, PermissionsEntity);
            //
            createMap(mapper, PermissionsEntity, PermissionCreateDto);
            createMap(mapper, PermissionCreateDto, PermissionsEntity);
        }
    }

}