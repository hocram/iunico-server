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
import { UserCreateDto } from 'src/modules/user/models/dtos/users/user-create-dto';
import { UserDto } from 'src/modules/user/models/dtos/users/user-dto';
import { UsersService } from 'src/modules/user/services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    // LOGGER
    private logger = new Logger('UsersController');

    // CONSTRUCTOR
    constructor(
        private readonly service: UsersService
    ){}

    // GET ALL
    @UseGuards(JwtAuthGuard) // @TODO: COMMENT FOR TEST
    @Get()
    @ApiOperation({ summary: 'Get All Users list' })
    async findAll(): Promise<UserDto[]> {
        this.logger.verbose('findAll: Get All');
        const entities: UserDto[] = await this.service.findAll();
        if(!entities){
            return [];
        }
        return entities;
    }

    // GET BY ID
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Get User By Id' })
    @ApiParam({ 
        name: 'id', 
        type: Number,
        required: true,
        description: 'Id of the User',
    })
    @ApiResponse({
      status: 200,
      description: 'A entity has been successfully fetched',
      type: UserDto
    })
    @ApiResponse({
      status: 404,
      description: 'A entity with given id does not exist.'
    })
    async findById(@Param('id') id: number): Promise<UserDto> {
        this.logger.verbose('findById: Get by id ', id);
        if(!id) {
            throw new NotFoundException();
        }
        const dto: UserDto = await this.service.findById(id);
        if (!dto) {
            throw new NotFoundException();
        }
        return dto;
    }

    // GET USER PERMISSIONS
    @UseGuards(JwtAuthGuard)
    @Get(':id/permissions')
    @ApiOperation({ summary: 'Get User By Id' })
    async getPermissions(@Param('id') id: number){
        return await this.service.getUserPermission(id);
    }

    // CREATE / REGISTER
    @UseGuards(JwtAuthGuard) // @TODO: COMMENT FOR TEST
    @Post()
    @ApiOperation({ summary: 'Create User' })
    @ApiBody({ type: [UserCreateDto] })
    async create(@Body() dtoCreate: UserCreateDto): Promise<UserDto> {
        console.log("CREATE USER: ", dtoCreate);
        const dto: UserDto = await this.service.create(dtoCreate);
        if (!dto) {
            throw new BadRequestException();
        }
        // @TODO: FOR TEST - START
        //let dto = new UserDto();
        //dto.username = dtoCreate.username;
        //dto.email = dtoCreate.email;
        // @TODO: FOR TEST - END
        return dto;
    }

    // DELETE
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete User By Id' })
    @ApiParam({ 
        name: 'id', 
        type: Number,
        required: true,
        description: 'Id of the User',
    })
    async delete (@Param('id') id: number): Promise<UserDto> {
        const dto: UserDto = await this.service.delete(id);
        if (!dto) {
            throw new NotFoundException();
        }
        return dto;
    }

    // UPDATE ENTITY
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Update User By Id' })
    @ApiParam({ 
        name: 'id', 
        type: Number,
        required: true,
        description: 'Id of User',
    })
    @ApiBody({ type: [UserDto] })
    async update(
        @Param('id') id: number, 
        @Body() data: UserDto
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
    @ApiOperation({ summary: 'Patch attribute User By Id' })
    @ApiParam({ 
        name: 'id', 
        type: Number,
        required: true,
        description: 'Id of the User',
    })
    @ApiBody({ type: [UserDto] })
    async patch(
        @Param('id') id: number, 
        @Body() data: UserDto
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
