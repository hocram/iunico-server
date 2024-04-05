import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Repository } from 'typeorm';
import { AuditLogsEntity } from 'src/modules/user/models/entities/audit-logs-entity';
import { AuditLogDto } from 'src/modules/logger/models/dtos/audit-logs-dto';

@Injectable()
export class AuditLogsService {

    // CONSTRUCTOR
    constructor(
        @InjectRepository(AuditLogsEntity) private repository: Repository<AuditLogsEntity>,
        @InjectMapper() private readonly mapper: Mapper
    ) { }

    // FIND ALL
    async findAll(): Promise<AuditLogDto[]> {
        const entities: AuditLogsEntity[] = await this.repository.find({});
        const dtos: AuditLogDto[] = await this.mapper.mapArrayAsync(entities, AuditLogsEntity, AuditLogDto);
        return dtos;
    }

}