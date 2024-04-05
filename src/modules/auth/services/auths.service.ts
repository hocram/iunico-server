import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from 'src/modules/auth/models/dtos/auth-login-dto';
import { JwtPayload } from 'src/modules/auth/models/dtos/jwt-payload.interface';
import { LoginStatusDto } from 'src/modules/auth/models/dtos/login-status.dto';
import { UserCreateDto } from 'src/modules/user/models/dtos/users/user-create-dto';
import { UserDto } from 'src/modules/user/models/dtos/users/user-dto';
import { UsersService } from 'src/modules/user/services/users.service';
import { Observable, from } from 'rxjs';
import * as bcrypt from 'bcrypt';

/**
 * AuthService
 */
@Injectable()
export class AuthService {

    /**
     * LOG
     */
    private readonly logger: Logger = new Logger('AuthService');

    /**
     * CONSTRUCTOR
     * 
     * @param userService 
     * @param jwtService 
     */
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ){}

    /**
     * LOGIN
     * 
     * @param authLoginDto 
     * @returns 
     */
    async login(authLoginDto: AuthLoginDto): Promise<LoginStatusDto> {
        this.logger.log("AuthService::login - AuthLoginDto.username: " + authLoginDto.username);
        //
        this.logout();
        //
        let loginStatus: LoginStatusDto = {  
            success: false,  
            token: null,
            user: null,
            permissions: null,
        }
        if(!authLoginDto || !authLoginDto.username || !authLoginDto.password){
            return loginStatus;
        }
        let userDto: UserDto = await this.userService.validate(authLoginDto.username, authLoginDto.password);
        if( userDto ){
            const payload: JwtPayload = this.createPayload(userDto);
            const accessToken: string = this.createToken(payload);
            this.userService.updateToken(userDto.id, {
                token: accessToken
            });
            loginStatus.success = true;
            loginStatus.user = userDto;
            loginStatus.token = accessToken;
            loginStatus.permissions = await this.userService.getUserPermission(userDto.id);
        }
        return loginStatus;
    }

    /**
     * create Payload
     * 
     * @param userDto 
     * @returns 
     */
    private createPayload(userDto: UserDto): JwtPayload {
        const payload: JwtPayload = {
            userId: userDto.id,
            username: userDto.username
        } as JwtPayload;
        return payload;
    }

    /**
     * Create Token
     * 
     * @param payload 
     * @returns 
     */
    private createToken(payload: JwtPayload): string {
        const accessToken =  this.jwtService.sign(payload);
        //return { accessToken, expiresIn: 60 * 60 * 24 };
        return accessToken;
    }

    /**
     * LOGOUT
     */
    logout(): void {
    }

    /**
     *  REGISTER USER -> USER CREATE
     * 
     * @param dtoCreate 
     * @returns 
     */
    async register(dtoCreate: UserCreateDto): Promise<UserDto> {
       return this.userService.create(dtoCreate);
    }

    /**
     * GENERATE JWT
     * 
     * @param userDto 
     * @returns 
     */
    async generateJwtAsync(userDto: UserDto): Promise<string> {
        //return this.jwtService.signAsync({userDto});
        const payload: JwtPayload = {
            userId: userDto.id,
            username: userDto.username
        } as JwtPayload;
        //const accessToken = this.jwtService.sign(payload);
        const accessToken = await this.jwtService.signAsync({ payload });
        return accessToken;
    }

    /**
     * 
     * @param userDto 
     * @returns 
     */
    generateJwt(userDto: UserDto): string {
        const payload: JwtPayload = {
            userId: userDto.id,
            username: userDto.username
        } as JwtPayload;
        const accessToken = this.jwtService.sign(payload);
        return accessToken;
    }

    /**
     *  VERIFY JWT
     * 
     * @param jwt 
     * @returns 
     */
    async verifyJwt(jwt: string): Promise<any> {
        return await this.jwtService.verifyAsync(jwt);
    }

    /**
     * VERIFY PAYLOAD
     * 
     * @param payload 
     * @returns 
     */
    async verifyPayload(payload: JwtPayload): Promise<UserDto> {
        if( !payload || !payload.userId ){
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED); 
        }
        const user: UserDto = await this.userService.findById(payload.userId);
        if( !user ){
            //throw new HttpException('User not found', HttpStatus.UNAUTHORIZED); 
            throw new HttpException('Invalid user in token', HttpStatus.UNAUTHORIZED);
        }
        /*
        try {
          user = await this.userService.findOne({ where: { email: payload.sub } });
        } catch (error) {
          throw new UnauthorizedException(
            `There isn't any user with email: ${payload.sub}`,
          );
        }
        delete user.password;
        */
        return user;
    }

    /**
     * 
     * @param payload 
     * @returns 
     */
    async getUserDtoByPayload(payload: JwtPayload): Promise<UserDto> {
        if( !payload || !payload.userId ){
            throw new HttpException('Invalid get user from token', HttpStatus.UNAUTHORIZED); 
        }
        const user: UserDto = await this.userService.findById(payload.userId);
        if( !user ){
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED); 
        }
        return user;
    }

    /**
     * 
     * @param password 
     * @returns 
     */
    async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        const hashPass: string = await bcrypt.hash(password, saltOrRounds);
        return hashPass;

    }

    /**
     * 
     * @param newPassword 
     * @param passwortHash 
     * @returns 
     */
    comparePasswords(newPassword: string, passwortHash: string): Observable<any>{
        return from(bcrypt.compare(newPassword, passwortHash));
    }

}
