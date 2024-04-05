import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/modules/user/models/entities/role-entity';
import { ILike, Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { RoleDto } from 'src/modules/user/models/dtos/roles/role-dto';
import { RoleCreateDto } from 'src/modules/user/models/dtos/roles/role-create-dto';

@Injectable()
export class RolesService {

    // LOG
    private readonly logger: Logger = new Logger('RolesService');

    // CONSTRUCTOR
    constructor(
        @InjectRepository(RoleEntity) private repository: Repository<RoleEntity>,
        @InjectMapper() private readonly mapper: Mapper
    ){}

    // FIND ALL
    async findAll(): Promise<RoleDto[]> {
        const entities: RoleEntity[] = await this.repository.find({
            relations: [
                'permissions'
            ]
        });
        const dtos: RoleDto[] = await this.mapper.mapArrayAsync( entities, RoleEntity, RoleDto );
        return dtos;
    }

    // FIND BY ID
    async findById(id: number): Promise<RoleDto> {
        const entity: RoleEntity = await this.repository.findOne({ 
            where: { id },
            relations: [
                'permissions'
            ]
        });
        const dto: RoleDto = await this.mapper.mapAsync(entity, RoleEntity, RoleDto);
        return dto;
    }

    // CREATE
    async create(dtoCreate: RoleCreateDto): Promise<RoleDto> {
        this.logger.log("create: ", dtoCreate);
        let entity: RoleEntity = null;
        try{
            const entityMaped: RoleEntity = this.mapper.map(dtoCreate, RoleCreateDto, RoleEntity);
            if( entityMaped ){
                entity = await this.repository.save(entityMaped);
            }
        } catch(err){
            this.logger.error("error create: ", JSON.stringify(dtoCreate));
            this.logger.error(err);
            return null;
        }
        const dto: RoleDto = await this.mapper.mapAsync(entity, RoleEntity, RoleDto);
        return dto;
    }

    // DELETE
    async delete(id: number): Promise<RoleDto>{
        const dto: RoleDto = await this.findById(id);
        if(!dto){
            return null;
        }
        await this.repository.delete(id);
        return dto;
    }

    // UPDATE
    async update(id: number, data: RoleDto): Promise<any>{
        return await this.repository.update(id, data);
    }

    // PATCH
    async patch(id: number, data: RoleDto): Promise<any>{
        return await this.repository.update(id, data);
    }

}