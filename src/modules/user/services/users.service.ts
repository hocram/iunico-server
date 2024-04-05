import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { UserEntity } from 'src/modules/user/models/entities/user-entity';
import { UserDto } from 'src/modules/user/models/dtos/users/user-dto';
import { UserCreateDto } from 'src/modules/user/models/dtos/users/user-create-dto';
import { Mapper } from '@automapper/core';
import { PermissionDto } from 'src/modules/user/models/dtos/permissions/permission-dto';
import { RoleDto } from 'src/modules/user/models/dtos/roles/role-dto';
import { log } from 'console';
//import { UserMapper } from 'src/models/mappers/user-mapper';

@Injectable()
export class UsersService {

    // LOG
    private readonly logger: Logger = new Logger('UsersService');

    // CONSTRUCTOR
    constructor(
        @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
        @InjectMapper() private readonly mapper: Mapper
    ){}

    // FIND ALL
    async findAll(): Promise<UserDto[]> {
        const entities: UserEntity[] = await this.repository.find({});
        const dtos: UserDto[] = await this.mapper.mapArrayAsync( entities, UserEntity, UserDto );
        return dtos;
    }

    // FIND BY ID
    async findById(id: number): Promise<UserDto> {
        const entity: UserEntity = await this.repository.findOne({ 
            where: { id },
            relations: [
                'roles',
                //'roles.permissions'
            ] 
        });
        const dto: UserDto = await this.mapper.mapAsync(entity, UserEntity, UserDto);
        return dto;
    }

    // GET USER PERMISSIONS
    async getUserPermission(id: number): Promise<PermissionDto[]> {
        const entity: UserEntity = await this.repository.findOne({ 
            where: { id },
            relations: [
                'roles',
                'roles.permissions'
            ] 
        });
        let userPermissions: PermissionDto[] = [];
        if(entity){
            const dto: UserDto = await this.mapper.mapAsync(entity, UserEntity, UserDto);
            if(dto){
                let roles: RoleDto[] = dto.roles;
                roles.forEach( (role: RoleDto) => {
                    if(role.permissions){
                        role.permissions.forEach( (permission: PermissionDto) => {
                            let notFoundPermission = !userPermissions.find( (partialUserPermission: PermissionDto) => { 
                                return partialUserPermission.id == permission.id; 
                            });
                            if(notFoundPermission){
                                userPermissions.push(permission);
                            }
                        });
                    }
                });
            }
        }
        return userPermissions;
    }
  
    // FIND BY USERNAME
    async findByUsername(username: string): Promise<UserDto> {
        const entity: UserEntity = await this.repository.findOne({ where: { username }});
        const dto: UserDto = await this.mapper.mapAsync( entity, UserEntity, UserDto);
        return dto;
    }

    // VALIDATE
    async validate(username: string, password: string): Promise<UserDto>{
        const passwordValid = password;  // await bcrypt.hash(password, 10);
        const entity: UserEntity = await this.repository.findOne( { 
            where: { 
                username: ILike(username), 
                password: passwordValid 
            },
            relations: [
                'roles',
                'roles.permissions'
            ]
        });
        const dto: UserDto = await this.mapper.mapAsync(entity, UserEntity, UserDto);
        return dto;
    }

    // CREATE
    async create(dtoCreate: UserCreateDto): Promise<UserDto> {
        this.logger.log("create: ", dtoCreate);
        let entity: UserEntity = null;
        try{
            const entityMaped: UserEntity = this.mapper.map(dtoCreate, UserCreateDto, UserEntity);
            if( entityMaped ){
                entity = await this.repository.save(entityMaped);
            }
        } catch(err){
            this.logger.error("error create: ", JSON.stringify(dtoCreate));
            this.logger.error(err);
            return null;
        }
        const dto: UserDto = await this.mapper.mapAsync(entity, UserEntity, UserDto);
        return dto;
    }

    // DELETE
    async delete(id: number): Promise<UserDto>{
        const dto: UserDto = await this.findById(id);
        if(!dto){
            return null;
        }
        await this.repository.delete(id);
        return dto;
    }

    // UPDATE
    async update(id: number, data: UserDto): Promise<any>{
        return await this.repository.update(id, data);
    }

    // PATCH
    async patch(id: number, data: UserDto): Promise<any>{
        return await this.repository.update(id, data);
    }

    // UPDATE TOKEN
    async updateToken(id: number, data: any): Promise<any>{
        return await this.repository.update(id, {
            token: data.token,
            lastDateLogin: (new Date()).toISOString()
        });
    }

}
