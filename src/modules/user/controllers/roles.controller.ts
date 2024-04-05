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
import { RoleCreateDto } from 'src/modules/user/models/dtos/roles/role-create-dto';
import { RoleDto } from 'src/modules/user/models/dtos/roles/role-dto';
import { RoleEntity } from 'src/modules/user/models/entities/role-entity';
import { RolesService } from 'src/modules/user/services/roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

    // LOGGER
    private logger = new Logger('RolesController');

    // CONSTRUCTOR
    constructor(
        private readonly service: RolesService
    ){}

    // GET ALL
    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: '' })
    async findAll(): Promise<RoleEntity[]> {
        this.logger.verbose('findAll: Gett All');
        return await this.service.findAll();
    }

    // GET BY ID
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({ summary: '' })
    @ApiResponse({
      status: 200,
      description: 'A entity has been successfully fetched',
      type: RoleDto
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
    async findById(@Param('id') id: number): Promise<RoleDto> {
        this.logger.verbose('findById: Get by id ', id);
        if(!id) {
            throw new NotFoundException();
        }
        const dto: RoleDto = await this.service.findById(id);
        if (!dto) {
            throw new NotFoundException();
        }
        return dto;
    }

    // CREATE / REGISTER
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: '' })
    @ApiBody({ type: [RoleCreateDto] })
    async create(@Body() dtoCreate: RoleCreateDto): Promise<RoleDto> {
        const dto = await this.service.create(dtoCreate);
        if (!dto) {
            throw new BadRequestException();
        }
        return dto;
    }

    // DELETE
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: '' })
    @ApiParam({ 
        name: 'id', 
        type: Number,
        required: true,
        description: 'ID',
    })
    async delete(
        @Param('id') id: number
    ): Promise<RoleDto> {
        const dto: RoleDto = await this.service.delete(id);
        if (!dto) {
            throw new NotFoundException()
        }
        return dto;
    }

    // UPDATE ENTITY
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiOperation({ summary: '' })
    @ApiParam({ 
        name: 'id', 
        type: Number,
        required: true,
        description: 'ID',
    })
    @ApiBody({ type: [RoleDto] })
    async update(
        @Param('id') id: number, 
        @Body() data: RoleDto
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
    @Patch(':id')
    @ApiOperation({ summary: '' })
    @ApiParam({ 
        name: 'id', 
        type: Number,
        required: true,
        description: 'ID',
    })
    @ApiBody({ type: [RoleDto] })
    async patch(
        @Param('id') id: number, 
        @Body() data: RoleDto
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