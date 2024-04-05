import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
} from 'typeorm';
import { AutoMap } from "@automapper/classes";
import { RoleEntity } from './role-entity';

@Entity('permissions')
export class PermissionsEntity { 

    // ID
    @PrimaryGeneratedColumn()
    @AutoMap()
    id: number;

    // NAME
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    @AutoMap()
    name: string;

    // ROLES
    @ManyToMany(
        () => RoleEntity,
        role => role.permissions,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
    )
    roles?: RoleEntity[];

}

/*
RBAC

Permission Type:
CREATE
READ
UPDATE
DELETE
VIEW
CONFIGURE
ADMIN
OTHER
*/

/*
LINK

https://kuros.in/typescript/nestjs-role-based-authentication-and-authorization-using-guards/
*/