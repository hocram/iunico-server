import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, mapFrom, Mapper, MappingProfile } from "@automapper/core";
import { AuditLogDto } from '../dtos/audit-logs-dto';
import { AuditLogsEntity } from 'src/modules/user/models/entities/audit-logs-entity';

@Injectable()
export class AuditLogMapper extends AutomapperProfile { 

    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            //
            createMap(mapper, AuditLogsEntity, AuditLogDto);
            createMap(mapper, AuditLogDto, AuditLogsEntity);
        }
    }

}