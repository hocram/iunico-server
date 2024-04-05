import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Repository } from 'typeorm';
import { PermissionsEntity } from 'src/modules/user/models/entities/permission-entity';
import { PermissionDto } from 'src/modules/user/models/dtos/permissions/permission-dto';
import { PermissionCreateDto } from 'src/modules/user/models/dtos/permissions/permission-create-dto';

@Injectable()
export class PermissionsService {

    // LOG
    private readonly logger: Logger = new Logger('PermissionsService');

    // CONSTRUCTOR
    constructor(
        @InjectRepository(PermissionsEntity) private repository: Repository<PermissionsEntity>,
        @InjectMapper() private readonly mapper: Mapper
    ) { }

    // FIND ALL
    async findAll(): Promise<PermissionDto[]> {
        const entities: PermissionsEntity[] = await this.repository.find({});
        const dtos: PermissionDto[] = await this.mapper.mapArrayAsync(entities, PermissionsEntity, PermissionDto);
        return dtos;
    }

    // FIND BY ID
    async findById(id: number): Promise<PermissionDto> {
        const entity: PermissionsEntity = await this.repository.findOne({where: { id }});
        console.log("entity:", entity);
        const dto: PermissionDto = await this.mapper.mapAsync(entity, PermissionsEntity, PermissionDto);
        return dto;
    }

    // CREATE
    async create(dtoCreate: PermissionCreateDto): Promise<PermissionDto> {
        this.logger.log("create: ", JSON.stringify(dtoCreate));
        let entity: PermissionsEntity = null;
        try{
            //console.log("dtoCreate: ", dtoCreate);
            const entityMaped: PermissionsEntity = this.mapper.map(dtoCreate, PermissionCreateDto, PermissionsEntity);
            //console.log("entityMaped: ", entityMaped);
            if( entityMaped ){
                entity = await this.repository.save(entityMaped);
            }
        } catch(err){
            this.logger.error("error create: ", JSON.stringify(dtoCreate));
            this.logger.error(err);
            return null;
        }
        const dto: PermissionDto = await this.mapper.mapAsync(entity, PermissionsEntity, PermissionDto);
        return dto;
    }

    // DELETE
    async delete(id: number): Promise<PermissionDto>{
        const dto: PermissionDto = await this.findById(id);
        if(!dto){
            return null;
        }
        await this.repository.delete(id);
        return dto;
    }

    // UPDATE
    async update(id: number, data: PermissionDto): Promise<any>{
        return await this.repository.update(id, data);
    }

    // PATCH
    async patch(id: number, data: PermissionDto): Promise<any>{
        return await this.repository.update(id, data);
    }

}