import { 
    BadRequestException, 
    Body, 
    Controller, 
    Delete, 
    Get, 
    NotFoundException, 
    Post, 
    Put,
    Version, 
    Res, 
    HttpStatus, 
    Param, 
    Logger,
    Patch,
    UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuditLogDto } from 'src/modules/logger/models/dtos/audit-logs-dto';
import { AuditLogsEntity } from 'src/modules/user/models/entities/audit-logs-entity';
import { AuditLogsService } from 'src/modules/logger/services/audit-logs.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';

@ApiTags('AuditLogs')
@Controller('logs')
export class AuditLogsController {

    // CONSTRUCTOR
    constructor(
        private readonly service: AuditLogsService
    ){}

    // GET ALL
    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(): Promise<AuditLogDto[]> {
        //this.logger.verbose('findAll: Get All');
        return await this.service.findAll();
    }

}
