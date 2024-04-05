import { BadRequestException, Body, Controller, Get, HttpCode, HttpException, HttpStatus, Logger, Post, Req, Request, UseGuards, UseInterceptors, Version } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { TokenInterceptor } from 'src/modules/auth/interceptors/token.interceptor';
import { AuthLoginDto } from 'src/modules/auth/models/dtos/auth-login-dto';
import { LoginStatusDto } from 'src/modules/auth/models/dtos/login-status.dto';
import { UserCreateDto } from 'src/modules/user/models/dtos/users/user-create-dto';
import { UserDto } from 'src/modules/user/models/dtos/users/user-dto';
import { AuthService } from 'src/modules/auth/services/auths.service';
import { Roles } from 'src/modules/user/decorators/roles.decorator';
import { IncomingMessage } from 'http';
import { Permissions, PermissionsName } from 'src/modules/user/decorators/permissions.decorator';
import { PermissionsGuard } from '../guards/permissions.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthsController {

    // LOG
    private readonly logger: Logger = new Logger('AuthsController');

    /**
     * 
     * @param service 
     */
    constructor(
        private readonly service: AuthService
    ){}

    /**
     * 
     * @param authLoginDto 
     * @returns 
     */
    //@Version('1.0')
    //@UseGuards(AuthGuard('local'))
    //@UseGuards(LocalAuthGuard)
    //@UseInterceptors(TokenInterceptor)
    @ApiOperation({ summary: 'Login User Operation' })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() authLoginDto: AuthLoginDto): Promise<LoginStatusDto> {
        this.logger.log("login API Request for username: " + (authLoginDto && authLoginDto.username ? authLoginDto.username : null ) );
        //this.logger.debug("LOGIN AuthLoginDto: " + JSON.stringify(authLoginDto));
        if( !authLoginDto || !authLoginDto.username ){
            this.logger.error("ERROR LOGIN PARAMETERS");
            throw new HttpException('Error Login parameters', HttpStatus.BAD_REQUEST);
        }  
        let loginStatus = await this.service.login(authLoginDto);
        if( !loginStatus || loginStatus.success == false || !loginStatus.user){
            this.logger.error("ERROR LOGIN AUTHORIZATIION");
            throw new HttpException('Error Login authorization', HttpStatus.UNAUTHORIZED);
        }
        return loginStatus;
    }

    /**
     * 
     */
    //@UseInterceptors(TokenInterceptor)
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register(@Body() dto: UserCreateDto): Promise<UserDto> {
        const entity =  this.service.register(dto);
        if (!entity) {
            throw new BadRequestException();
        }
        return entity;
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async profile(@Request() req: any) {
        if (!req || !req.user) {
            throw new BadRequestException();
        }
        console.log( req );
        return req.user;
    }


    // @UseGuards(JwtAuthGuard, RolesGuard)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    //@Roles() //Role.ADMIN)
    @Permissions() 
    @PermissionsName('auth_test')
    @HttpCode(HttpStatus.OK)
    @Get('test')
    async test(){
        return "Test Success!";
    }

/*
    @Get('/me')
    @UseGuards(SessionAuthGuard, JWTAuthGuard)
    me(@AuthUser() user: User): User {
        return user;
    }
*/

}
