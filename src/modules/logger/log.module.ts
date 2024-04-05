import { Module } from '@nestjs/common';
import { AuditLogsController } from './controllers/audit-logs.controller';
import { LoggerSystemService } from './services/logger-system.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogsEntity } from '../user/models/entities/audit-logs-entity';
import { AuditLogsService } from './services/audit-logs.service';
import { AuditLogMapper } from './models/mappers/audit-log-mapper';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            // ENTITY
            AuditLogsEntity,
        ]),
    ],
    controllers: [
        AuditLogsController,
    ],
    providers: [
        LoggerSystemService,
        AuditLogsService,
        // MAPPERS
        AuditLogMapper,
    ],
    exports: [
        LoggerSystemService,
        AuditLogsService,
        // MAPPERS
        AuditLogMapper,
    ]
})
export class LoggerModule {}
