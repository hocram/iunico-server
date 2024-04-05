import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';
import { AutoMap } from "@automapper/classes";
import { UserEntity } from './user-entity';
import { PermissionsEntity } from './permission-entity';

@Entity('roles')
export class RoleEntity {

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

    // USERS
    @ManyToMany(
        () => UserEntity,
        user => user.roles,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
    )
    users?: UserEntity[];

    // PERMISSIONS
    @ManyToMany(
        () => PermissionsEntity,
        permission => permission.roles,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
    )
    @JoinTable({ 
        name: 'role_permission',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id',
        },
    })
    public permissions?: PermissionsEntity[];

}