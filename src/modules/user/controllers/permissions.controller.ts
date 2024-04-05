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
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { PermissionCreateDto } from 'src/modules/user/models/dtos/permissions/permission-create-dto';
import { PermissionDto } from 'src/modules/user/models/dtos/permissions/permission-dto';
import { PermissionsService } from 'src/modules/user/services/permisssions.service';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {

    // LOGGER
    private logger = new Logger('PermissionsController');

    // CONSTRUCTOR
    constructor(
        private readonly service: PermissionsService
    ){}

    // GET ALL
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<PermissionDto[]> {
        this.logger.verbose('findAll: Get All');
        return await this.service.findAll();
    }

    // GET BY ID
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '' })
    @ApiResponse({
      status: 200,
      description: 'A entity has been successfully fetched',
      type: PermissionDto
    })
    @ApiResponse({
      status: 404,
      description: 'A entity with given id does not exist.'
    })
    @ApiParam({ 
        name: 'id', 
        type: Number,
        required: true,
        description: 'ID',
    })
    @Get(':id')
    async findById(@Param('id') id: number): Promise<PermissionDto> {
        this.logger.verbose('findById: Get by id: ' + id);
        if(!id) {
            throw new NotFoundException();
        }
        const dto: PermissionDto = await this.service.findById(id);
        if (!dto) {
            throw new NotFoundException();
        }
        return dto;
    }

    // CREATE / REGISTER
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '' })
    @ApiBody({ type: [PermissionCreateDto] })
    @Post()
    async create(@Body() dtoCreate: PermissionCreateDto): Promise<PermissionDto> {
        const dto = await this.service.create(dtoCreate);
        if (!dto) {
            throw new BadRequestException();
        }
        return dto;
    }

    // DELETE
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '' })
    @ApiParam({ 
        name: 'id', 
        type: Number,
        required: true,
        description: 'ID',
    })
    @Delete(':id')
    async delete(
        @Param('id') id: number
    ): Promise<PermissionDto> {
        const dto: PermissionDto = await this.service.delete(id);
        if (!dto) {
            throw new NotFoundException()
        }
        return dto;
    }

    // UPDATE ENTITY
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '' })
    @ApiParam({ 
        name: 'id', 
        type: Number,
        required: true,
        description: 'ID',
    })
    @ApiBody({ type: [PermissionDto] })
    @Put(':id')
    async update(
        @Param('id') id: number, 
        @Body() data: PermissionDto
    ): Promise<any> {
        if( !id || !data ){
            throw new BadRequestException();
        }
        data.id = Number(id);
        const dto = await this.service.update(id, data);
        if(!dto){
            throw new NotFoundException();
        }
        return dto;
    } 

    // PATCH ATTRIBUTE ENTITY
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '' })
    @ApiParam({ 
        name: 'id', 
        type: Number,
        required: true,
        description: 'ID',
    })
    @ApiBody({ type: [PermissionDto] })
    @Patch(':id')
    async patch(
        @Param('id') id: number, 
        @Body() data: PermissionDto
    ): Promise<any> {
        if( !id || !data ){
            throw new BadRequestException();
        }
        data.id = Number(id);
        const dto = await this.service.patch(id, data);
        if(!dto){
            throw new NotFoundException();
        }
        return dto;
    } 

}
