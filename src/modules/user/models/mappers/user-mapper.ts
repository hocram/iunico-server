import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, mapFrom, Mapper, MappingProfile, mapWith } from "@automapper/core";

import { UserEntity } from '../entities/user-entity';
import { UserDto } from '../dtos/users/user-dto';
import { UserCreateDto } from '../dtos/users/user-create-dto';
import { RoleEntity } from '../entities/role-entity';
import { RoleDto } from '../dtos/roles/role-dto';

@Injectable()
export class UserMapper extends AutomapperProfile { 

    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            //
            createMap(mapper, UserEntity, UserDto, forMember(
                //(destination: CharacterDto) => destination.statistics, mapFrom( (source) => source.statistics )
                (destination: UserDto) => destination.roles, mapWith( RoleDto, RoleEntity, (source: UserEntity) => source.roles )
            ));
            createMap(mapper, UserDto, UserEntity);
            //
            //createMap(mapper, UserDto, UserEntity, forMember((dest) => dest.id, ignore()));
            createMap(mapper, UserEntity, UserCreateDto);
            createMap(mapper, UserCreateDto, UserEntity);
        }
    }

}

// https://automapperts.netlify.app/docs/mapping-configuration/for-member/map-with
